window.QUESTIONS_DATA = [
    {
        "id": "hw-set1-001",
        "topic": "Exponents",
        "difficulty": 1,
        "question": "What exponent goes in the box to make the following equation true?<br><br>\\[ \\frac{x^\\square x^6}{x^2} = x^{12} \\]",
        "options": [
            "9",
            "8",
            "4",
            "3"
        ],
        "correctIndex": 1,
        "hint": "Use exponent laws:<br>1. Multiply terms on top: \\( x^a \\cdot x^b = x^{a+b} \\)<br>2. Divide terms: \\( x^m / x^n = x^{m-n} \\)",
        "solutionHTML": "1. <strong>Simplify Numerator:</strong> \\( x^\\square \\cdot x^6 = x^{\\square + 6} \\)<br>2. <strong>Divide:</strong> \\( \\frac{x^{\\square+6}}{x^2} = x^{(\\square+6)-2} = x^{\\square+4} \\)<br>3. <strong>Solve equation:</strong><br>\\( x^{\\square+4} = x^{12} \\)<br>\\( \\square + 4 = 12 \\)<br>\\( \\square = 8 \\)",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set1-002",
        "topic": "Exponents",
        "difficulty": 2,
        "question": "Which expression is equivalent to \\( x^6 \\)?",
        "options": [
            "\\( x^3(x^2)^2 \\)",
            "\\( \\frac{x^{11}}{x^3(x^2)} \\)",
            "\\( (x^3)^4 \\)",
            "\\( \\frac{x^5(x^7)}{x^2} \\)"
        ],
        "correctIndex": 1,
        "hint": "Simplify each option to see which one equals \\( x^6 \\).",
        "solutionHTML": "Let's check each option:<br>1. \\( x^3(x^2)^2 = x^3(x^4) = x^7 \\) (Incorrect)<br>2. \\( \\frac{x^{11}}{x^3 \\cdot x^2} = \\frac{x^{11}}{x^5} = x^{11-5} = x^6 \\) (Correct!)<br>3. \\( (x^3)^4 = x^{3 \\times 4} = x^{12} \\) (Incorrect)<br>4. \\( \\frac{x^5 \\cdot x^7}{x^2} = \\frac{x^{12}}{x^2} = x^{10} \\) (Incorrect)",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set1-003",
        "topic": "Scientific Notation",
        "difficulty": 1,
        "question": "What is the correct way to express \\( 25,300,000 \\) using scientific notation?",
        "options": [
            "\\( 2.53 \\times 10^{-7} \\)",
            "\\( 2.53 \\times 10^{7} \\)",
            "\\( 25.3 \\times 10^{-6} \\)",
            "\\( 253 \\times 10^{5} \\)"
        ],
        "correctIndex": 1,
        "hint": "Scientific notation must be in the form \\( a \\times 10^n \\) where \\( 1 \\le a < 10 \\). Move the decimal point to after the first digit.",
        "solutionHTML": "1. <strong>Move decimal:</strong> Place decimal after the 2: \\( 2.53 \\).<br>2. <strong>Count places:</strong> To get back to 25,300,000, move decimal 7 places to the right.<br>3. <strong>Result:</strong> \\( 2.53 \\times 10^7 \\)",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set1-004",
        "topic": "Rates",
        "difficulty": 2,
        "question": "James adds vitamin drops to his fish tank.<br><strong>Instructions:</strong> 2 drops per 5 litres. 1 capful = 40 drops.<br><br>How many capfuls for a 350-litre tank?",
        "options": [
            "2.5 capfuls",
            "3.0 capfuls",
            "3.5 capfuls",
            "4.0 capfuls"
        ],
        "correctIndex": 2,
        "hint": "1. Find how many 5L units are in 350L.<br>2. Calculate total drops needed.<br>3. Convert drops to capfuls.",
        "solutionHTML": "1. <strong>Find groups of 5L:</strong> \\( 350 \\div 5 = 70 \\) groups.<br>2. <strong>Calculate Drops:</strong> \\( 70 \\times 2 \\text{ drops} = 140 \\text{ drops} \\).<br>3. <strong>Convert to Capfuls:</strong> \\( 140 \\div 40 = 3.5 \\).<br><strong>Answer:</strong> 3.5 capfuls.",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set1-005",
        "topic": "Ratios",
        "difficulty": 1,
        "question": "Billy has 3 apples and 4 oranges (Ratio 3:4).<br>Which of the following has an equivalent ratio of apples to oranges?",
        "options": [
            "3 apples and 8 oranges",
            "4 apples and 3 oranges",
            "8 apples and 6 oranges",
            "9 apples and 12 oranges"
        ],
        "correctIndex": 3,
        "hint": "Equivalent ratios can be found by multiplying both sides of the ratio by the same number.",
        "solutionHTML": "Billy's Ratio: \\( 3:4 \\).<br>Let's check the options:<br>1. \\( 3:8 \\) (No)<br>2. \\( 4:3 \\) (No - reversed)<br>3. \\( 8:6 = 4:3 \\) (No)<br>4. \\( 9:12 \\). Simplify by dividing by 3: \\( 9\\div3 : 12\\div3 = 3:4 \\). (Correct!)",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set1-006",
        "topic": "Ratios",
        "difficulty": 2,
        "question": "Mario mixes orange juice and pineapple juice in a ratio of \\( 1:3 \\).<br>How much pineapple juice for \\( 3 \\text{ L} \\) of punch?",
        "options": [
            "\\( 0.75 \\text{ L} \\)",
            "\\( 2 \\text{ L} \\)",
            "\\( 2.25 \\text{ L} \\)",
            "\\( 4 \\text{ L} \\)"
        ],
        "correctIndex": 2,
        "hint": "Total parts = \\( 1 + 3 = 4 \\).<br>Pineapple is \\( \\frac{3}{4} \\) of the total mixture.",
        "solutionHTML": "1. <strong>Total Parts:</strong> \\( 1 + 3 = 4 \\) parts.<br>2. <strong>Fraction Pineapple:</strong> \\( \\frac{3}{4} \\).<br>3. <strong>Calculate Amount:</strong> \\( \\frac{3}{4} \\times 3 \\text{ L} = \\frac{9}{4} \\text{ L} = 2.25 \\text{ L} \\).",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set1-007",
        "topic": "Percentages",
        "difficulty": 3,
        "question": "Equatorial radius of Mars is \\( 3389.5 \\text{ km} \\).<br>Venus is \\( 78.5\\% \\) greater than Mars.<br>Earth is \\( 5.3\\% \\) greater than Venus.<br>What is Earth's equatorial radius?",
        "options": [
            "\\( 9257 \\text{ km} \\)",
            "\\( 5871 \\text{ km} \\)",
            "\\( 6371 \\text{ km} \\)",
            "\\( 6230 \\text{ km} \\)"
        ],
        "correctIndex": 2,
        "hint": "Increase by percentage means multiplying by \\( 1 + \\text{percentage} \\).<br>Venus = Mars \\( \\times 1.785 \\).<br>Earth = Venus \\( \\times 1.053 \\).",
        "solutionHTML": "1. <strong>Radius of Venus:</strong><br>\\( 3389.5 \\times 1.785 \\approx 6050.26 \\text{ km} \\)<br>2. <strong>Radius of Earth:</strong><br>\\( 6050.26 \\times 1.053 \\approx 6370.92 \\text{ km} \\)<br>3. <strong>Round:</strong> Closest answer is \\( 6371 \\text{ km} \\).",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set1-008",
        "topic": "Set Theory",
        "difficulty": 1,
        "question": "Which of these sets include the number \\( 0 \\)?<br>I. Integers<br>II. Real Numbers<br>III. Irrational Numbers",
        "options": [
            "Integers & Real Numbers",
            "All of them",
            "Only Real Numbers",
            "Integers & Irrational"
        ],
        "correctIndex": 0,
        "hint": "Integers are {..., -2, -1, 0, 1, 2, ...}.<br>Real numbers include everything on the number line.<br>Irrational numbers are non-repeating decimals (like pi).",
        "solutionHTML": "1. <strong>Integers:</strong> Include 0. (Yes)<br>2. <strong>Real Numbers:</strong> Include all rational/integers. (Yes)<br>3. <strong>Irrational Numbers:</strong> Cannot be expressed as fraction. 0 is rational (\\(0/1\\)). (No)<br><strong>Correct Answer:</strong> Integers & Real Numbers.",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set1-009",
        "topic": "Classifying Numbers",
        "difficulty": 1,
        "question": "Which number is an <strong>irrational</strong> number?",
        "options": [
            "\\( -4 \\)",
            "\\( 0.\\overline{35} \\)",
            "\\( -\\frac{3}{7} \\)",
            "\\( \\sqrt{5} \\)"
        ],
        "correctIndex": 3,
        "hint": "Rational numbers can be written as fractions \\( p/q \\). Terminating or repeating decimals are rational.<br>Roots of non-square numbers are irrational.",
        "solutionHTML": "1. \\( -4 \\): Integer (Rational).<br>2. \\( 0.\\overline{35} \\): Repeating decimal (Rational).<br>3. \\( -\\frac{3}{7} \\): Fraction (Rational).<br>4. \\( \\sqrt{5} \\): Square root of non-square (Irrational).",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set1-010",
        "topic": "Classifying Numbers",
        "difficulty": 1,
        "question": "Which statement about rational numbers is correct?",
        "options": [
            "A rational number is always positive.",
            "A rational number can be written as a fraction.",
            "The square root of any number is rational.",
            "A rational decimal is non-ending and non-repeating."
        ],
        "correctIndex": 1,
        "hint": "Definition of Rational Number: Any number that can be expressed as \\( \\frac{p}{q} \\) where \\( p, q \\) are integers.",
        "solutionHTML": "1. <strong>Always positive?</strong> No, -5 is rational.<br>2. <strong>Written as fraction?</strong> Yes, by definition.<br>3. <strong>Root of any number?</strong> No, \\( \\sqrt{2} \\) is irrational.<br>4. <strong>Non-ending/non-repeating?</strong> No, those are irrational.",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set1-011",
        "topic": "Number Operations",
        "difficulty": 1,
        "question": "Which rational number is equivalent to \\( -\\frac{5}{6} \\)?",
        "options": [
            "\\( \\frac{-10}{12} \\)",
            "\\( -\\frac{-5}{6} \\)",
            "\\( \\frac{10}{12} \\)",
            "\\( \\frac{5}{6} \\)"
        ],
        "correctIndex": 0,
        "hint": "Simplify the fractions or check the signs.",
        "solutionHTML": "1. \\( \\frac{-10}{12} \\): Divide top/bottom by 2 \\( \\rightarrow \\frac{-5}{6} \\). (Correct)<br>2. \\( -\\frac{-5}{6} = +\\frac{5}{6} \\).<br>3. \\( \\frac{10}{12} = \\frac{5}{6} \\).<br>4. \\( \\frac{5}{6} \\).",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set1-012",
        "topic": "Number Operations",
        "difficulty": 2,
        "question": "Which list shows the numbers in order from <strong>least to greatest</strong>?",
        "options": [
            "\\( \\sqrt{5}, \\; 2.1, \\; \\frac{9}{4}, \\; 2.5 \\)",
            "\\( 2.1, \\; \\sqrt{5}, \\; 2.5, \\; \\frac{9}{4} \\)",
            "\\( 2.1, \\; \\sqrt{5}, \\; \\frac{9}{4}, \\; 2.5 \\)",
            "\\( \\frac{9}{4}, \\; 2.1, \\; 2.5, \\; \\sqrt{5} \\)"
        ],
        "correctIndex": 2,
        "hint": "Convert all to decimals:<br>\\( \\sqrt{5} \\approx 2.236 \\)<br>\\( \\frac{9}{4} = 2.25 \\)",
        "solutionHTML": "Values:<br>1. \\( 2.1 = 2.10 \\)<br>2. \\( \\sqrt{5} \\approx 2.236 \\)<br>3. \\( \\frac{9}{4} = 2.25 \\)<br>4. \\( 2.5 = 2.50 \\)<br><br>Order: \\( 2.1 < 2.236 < 2.25 < 2.5 \\).",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set1-013",
        "topic": "Exponents",
        "difficulty": 2,
        "question": "What is the value of \\( (x^2)^3 \\) when \\( x = \\frac{1}{2} \\)?",
        "options": [
            "\\( \\frac{1}{4} \\)",
            "\\( \\frac{1}{12} \\)",
            "\\( \\frac{1}{32} \\)",
            "\\( \\frac{1}{64} \\)"
        ],
        "correctIndex": 3,
        "hint": "1. Simplify \\( (x^2)^3 \\) using power of a power rule.<br>2. Substitute \\( x = \\frac{1}{2} \\).",
        "solutionHTML": "1. <strong>Simplify:</strong> \\( (x^2)^3 = x^{2 \\times 3} = x^6 \\).<br>2. <strong>Substitute:</strong> \\( (\\frac{1}{2})^6 \\).<br>3. <strong>Calculate:</strong> \\( \\frac{1^6}{2^6} = \\frac{1}{64} \\).",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set1-014",
        "topic": "Applications",
        "difficulty": 1,
        "question": "Temperature increased from \\( -23^\\circ\\text{C} \\) to \\( 38^\\circ\\text{C} \\).<br>How many degrees did it increase by?",
        "options": [
            "\\( -15^\\circ\\text{C} \\)",
            "\\( 15^\\circ\\text{C} \\)",
            "\\( -61^\\circ\\text{C} \\)",
            "\\( 61^\\circ\\text{C} \\)"
        ],
        "correctIndex": 3,
        "hint": "Change = Final - Initial.<br>\\( 38 - (-23) \\).",
        "solutionHTML": "calculation: \\( 38 - (-23) = 38 + 23 = 61 \\).<br>The temperature rose by 61 degrees.",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set1-015",
        "topic": "Applications",
        "difficulty": 1,
        "question": "A student walks 5 km North, then 3 km South.<br>What is the student's displacement from the starting point?",
        "options": [
            "8 km North",
            "2 km South",
            "2 km North",
            "8 km South"
        ],
        "correctIndex": 2,
        "hint": "North is positive (+), South is negative (-).<br>\\( +5 - 3 = ? \\)",
        "solutionHTML": "1. Walk +5 (North).<br>2. Walk -3 (South).<br>3. <strong>Net result:</strong> \\( 5 - 3 = +2 \\).<br>Positive means North.<br><strong>Answer:</strong> 2 km North.",
        "version": 1,
        "shuffleOptions": true
    }
];
