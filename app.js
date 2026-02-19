// --- NAMESPACE WRAPPER START ---
(function (window, document) {
    "use strict";

    // --- Configuration (Dynamic from window.QUIZ_CONFIG) ---
    const CONFIG = {
        storageKey: window.QUIZ_CONFIG ? window.QUIZ_CONFIG.storageKey : 'fq_progress_generic_v1',
        appName: window.QUIZ_CONFIG ? window.QUIZ_CONFIG.appName : 'GenericQuiz',
        exportPrefix: window.QUIZ_CONFIG ? window.QUIZ_CONFIG.exportPrefix : 'quiz',
        minPassScore: 0.7 // 70%
    };

    // --- Dependency Safety ---
    if (typeof window.DOMPurify === 'undefined') {
        window.log && window.log("DOMPurify missing. Using fallback.");
        window.DOMPurify = { sanitize: function (x) { return x; } };
    }

    // --- State Management ---
    const STATE = {
        mode: 'practice', // 'practice' | 'exam'
        timeRemaining: 3600, // 60 mins in seconds
        timerInterval: null,
        currentIndex: 0,
        score: 0, // In practice, updated continuously. In exam, calculated at submission.
        analytics: [],
        resetHistory: [],
        seed: Date.now(),
        questions: [],
        practiceState: {}, // { questionId: { attemptCount: 1, passed: true/false, points: 1 } }
        examAnswers: {} // { questionId: uiIdx }
    };

    // --- Utility Functions ---
    function makeRNG(seed) {
        let s = seed || 1;
        return function () {
            s = (s * 1664525 + 1013904223) % 4294967296;
            return s / 4294967296;
        };
    }

    function shuffleArray(arr, seed) {
        const a = arr.slice();
        const rand = makeRNG(seed);
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(rand() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // --- Persistence & Safety ---
    function saveState() {
        try {
            localStorage.setItem(CONFIG.storageKey, JSON.stringify({
                mode: STATE.mode,
                currentIndex: STATE.currentIndex,
                score: STATE.score,
                analytics: STATE.analytics,
                resetHistory: STATE.resetHistory,
                seed: STATE.seed,
                practiceState: STATE.practiceState,
                examAnswers: STATE.examAnswers,
                timeRemaining: STATE.timeRemaining
            }));
        } catch (e) {
            console.warn('Storage failed:', e);
        }
    }

    function loadState() {
        try {
            const s = JSON.parse(localStorage.getItem(CONFIG.storageKey));
            if (s) {
                STATE.mode = s.mode || 'practice';
                STATE.currentIndex = s.currentIndex || 0;
                STATE.score = s.score || 0;
                STATE.analytics = s.analytics || [];
                STATE.resetHistory = s.resetHistory || [];
                STATE.seed = s.seed || Date.now();
                STATE.practiceState = s.practiceState || {};
                STATE.examAnswers = s.examAnswers || {};
                STATE.timeRemaining = typeof s.timeRemaining === 'number' ? s.timeRemaining : 3600;
            }
        } catch (e) {
            console.warn('Load failed:', e);
        }
    }

    async function checkStorageReliability() {
        let persistent = false;
        const timeout = new Promise(resolve => setTimeout(() => resolve(false), 1000));
        try {
            if (navigator.storage && navigator.storage.persisted) {
                persistent = await Promise.race([navigator.storage.persisted(), timeout]);
            }
        } catch (e) { }

        try {
            localStorage.setItem('__test', '1');
            localStorage.removeItem('__test');
        } catch (e) {
            showWarning('Storage is disabled. Process will not be saved.');
            return;
        }

        if (!persistent && (navigator.userAgent.includes("Incognito") || !window.indexedDB)) {
            showWarning('Using temporary storage. Please download results before closing.');
        }
    }

    function showWarning(msg) {
        console.warn('Storage Warning:', msg);
        const w = document.getElementById('storage-warning');
        if (w) {
            w.hidden = false;
        }
    }

    // --- Analytics & Export ---
    function pushEvent(type, payload) {
        STATE.analytics.push({
            type: type,
            timestamp: new Date().toISOString(),
            payload: payload
        });
        saveState();
    }

    // --- Mode & Timer ---
    function startQuiz(mode) {
        STATE.mode = mode;
        document.getElementById('startScreen').hidden = true;
        document.getElementById('quiz').hidden = false;

        if (mode === 'exam') {
            ELEMENTS.timerDisplay.style.display = 'block';
            if (STATE.timeRemaining <= 0) STATE.timeRemaining = 60 * 60; // 60 mins
            startTimer();
        } else {
            ELEMENTS.timerDisplay.style.display = 'none';
        }

        renderCurrentQuestion();
    }

    function startTimer() {
        clearInterval(STATE.timerInterval);
        updateTimerDisplay();
        STATE.timerInterval = setInterval(() => {
            STATE.timeRemaining--;
            updateTimerDisplay();
            if (STATE.timeRemaining % 30 === 0) saveState(); // throttle saving for time

            if (STATE.timeRemaining <= 0) {
                clearInterval(STATE.timerInterval);
                submitExam();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        let rem = Math.max(0, STATE.timeRemaining);
        const m = Math.floor(rem / 60);
        const s = rem % 60;
        ELEMENTS.timerDisplay.textContent = `${m}:${s.toString().padStart(2, '0')}`;
        if (rem < 300) ELEMENTS.timerDisplay.style.color = 'var(--danger)';
    }

    function submitPractice() {
        let unanswered = [];
        STATE.questions.forEach((q, idx) => {
            let pState = STATE.practiceState[q.id];
            if (!pState || pState.attemptCount === 0) {
                unanswered.push(idx + 1);
            }
        });

        if (unanswered.length > 0) {
            alert("You cannot submit yet! You are yet to answer the following questions:\nQuestion(s): " + unanswered.join(", "));
            return;
        }
        showEndScreen();
    }

    function submitExam() { // Exam Mode submission logic
        let unanswered = [];
        STATE.questions.forEach((q, idx) => {
            if (STATE.examAnswers[q.id] === undefined) {
                unanswered.push(idx + 1);
            }
        });

        if (unanswered.length > 0) {
            if (!confirm("You haven't answered question(s): " + unanswered.join(", ") + ".\nWill you still submit?")) {
                return;
            }
        }

        clearInterval(STATE.timerInterval);
        STATE.score = 0;
        STATE.questions.forEach(q => {
            const ansUiIdx = STATE.examAnswers[q.id];
            if (ansUiIdx !== undefined) {
                const choice = q._currentMap[ansUiIdx];
                if (choice && choice.originalIdx === q.correctIndex) {
                    STATE.score++;
                }
            }
        });
        showEndScreen();
    }

    // --- Rendering ---
    const ELEMENTS = {
        quizSection: document.getElementById('quiz'),
        endScreen: document.getElementById('endScreen'),
        questionText: document.getElementById('questionText'),
        options: document.getElementById('options'),
        feedback: document.getElementById('feedbackContainer'),
        hintBox: document.getElementById('hintBox'),
        solutionBox: document.getElementById('solutionBox'),
        nextBtn: document.getElementById('nextBtn'),
        prevBtn: document.getElementById('prevBtn'),
        submitBtn: document.getElementById('submitBtn'),
        progress: document.getElementById('progress'),
        meta: document.getElementById('questionMeta'),
        score: document.getElementById('finalScore'),
        timerDisplay: document.getElementById('timerDisplay')
    };

    function renderMath(element) {
        if (!element) return;
        if (typeof window.renderMathInElement === 'function') {
            window.renderMathInElement(element, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '\\[', right: '\\]', display: true }, { left: '\\(', right: '\\)', display: false }], throwOnError: false });
        } else {
            setTimeout(() => {
                if (typeof window.renderMathInElement === 'function') {
                    window.renderMathInElement(element, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '\\[', right: '\\]', display: true }, { left: '\\(', right: '\\)', display: false }], throwOnError: false });
                }
            }, 500);
        }
    }

    function renderCurrentQuestion() {
        // Reset dynamic elements
        ELEMENTS.feedback.innerHTML = '';
        ELEMENTS.feedback.className = '';
        ELEMENTS.hintBox.hidden = true;
        ELEMENTS.solutionBox.hidden = true;

        if (ELEMENTS.nextBtn) ELEMENTS.nextBtn.hidden = true;
        if (ELEMENTS.submitBtn) ELEMENTS.submitBtn.hidden = true;
        if (ELEMENTS.prevBtn) ELEMENTS.prevBtn.hidden = (STATE.currentIndex === 0);

        ELEMENTS.endScreen.hidden = true;
        ELEMENTS.quizSection.hidden = false;

        const q = STATE.questions[STATE.currentIndex];
        const isLastQ = STATE.currentIndex === STATE.questions.length - 1;

        if (STATE.mode === 'exam') {
            const answeredCount = Object.keys(STATE.examAnswers).length;
            ELEMENTS.progress.textContent = `Unanswered: ${STATE.questions.length - answeredCount}`;
        } else {
            ELEMENTS.progress.textContent = `Score: ${STATE.score}`;
        }
        ELEMENTS.meta.textContent = `Question ${STATE.currentIndex + 1} of ${STATE.questions.length}`;

        ELEMENTS.questionText.innerHTML = window.DOMPurify.sanitize(q.question);

        // Pre-compute map to stabilize random generation if returning
        if (!q._currentMap) {
            let setOptions = q.options.map((text, idx) => ({ text, originalIdx: idx }));
            if (q.shuffleOptions !== false) {
                setOptions = shuffleArray(setOptions, STATE.seed + STATE.currentIndex);
            }
            q._currentMap = setOptions;
        }

        ELEMENTS.options.innerHTML = '';

        let pState = STATE.mode === 'practice' ? (STATE.practiceState[q.id] || { attemptCount: 0, passed: false }) : null;
        let examSelectedUIIdx = STATE.mode === 'exam' ? STATE.examAnswers[q.id] : -1;

        q._currentMap.forEach((opt, uiIdx) => {
            const btn = document.createElement('button');
            btn.className = 'option';

            if (STATE.mode === 'exam') {
                if (examSelectedUIIdx === uiIdx) {
                    btn.classList.add('selected');
                }
            } else if (STATE.mode === 'practice') {
                if (pState.passed || pState.attemptCount >= 2) {
                    btn.disabled = true; // lock in practice when finished
                }
            }

            btn.innerHTML = window.DOMPurify.sanitize(opt.text);
            btn.onclick = () => handleChoice(uiIdx);
            ELEMENTS.options.appendChild(btn);
        });

        // Set up Feedback and Navigation visibility bounds
        if (STATE.mode === 'exam') {
            if (!isLastQ) {
                if (ELEMENTS.nextBtn) { ELEMENTS.nextBtn.textContent = 'Next Question →'; ELEMENTS.nextBtn.hidden = false; }
            } else {
                if (ELEMENTS.nextBtn) ELEMENTS.nextBtn.hidden = true;
                if (ELEMENTS.submitBtn) { ELEMENTS.submitBtn.textContent = 'Submit Exam'; ELEMENTS.submitBtn.hidden = false; }
            }
        } else if (STATE.mode === 'practice') {
            // In practice mode, we allow skipping, so Next/Submit are always visible appropriately
            if (!isLastQ) {
                if (ELEMENTS.nextBtn) { ELEMENTS.nextBtn.textContent = 'Next Question →'; ELEMENTS.nextBtn.hidden = false; }
            } else {
                if (ELEMENTS.nextBtn) ELEMENTS.nextBtn.hidden = true;
                if (ELEMENTS.submitBtn) { ELEMENTS.submitBtn.textContent = 'Finish Practice'; ELEMENTS.submitBtn.hidden = false; }
            }

            if (pState.passed) {
                showFeedback(true, 'Correct! ✅');
            } else if (pState.attemptCount === 1) {
                showFeedback(false, 'Not quite. ❌');
                ELEMENTS.hintBox.innerHTML = `<strong>Hint:</strong> ${window.DOMPurify.sanitize(q.hint || "Try again.")}`;
                ELEMENTS.hintBox.hidden = false;
                renderMath(ELEMENTS.hintBox);
            } else if (pState.attemptCount >= 2) {
                showFeedback(false, 'Incorrect. ❌');
                ELEMENTS.solutionBox.innerHTML = `<strong>Solution:</strong><br>${window.DOMPurify.sanitize(q.solutionHTML)}`;
                ELEMENTS.solutionBox.hidden = false;
                renderMath(ELEMENTS.solutionBox);
            }
        }

        renderMath(ELEMENTS.questionText);
        renderMath(ELEMENTS.options);
    }

    function handleChoice(uiIdx) {
        const q = STATE.questions[STATE.currentIndex];

        // EXAM LOGIC: record answer and allow navigation away, highlighting the selected button visually
        if (STATE.mode === 'exam') {
            STATE.examAnswers[q.id] = uiIdx;
            saveState();
            renderCurrentQuestion(); // Re-render to show selection class
            return;
        }

        // PRACTICE LOGIC: check immediately, show feedback, accumulate points
        let pState = STATE.practiceState[q.id];
        if (!pState) {
            pState = { attemptCount: 0, passed: false, points: 0 };
            STATE.practiceState[q.id] = pState;
        }

        if (pState.passed || pState.attemptCount >= 2) return; // Prevent extra clicks if already locked

        const choice = q._currentMap[uiIdx];
        const isCorrect = choice.originalIdx === q.correctIndex;

        pState.attemptCount++;
        pushEvent('attempt', { questionId: q.id, attempt: pState.attemptCount, correct: isCorrect, mode: STATE.mode });

        if (isCorrect) {
            pState.passed = true;
            pState.points = (pState.attemptCount === 1) ? 1 : 0.5;
            STATE.score += pState.points;
            pushEvent('correct', { points: pState.points });
        }

        saveState();
        renderCurrentQuestion();
    }

    function showFeedback(success, msg) {
        ELEMENTS.feedback.className = `feedback ${success ? 'success' : 'fail'}`;
        ELEMENTS.feedback.innerHTML = msg;
    }

    function nextQuestion() {
        if (STATE.currentIndex < STATE.questions.length - 1) {
            STATE.currentIndex++;
            renderCurrentQuestion();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            saveState();
        }
    }

    function prevQuestion() {
        if (STATE.currentIndex > 0) {
            STATE.currentIndex--;
            renderCurrentQuestion();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            saveState();
        }
    }

    function showEndScreen() {
        clearInterval(STATE.timerInterval);
        ELEMENTS.quizSection.hidden = true;
        ELEMENTS.endScreen.hidden = false;
        ELEMENTS.score.textContent = `${STATE.score} / ${STATE.questions.length}`;
        pushEvent('complete', { score: STATE.score, mode: STATE.mode });
        saveState();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // --- Data Export Utilities (Stub for brevity) ---
    function downloadJSON() { alert('JSON download feature is available but condensed for demo.'); }
    function downloadCSV() { alert('CSV download feature is available but condensed for demo.'); }

    // --- Initialization ---
    async function init() {
        await checkStorageReliability();

        try {
            if (typeof window.QUESTIONS_DATA !== 'undefined') {
                STATE.questions = window.QUESTIONS_DATA;
            } else {
                throw new Error("No QUESTIONS_DATA global found.");
            }
        } catch (e) {
            console.warn("Quiz Init Error:", e);
            ELEMENTS.questionText.innerHTML = '<p>Loading questions failed. Check console.</p>';
            return;
        }

        document.getElementById('startPracticeBtn').onclick = () => startQuiz('practice');
        document.getElementById('startExamBtn').onclick = () => startQuiz('exam');

        loadState();

        // Resume checking logic
        let hasStartedExam = STATE.mode === 'exam' && Object.keys(STATE.examAnswers).length > 0;
        let hasStartedPractice = STATE.mode === 'practice' && Object.keys(STATE.practiceState).length > 0;

        if (hasStartedExam || hasStartedPractice) {
            startQuiz(STATE.mode);
        } else {
            document.getElementById('startScreen').hidden = false;
            document.getElementById('quiz').hidden = true;
        }

        if (ELEMENTS.nextBtn) ELEMENTS.nextBtn.onclick = nextQuestion;
        if (ELEMENTS.prevBtn) ELEMENTS.prevBtn.onclick = prevQuestion;
        if (ELEMENTS.submitBtn) ELEMENTS.submitBtn.onclick = () => {
            if (STATE.mode === 'practice') submitPractice();
            else submitExam();
        };
        const dlJsonBtn = document.getElementById('downloadJSONBtn');
        if (dlJsonBtn) dlJsonBtn.onclick = downloadJSON;
        const dlCsvBtn = document.getElementById('downloadCSVBtn');
        if (dlCsvBtn) dlCsvBtn.onclick = downloadCSV;

        const handleReset = () => {
            if (confirm('⚠️ Are you sure you want to reset your score and progress? This cannot be undone.')) {
                if (Object.keys(STATE.practiceState).length > 0 || Object.keys(STATE.examAnswers).length > 0) {
                    STATE.resetHistory.push({
                        timestamp: new Date().toISOString(),
                        finalScore: STATE.score,
                        mode: STATE.mode
                    });
                }
                STATE.currentIndex = 0;
                STATE.score = 0;
                STATE.timeRemaining = 3600;
                STATE.analytics = [];
                STATE.practiceState = {};
                STATE.examAnswers = {};
                saveState();
                location.reload();
            }
        };

        const retryBtn = document.getElementById('retryBtn');
        if (retryBtn) retryBtn.onclick = handleReset;

        const resetMetaBtn = document.getElementById('resetProgressBtn');
        if (resetMetaBtn) resetMetaBtn.onclick = handleReset;
    }

    init().catch(e => {
        console.error("CRITICAL INIT ERROR:", e);
    });

})(window, document);
