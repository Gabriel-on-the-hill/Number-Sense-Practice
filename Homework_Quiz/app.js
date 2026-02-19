// --- NAMESPACE WRAPPER START ---
(function (window, document) {
    "use strict";

    // --- Configuration ---
    const CONFIG = {
        storageKey: 'fq_progress_homework_set1_v1',
        questionsFile: './data/questions.json',
        minPassScore: 0.7 // 70%
    };

    // --- Dependency Safety ---
    if (typeof window.DOMPurify === 'undefined') {
        window.log && window.log("DOMPurify missing. Using fallback.");
        window.DOMPurify = { sanitize: function (x) { return x; } };
    }
    // KaTeX check is done in renderMath

    // --- State Management ---
    const STATE = {
        mode: 'practice', // 'practice' | 'exam'
        timeRemaining: 3600, // 60 mins in seconds
        timerInterval: null,
        currentIndex: 0,
        attempt: 0,
        score: 0,
        analytics: [],
        resetHistory: [], // Track previous resets
        seed: Date.now(),
        questions: []
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
                currentIndex: STATE.currentIndex,
                attempt: STATE.attempt,
                score: STATE.score,
                analytics: STATE.analytics,
                resetHistory: STATE.resetHistory,
                seed: STATE.seed
            }));
        } catch (e) {
            console.warn('Storage failed:', e);
        }
    }

    function loadState() {
        try {
            const s = JSON.parse(localStorage.getItem(CONFIG.storageKey));
            if (s) {
                STATE.currentIndex = s.currentIndex || 0;
                STATE.attempt = s.attempt || 0;
                STATE.score = s.score || 0;
                STATE.analytics = s.analytics || [];
                STATE.resetHistory = s.resetHistory || [];
                STATE.seed = s.seed || Date.now();
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
        console.warn('Storage Warning (UI Suppressed):', msg);
        // const b = document.getElementById('storage-warning');
        // if (b) {
        //     b.innerHTML = `⚠️ <strong>Warning:</strong> ${msg}`;
        //     b.hidden = false;
        // }
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

    function buildExportPayload() {
        const questionSummary = STATE.questions.map((q, idx) => {
            const qEvents = STATE.analytics.filter(e => e.payload?.questionId === q.id);
            const attempts = qEvents.filter(e => e.type === 'attempt');
            const isCorrect = attempts.some(a => a.payload.correct);
            const attemptsCount = attempts.length;

            return {
                id: q.id,
                index: idx + 1,
                attempts: attemptsCount,
                status: isCorrect ? (attemptsCount === 1 ? 'Correct' : 'Correct (Retry)') : 'Incorrect',
                score: qEvents.find(e => e.type === 'correct')?.payload?.points || 0
            };
        });

        return {
            meta: {
                app: 'HomeworkSet1Quiz',
                exportedAt: new Date().toISOString(),
                totalScore: STATE.score,
                totalQuestions: STATE.questions.length,
                resets: STATE.resetHistory.length
            },
            summary: questionSummary,
            resetHistory: STATE.resetHistory,
            rawEvents: STATE.analytics
        };
    }

    function downloadJSON() {
        const data = buildExportPayload();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        triggerDownload(blob, `homework_set1_data_${Date.now()}.json`);
    }

    function downloadCSV() {
        const data = buildExportPayload();
        const headers = ['Question Index', 'ID', 'Status', 'Attempts', 'Score'];
        const rows = data.summary.map(q => [
            q.index,
            q.id,
            q.status,
            q.attempts,
            q.score
        ]);
        const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        triggerDownload(blob, `homework_set1_summary_${Date.now()}.csv`);
    }

    function triggerDownload(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // --- Mode & Timer ---
    function startQuiz(mode) {
        STATE.mode = mode;
        document.getElementById('startScreen').hidden = true;
        document.getElementById('quiz').hidden = false;

        if (mode === 'exam') {
            ELEMENTS.timerDisplay.style.display = 'block';
            STATE.timeRemaining = 60 * 60; // 60 mins
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
            if (STATE.timeRemaining <= 0) {
                clearInterval(STATE.timerInterval);
                finishExam();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const m = Math.floor(STATE.timeRemaining / 60);
        const s = STATE.timeRemaining % 60;
        ELEMENTS.timerDisplay.textContent = `${m}:${s.toString().padStart(2, '0')}`;
        // Visual urgency
        if (STATE.timeRemaining < 300) ELEMENTS.timerDisplay.style.color = 'var(--fq-danger)';
    }

    function finishExam() {
        // Auto-submit
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
        progress: document.getElementById('progress'),
        meta: document.getElementById('questionMeta'),
        score: document.getElementById('finalScore'),
        timerDisplay: document.getElementById('timerDisplay')
    };

    function renderMath(element) {
        if (!element) return;
        if (typeof window.renderMathInElement === 'function') {
            window.renderMathInElement(element, {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '\\[', right: '\\]', display: true },
                    { left: '\\(', right: '\\)', display: false }
                ],
                throwOnError: false
            });
        } else {
            setTimeout(() => {
                if (typeof window.renderMathInElement === 'function') {
                    window.renderMathInElement(element, {
                        delimiters: [
                            { left: '$$', right: '$$', display: true },
                            { left: '\\[', right: '\\]', display: true },
                            { left: '\\(', right: '\\)', display: false }
                        ],
                        throwOnError: false
                    });
                }
            }, 500);
        }
    }

    function renderCurrentQuestion() {
        ELEMENTS.feedback.innerHTML = '';
        ELEMENTS.hintBox.hidden = true;
        ELEMENTS.solutionBox.hidden = true;
        ELEMENTS.nextBtn.hidden = true;
        ELEMENTS.endScreen.hidden = true;
        ELEMENTS.quizSection.hidden = false;

        const q = STATE.questions[STATE.currentIndex];

        ELEMENTS.meta.textContent = `Question ${STATE.currentIndex + 1} of ${STATE.questions.length}`;
        ELEMENTS.progress.textContent = `Score: ${STATE.score}`;

        ELEMENTS.questionText.innerHTML = window.DOMPurify.sanitize(q.question);

        ELEMENTS.options.innerHTML = '';
        let setOptions = q.options.map((text, idx) => ({ text, originalIdx: idx }));
        if (q.shuffleOptions !== false) {
            setOptions = shuffleArray(setOptions, STATE.seed + STATE.currentIndex);
        }
        q._currentMap = setOptions;

        setOptions.forEach((opt, uiIdx) => {
            const btn = document.createElement('button');
            btn.className = 'option';
            btn.innerHTML = window.DOMPurify.sanitize(opt.text);
            btn.onclick = () => handleChoice(uiIdx);
            ELEMENTS.options.appendChild(btn);
        });

        renderMath(ELEMENTS.questionText);
        renderMath(ELEMENTS.options);
        ELEMENTS.questionText.focus();
    }

    function handleChoice(uiIdx) {
        const q = STATE.questions[STATE.currentIndex];
        const choice = q._currentMap[uiIdx];
        const isCorrect = choice.originalIdx === q.correctIndex;

        const attemptNum = STATE.attempt + 1;
        pushEvent('attempt', {
            questionId: q.id,
            attempt: attemptNum,
            correct: isCorrect,
            choiceIdx: choice.originalIdx,
            mode: STATE.mode
        });

        // Exam Mode: Silent Advance
        if (STATE.mode === 'exam') {
            if (isCorrect) STATE.score++; // Simple 1 point
            STATE.currentIndex++;
            if (STATE.currentIndex >= STATE.questions.length) {
                finishExam();
            } else {
                renderCurrentQuestion();
            }
            saveState(); // Minimal save
            return;
        }

        // Practice Mode: Feedback Loop
        if (isCorrect) {
            const points = STATE.attempt === 0 ? 1 : 0.5;
            STATE.score += points;
            showFeedback(true, 'Correct! ✅');
            ELEMENTS.nextBtn.hidden = false;
            ELEMENTS.nextBtn.focus();
            pushEvent('correct', { points });
            disableOptions();
            STATE.attempt = 0;
        } else {
            if (STATE.attempt === 0) {
                showFeedback(false, 'Not quite. ❌');
                ELEMENTS.hintBox.innerHTML = `<strong>Hint:</strong> ${window.DOMPurify.sanitize(q.hint || "Try identifying the key concepts.")}`;
                ELEMENTS.hintBox.hidden = false;
                renderMath(ELEMENTS.hintBox);
                STATE.attempt = 1;
            } else {
                showFeedback(false, 'Incorrect. ❌');
                ELEMENTS.solutionBox.innerHTML = `<strong>Solution:</strong><br>${window.DOMPurify.sanitize(q.solutionHTML)}`;
                ELEMENTS.solutionBox.hidden = false;
                renderMath(ELEMENTS.solutionBox);
                ELEMENTS.nextBtn.hidden = false;
                disableOptions();
                STATE.attempt = 0;
            }
        }
        saveState();
    }

    function disableOptions() {
        Array.from(ELEMENTS.options.children).forEach(b => b.disabled = true);
    }

    function showFeedback(success, msg) {
        ELEMENTS.feedback.className = `feedback ${success ? 'success' : 'fail'}`;
        ELEMENTS.feedback.innerHTML = msg;
    }

    function nextQuestion() {
        STATE.currentIndex++;
        if (STATE.currentIndex >= STATE.questions.length) {
            showEndScreen();
        } else {
            renderCurrentQuestion();
        }
        saveState();
    }

    function showEndScreen() {
        ELEMENTS.quizSection.hidden = true;
        ELEMENTS.endScreen.hidden = false;
        ELEMENTS.score.textContent = `${STATE.score} / ${STATE.questions.length}`;
        pushEvent('complete', { score: STATE.score });
        saveState();
    }

    // --- Initialization ---
    async function init() {
        await checkStorageReliability();

        // Load Questions (from Global - configured in index.html)
        try {
            // Note: QUESTIONS_DATA is still global (window.QUESTIONS_DATA)
            // This is acceptable as data injection point
            if (typeof window.QUESTIONS_DATA !== 'undefined') {
                STATE.questions = window.QUESTIONS_DATA;
            } else {
                console.log("Global data not found, attempting fetch...");
                const res = await fetch(CONFIG.questionsFile);
                if (!res.ok) throw new Error(`Failed to load questions: ${res.statusText}`);
                STATE.questions = await res.json();
            }
        } catch (e) {
            console.warn("Quiz Init Error (UI Suppressed):", e);
            // Fallback to empty state or retry silently
            ELEMENTS.questionText.innerHTML = '<p>Loading questions...</p>';
            return;
            console.error("Quiz Init Error:", e);
            return;
        }

        // 3. Bind Global Buttons
        document.getElementById('startPracticeBtn').onclick = () => startQuiz('practice');
        document.getElementById('startExamBtn').onclick = () => startQuiz('exam');

        loadState();

        // Resume if valid state exists, otherwise wait on Start Screen
        if (STATE.currentIndex > 0 || STATE.score > 0) {
            // Resume functionality - simplistic for now, defaulting to stored mode or practice
            startQuiz(STATE.mode || 'practice');
        } else {
            // Show Start Screen
            document.getElementById('startScreen').hidden = false;
            document.getElementById('quiz').hidden = true;
        }

        ELEMENTS.nextBtn.onclick = nextQuestion;
        document.getElementById('downloadJSONBtn').onclick = downloadJSON;
        document.getElementById('downloadCSVBtn').onclick = downloadCSV;

        const handleReset = () => {
            if (confirm('⚠️ Are you sure you want to reset your score and progress? This cannot be undone.')) {
                // Archive current run if meaningful
                if (STATE.currentIndex > 0 || STATE.score > 0) {
                    STATE.resetHistory.push({
                        timestamp: new Date().toISOString(),
                        questionsAnswered: STATE.currentIndex,
                        finalScore: STATE.score
                    });
                }

                // Clear Progress
                STATE.currentIndex = 0;
                STATE.score = 0;
                STATE.attempt = 0;
                STATE.analytics = []; // Clear current run logs

                // Save and Reload
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
        console.error("CRITICAL INIT ERROR (UI Suppressed):", e);
    });

})(window, document);
// --- NAMESPACE WRAPPER END ---
