window.QUESTIONS_DATA = [
    {
        "id": "hw-set3-001",
        "topic": "Exponents",
        "difficulty": 3,
        "question": "An equation is shown.<br><br>\\[ \\frac{(x^6y^3)(x^\\square y^8)}{x^3y^4} = x^{12}y^\\Delta \\]<br><br>Find the values of \\( \\square \\) and \\( \\Delta \\) that make this equation true:",
        "options": [
            "\\( \\square = 9 \\) and \\( \\Delta = 7 \\)",
            "\\( \\square = 7 \\) and \\( \\Delta = 9 \\)",
            "\\( \\square = 6 \\) and \\( \\Delta = 7 \\)",
            "\\( \\square = 9 \\) and \\( \\Delta = 6 \\)"
        ],
        "correctIndex": 0,
        "hint": "1. Multiply terms in the numerator (add exponents for like bases).<br>2. Divide by the denominator (subtract exponents).<br>3. Set the resulting exponents equal to \\( 12 \\) and \\( \\Delta \\) respectively.",
        "solutionHTML": "1. <strong>Numerator:</strong> \\( x^{6+\\square}y^{3+8} = x^{6+\\square}y^{11} \\).<br>2. <strong>Divide:</strong> \\( \\frac{x^{6+\\square}}{x^3} = x^{6+\\square-3} = x^{3+\\square} \\) and \\( \\frac{y^{11}}{y^4} = y^{11-4} = y^7 \\).<br>3. <strong>Match exponents:</strong><br>For \\( y \\): \\( y^7 = y^\\Delta \\rightarrow \\Delta = 7 \\).<br>For \\( x \\): \\( x^{3+\\square} = x^{12} \\rightarrow \\square = 9 \\).",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set3-002",
        "topic": "Exponents",
        "difficulty": 2,
        "question": "Which of the following expression pairs are <strong>BOTH</strong> equivalent to \\( y^9 \\)?",
        "options": [
            "\\( y^4 \\times y^5 \\) and \\( \\frac{y^{10}}{y^1} \\)",
            "\\( y^5 + y^4 \\) and \\( y^9 \\times y^1 \\)",
            "\\( y^4 \\times y^5 \\) and \\( y^5 + y^4 \\)",
            "\\( \\frac{y^{10}}{y^1} \\) and \\( (y^3)^2 \\)"
        ],
        "correctIndex": 0,
        "hint": "Remember the rules of exponents:<br>Multiplication: \\( y^a \\times y^b = y^{a+b} \\).<br>Division: \\( y^a / y^b = y^{a-b} \\).<br>Addition (\\( y^a + y^b \\)) cannot be simplified by adding exponents.",
        "solutionHTML": "1. \\( y^4 \\times y^5 = y^{4+5} = y^9 \\) (Equivalent)<br>2. \\( \\frac{y^{10}}{y^1} = y^{10-1} = y^9 \\) (Equivalent)<br>3. \\( y^5 + y^4 \\) is just addition, it does not equal \\( y^9 \\).<br>4. \\( (y^3)^2 = y^6 \\).<br><strong>Correct Answer:</strong> The first pair.",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set3-003",
        "topic": "Exponents",
        "difficulty": 3,
        "question": "Which expression has the <strong>greatest</strong> value?",
        "options": [
            "\\( \\displaystyle \\frac{x^{-2}}{x^{-3}}, \\text{ where } x = 2 \\)",
            "\\( (2x)^3, \\text{ where } x=1 \\)",
            "\\( 4^0 \\)",
            "\\( 8^2 - 8^2 \\)"
        ],
        "correctIndex": 1,
        "hint": "Evaluate each expression to find its final numerical value.",
        "solutionHTML": "1. \\( \\frac{x^{-2}}{x^{-3}} = x^{-2 - (-3)} = x^1 \\). When \\( x=2 \\), value ensures to <strong>2</strong>.<br>2. \\( (2x)^3 \\rightarrow (2(1))^3 = 2^3 = \\) <strong>8</strong>.<br>3. \\( 4^0 = \\) <strong>1</strong>.<br>4. \\( 8^2 - 8^2 = 64 - 64 = \\) <strong>0</strong>.<br><br>The greatest value is 8.",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set3-004",
        "topic": "Scientific Notation",
        "difficulty": 3,
        "question": "What is the value of this expression in scientific notation?<br><br>\\[ \\frac{5^4 \\times 5^4 \\times 5^{-2}}{5^3 \\times 5^{-6}} \\]",
        "options": [
            "\\( 5 \\times 10^3 \\)",
            "\\( 1.25 \\times 10^2 \\)",
            "\\( 1.953125 \\times 10^6 \\)",
            "\\( 1.6384 \\times 10^{-10} \\)"
        ],
        "correctIndex": 2,
        "hint": "1. Simplify the numerator logic with base 5.<br>2. Simplify the denominator.<br>3. Divide. Find the numerical value, then convert to scientific notation.",
        "solutionHTML": "1. <strong>Numerator:</strong> \\( 5^{4+4-2} = 5^6 \\).<br>2. <strong>Denominator:</strong> \\( 5^{3+(-6)} = 5^{-3} \\).<br>3. <strong>Divide:</strong> \\( \\frac{5^6}{5^{-3}} = 5^{6 - (-3)} = 5^9 \\).<br>4. <strong>Evaluate:</strong> \\( 5^9 = 1\\,953\\,125 \\).<br>5. <strong>Scientific Notation:</strong> Move decimal 6 places left \\( \\rightarrow 1.953125 \\times 10^6 \\).",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set3-005",
        "topic": "Scientific Notation",
        "difficulty": 2,
        "question": "Which of the following is <strong>NOT</strong> equivalent to \\( 120\\,000 \\)?",
        "options": [
            "\\( 1.2 \\times 10^5 \\)",
            "\\( 12 \\times 10^4 \\)",
            "\\( 0.12 \\times 10^6 \\)",
            "\\( 1.2 \\times 10^4 \\)"
        ],
        "correctIndex": 3,
        "hint": "Convert all options to standard form by moving the decimal point according to the exponent.",
        "solutionHTML": "1. \\( 1.2 \\times 10^5 = 120\\,000 \\).<br>2. \\( 12 \\times 10^4 = 120\\,000 \\).<br>3. \\( 0.12 \\times 10^6 = 120\\,000 \\).<br>4. \\( 1.2 \\times 10^4 = 12\\,000 \\) (Not equivalent to 120,000).",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set3-006",
        "topic": "Rates",
        "difficulty": 3,
        "question": "Information about the volume of a pop tab is shown.<br><br>• \\( 1270 \\) pop tabs have a mass of \\( 1 \\text{ lb} \\).<br>• \\( 1 \\text{ lb} = 0.45 \\text{ kg} \\).<br>• The density of aluminium is \\( 2700 \\text{ kg/m}^3 \\).<br><br>Using \\( \\text{Volume} = \\frac{\\text{Mass}}{\\text{Density}} \\), what is the volume of <strong>one</strong> pop tab?",
        "options": [
            "\\( 1.3 \\times 10^{-7} \\text{ m}^3 \\)",
            "\\( 2.9 \\times 10^{-4} \\text{ m}^3 \\)",
            "\\( 3.7 \\times 10^{-7} \\text{ m}^3 \\)",
            "\\( 7.6 \\times 10^{3} \\text{ m}^3 \\)"
        ],
        "correctIndex": 0,
        "hint": "1. Find the mass of 1 pop tab in kg.<br>2. Divide this mass by the density to find the volume.",
        "solutionHTML": "1. <strong>Mass of 1 tab:</strong> \\( 0.45 \\text{ kg} \\div 1270 \\approx 0.0003543 \\text{ kg} \\).<br>2. <strong>Volume of 1 tab:</strong> \\( \\frac{0.0003543}{2700} \\approx 1.31 \\times 10^{-7} \\text{ m}^3 \\).<br>3. <strong>Answer:</strong> \\( 1.3 \\times 10^{-7} \\text{ m}^3 \\).",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set3-007",
        "topic": "Rates",
        "difficulty": 2,
        "question": "Oranges are sold in 4 different bags.<br><br>Bag A: \\( 1.5 \\text{ kg} \\) for \\( \\$4.00 \\)<br>Bag B: \\( 2.0 \\text{ kg} \\) for \\( \\$5.20 \\)<br>Bag C: \\( 2.5 \\text{ kg} \\) for \\( \\$6.00 \\)<br>Bag D: \\( 3.0 \\text{ kg} \\) for \\( \\$7.00 \\)<br><br>Which bag has the <strong>lowest</strong> cost per kilogram (the best buy)?",
        "options": [
            "Bag A",
            "Bag B",
            "Bag C",
            "Bag D"
        ],
        "correctIndex": 3,
        "hint": "Calculate the unit rate for each bag by dividing the Cost by the Mass.",
        "solutionHTML": "1. Bag A: \\( \\frac{4.00}{1.5} \\approx \\$2.66 / \\text{kg} \\)<br>2. Bag B: \\( \\frac{5.20}{2.0} = \\$2.60 / \\text{kg} \\)<br>3. Bag C: \\( \\frac{6.00}{2.5} = \\$2.40 / \\text{kg} \\)<br>4. Bag D: \\( \\frac{7.00}{3.0} \\approx \\$2.33 / \\text{kg} \\)<br><br><strong>Lowest cost:</strong> Bag D.",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set3-008",
        "topic": "Ratios",
        "difficulty": 1,
        "question": "Which option has a ratio of <strong>squares</strong> to <strong>triangles</strong> equivalent to \\( 4:5 \\)?",
        "options": [
            "3 squares and 4 triangles",
            "8 squares and 10 triangles",
            "5 squares and 6 triangles",
            "1 square and 2 triangles"
        ],
        "correctIndex": 1,
        "hint": "Check if multiplying or dividing both terms of the ratio 4:5 results in the options.",
        "solutionHTML": "Target ratio: \\( 4:5 \\).<br>Multiply both parts by 2:<br>\\( 4 \\times 2 = 8 \\) squares.<br>\\( 5 \\times 2 = 10 \\) triangles.<br>So \\( 8:10 \\) is equivalent to \\( 4:5 \\).",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set3-009",
        "topic": "Ratios",
        "difficulty": 2,
        "question": "At a fair, the ratio of adults to children is \\( 5:3 \\).<br>There are \\( 320 \\) people at the fair in total.<br><br>How many children are at the fair?",
        "options": [
            "\\( 120 \\)",
            "\\( 150 \\)",
            "\\( 192 \\)",
            "\\( 200 \\)"
        ],
        "correctIndex": 0,
        "hint": "1. Find the total number of parts in the ratio.<br>2. Find the value of one part.<br>3. Multiply that value by the number of parts for children.",
        "solutionHTML": "1. <strong>Total parts:</strong> \\( 5 + 3 = 8 \\) parts.<br>2. <strong>One part equals:</strong> \\( 320 \\div 8 = 40 \\) people.<br>3. <strong>Children:</strong> \\( 3 \\text{ parts} \\rightarrow 3 \\times 40 = 120 \\).",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set3-010",
        "topic": "Fractions",
        "difficulty": 3,
        "question": "There are \\( 42 \\) students:<br>- \\( \\frac{6}{7} \\) of the students are members of a school club;<br>- \\( \\frac{1}{4} \\) of the <strong>students who are members of a school club</strong> are members of the school environmental club.<br><br>How many of these students are members of a school club, but are <strong>not</strong> members of the school environmental club?",
        "options": [
            "\\( 18 \\) students",
            "\\( 24 \\) students",
            "\\( 27 \\) students",
            "\\( 36 \\) students"
        ],
        "correctIndex": 2,
        "hint": "1. Find the total number of club members.<br>2. Find how many of those club members are in the environmental club. <br>3. Subtract to find the rest.",
        "solutionHTML": "1. <strong>Club Members:</strong> \\( 42 \\times \\frac{6}{7} = 36 \\) students.<br>2. <strong>Environmental Club:</strong> \\( \\frac{1}{4} \\) of \\( 36 = 9 \\) students.<br>3. <strong>Other Clubs Only:</strong> \\( 36 - 9 = 27 \\) students.",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set3-011",
        "topic": "Number Sets",
        "difficulty": 3,
        "question": "Consider the set of positive integers between \\( 0 \\) and \\( 50 \\) (which has 49 elements) and the set of perfect squares between \\( 0 \\) and \\( 50 \\) (which only has 7 elements: \\(1, 4, 9, 16, 25, 36, 49\\)).<br><br>Select the statement that correctly compares the <strong>density</strong> (spacing and quantity on the typical number line) of these two sets.",
        "options": [
            "Both sets are equally dense.",
            "Both sets are equally dense and contain infinitely many numbers.",
            "The set of positive integers is more dense than the set of perfect squares.",
            "The set of positive integers is less dense than the set of perfect squares."
        ],
        "correctIndex": 2,
        "hint": "Density in this context means how closely packed the numbers are on a number line. Which set has more numbers packed into the same space?",
        "solutionHTML": "There are 49 positive integers in this interval, but only 7 perfect squares.<br>Because the integers are packed more tightly (every 1 unit), the set of positive integers is <strong>more dense</strong>.",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set3-012",
        "topic": "Classifying Numbers",
        "difficulty": 1,
        "question": "How many <strong>real numbers</strong> are there between \\( 1 \\) and \\( 2 \\)?",
        "options": [
            "\\( 0 \\)",
            "\\( 1 \\)",
            "\\( 100 \\)",
            "Infinitely many"
        ],
        "correctIndex": 3,
        "hint": "Real numbers include all fractions and decimals (rational and irrational). Can you ever run out of decimals?",
        "solutionHTML": "There are infinitely many real numbers between any two numbers. You can always add more precision to a decimal (e.g., \\( 1.1, 1.11, 1.111, ... \\)).",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set3-013",
        "topic": "Rational Ops",
        "difficulty": 3,
        "question": "A recipe uses \\( \\frac{1}{3} \\) cup of butter, \\( \\frac{1}{4} \\) cup of milk, and \\( \\frac{1}{2} \\) cup of flour.<br><br>A baker has \\( 4 \\) cups of butter, \\( 6 \\) cups of milk, and \\( 7 \\) cups of flour.<br><br>What is the <strong>maximum</strong> number of times the baker can make this exact recipe using what he has?",
        "options": [
            "\\( 4 \\) times",
            "\\( 12 \\) times",
            "\\( 14 \\) times",
            "\\( 20 \\) times"
        ],
        "correctIndex": 1,
        "hint": "Find the maximum number of recipes you can make with each individual ingredient. The smallest number determines the limit.",
        "solutionHTML": "1. <strong>Butter limit:</strong> \\( 4 \\div \\frac{1}{3} = 4 \\times 3 = 12 \\) recipes.<br>2. <strong>Milk limit:</strong> \\( 6 \\div \\frac{1}{4} = 6 \\times 4 = 24 \\) recipes.<br>3. <strong>Flour limit:</strong> \\( 7 \\div \\frac{1}{2} = 7 \\times 2 = 14 \\) recipes.<br><br>The baker runs out of butter first. He can make a maximum of <strong>12</strong> recipes.",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set3-014",
        "topic": "Number Line",
        "difficulty": 2,
        "question": "A student moves in a straight line with the following path:<br>- \\( 62 \\text{ m} \\) to the Right<br>- \\( 41 \\text{ m} \\) to the Left<br>- \\( 88 \\text{ m} \\) to the Right<br>- \\( 112 \\text{ m} \\) to the Left<br><br>At his final position, where is the student in relation to his initial position?",
        "options": [
            "\\( 3 \\text{ m} \\) to the right",
            "\\( 3 \\text{ m} \\) to the left",
            "\\( 303 \\text{ m} \\) to the right",
            "\\( 303 \\text{ m} \\) to the left"
        ],
        "correctIndex": 1,
        "hint": "Assign (+) to Right movements and (-) to Left movements. Sum them up to find the net displacement.",
        "solutionHTML": "1. Right: \\( +62 \\)<br>2. Left: \\( -41 \\)<br>3. Right: \\( +88 \\)<br>4. Left: \\( -112 \\)<br><br><strong>Net calculation:</strong> \\( 62 - 41 + 88 - 112 = 150 - 153 = -3 \\).<br>A result of \\( -3 \\) means <strong>3 m to the left</strong>.",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set3-015",
        "topic": "Applications",
        "difficulty": 2,
        "question": "The temperature is measured five times.<br>- The first temperature measured is \\( 7^\\circ\\text{C} \\).<br>- The temperature goes down by \\( 13^\\circ\\text{C} \\), up by \\( 4^\\circ\\text{C} \\), down by \\( 9^\\circ\\text{C} \\), and then up by \\( 1^\\circ\\text{C} \\).<br><br>What is the final temperature measured?",
        "options": [
            "\\( -20^\\circ\\text{C} \\)",
            "\\( -10^\\circ\\text{C} \\)",
            "\\( 10^\\circ\\text{C} \\)",
            "\\( 17^\\circ\\text{C} \\)"
        ],
        "correctIndex": 1,
        "hint": "Start at 7. Subtract for 'down', add for 'up'. Apply each change sequentially.",
        "solutionHTML": "1. Start: \\( 7 \\)<br>2. Down 13: \\( 7 - 13 = -6 \\)<br>3. Up 4: \\( -6 + 4 = -2 \\)<br>4. Down 9: \\( -2 - 9 = -11 \\)<br>5. Up 1: \\( -11 + 1 = -10 \\).<br><br>Final temperature is \\( -10^\\circ\\text{C} \\).",
        "version": 1,
        "shuffleOptions": true
    },
    {
        "id": "hw-set3-016",
        "topic": "Set Theory",
        "difficulty": 2,
        "question": "Set \\( F = \\{0, 5, 10, 15, ...\\} \\) and Set \\( G = \\{0, 3, 6, 9, ...\\} \\).<br><br>What is the <strong>least</strong> non-zero element in \\( F \\cap G \\)?",
        "options": [
            "\\( 15 \\)",
            "\\( 30 \\)",
            "\\( 45 \\)",
            "\\( 60 \\)"
        ],
        "correctIndex": 0,
        "hint": "Set F contains multiples of 5. Set G contains multiples of 3. What is the Least Common Multiple (LCM) of 5 and 3?",
        "solutionHTML": "The intersection \\( F \\cap G \\) consists of numbers that belong to both sets (common multiples of 5 and 3).<br>The common multiples are \\( \\{0, 15, 30, 45, ...\\} \\).<br>The least non-zero element is <strong>15</strong>.",
        "version": 1,
        "shuffleOptions": true
    }
];
