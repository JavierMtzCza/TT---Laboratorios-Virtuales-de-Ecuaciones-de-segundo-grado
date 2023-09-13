String.prototype.format = function() {
    var delimitersSpecified = typeof arguments[0] === 'object';
    var delimiters = delimitersSpecified ? arguments[0] : {};
    delimiters.left = delimiters.left || '{';
    delimiters.right = delimiters.right || '}';

    var formattedString = this;
    var strIndex = 0;
    var i = delimitersSpecified ? 1 : 0;
    for (; i < arguments.length; i++) {
        var reg = new RegExp('\\' + delimiters.left + strIndex + '\\' + delimiters.right, 'gm');
        formattedString = formattedString.replace(reg, arguments[i]);
        strIndex++;
    }

    return formattedString;
};

String.prototype.formatForLatex = function () {
    var args = [{ left: '@', right: '@' }];
    for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    }

    return this.format.apply(this, args);
}

var QS = {
    aInput: null,
    bInput: null,
    cInput: null,
    answerDiv: null,
    calculateButton: null,


    setup: function() {
        // Get references to elements
        this.aInput = document.getElementById('a');
        this.bInput = document.getElementById('b');
        this.cInput = document.getElementById('c');
        this.answerDiv = document.getElementById('answer');
        this.calculateButton = document.getElementById('calculateButton');
        
        // Load the data from local storage
        if (localStorage.savedAInput) {
            this.aInput.value = localStorage.savedAInput;
            this.bInput.value = localStorage.savedBInput;
            this.cInput.value = localStorage.savedCInput;
        }

        // Add a click event listener to the Calculate button
        this.calculateButton.addEventListener('click', function() {
            QS.printAnswer.apply(QS);
        }, false);
    },

        

    printAnswer: function () {
        var a = parseFloat(this.aInput.value);
        var b = parseFloat(this.bInput.value);
        var c = parseFloat(this.cInput.value);
    
        // Print the answer to the screen
        var answerSteps = QS.solveEquation(a, b, c);
    
        if (typeof answerSteps === 'string') {
            this.answerDiv.innerHTML = answerSteps;
        } else {
            var answerLaTeX = '\\begin{align}\n';
    
            for (var i = 0; i < answerSteps.length; i++) {
                var currentStep = answerSteps[i];
    
                answerLaTeX += currentStep.latex;
    
                if (currentStep.inlineExplanation) {
                    answerLaTeX += '&&\\text{@0@}'.formatForLatex(currentStep.inlineExplanation);
                }
    
                answerLaTeX += ' \\\\\n';
    
                // Separate x1 and x2 from the steps
                if (currentStep.latex.includes('x1 =')) {
                    answerLaTeX += '\\text{x1} = ' + currentStep.latex.split('x1 =')[1];
                    answerLaTeX += ' \\\\\n';
                }
                if (currentStep.latex.includes('x2 =')) {
                    answerLaTeX += '\\text{x2} = ' + currentStep.latex.split('x2 =')[1];
                    answerLaTeX += ' \\\\\n';
                }
            }
    
            answerLaTeX += '\\end{align}';
    
            this.answerDiv.innerHTML = answerLaTeX;
        }
    
        MathJax.Hub.Typeset();
        // Save the values to local storage
        localStorage.savedAInput = a;
        localStorage.savedBInput = b;
        localStorage.savedCInput = c;
    },

    solveEquation: function(a, b, c) {
        var underSqrRt = b * b - 4 * a * c;
        var isReal = (b * b - 4 * a * c) >= 0;
        var denominator = 2 * a;
        var squareRoot = Math.sqrt(Math.abs(underSqrRt));

        var answerSteps = [];

        // If a = 0, the equation is not quadratic. Solve using x = -c/b 
        if (a === 0) {
            if (b === 0 && c === 0) {
                return 'Por favor ingresa valores para "a", "b" y "c".';
            } else if (b === 0 && c !== 0) {
                return 'Ecuación Invalida . Si $a = b = 0$ y $c \\neq 0$ entonces la ' +
                    'ecuación se convierte en $$0x^2+0x+@0@ = 0 \\implies @0@ = 0$$'.formatForLatex(c) +
                    'lo cual es invalido.';
            }

            answerSteps.push(
                { latex: 'ax^2 + bx + c &= 0' },
                { latex: '0x^2 + @0@x + @1@ &= 0'.formatForLatex(b, c) },
                { latex: '@0@x &= -@1@'.formatForLatex(b, c) },
                { latex: 'x &= -\\frac{@0@}{@1@}'.formatForLatex(c, b) },
                { latex: 'x &= @0@'.formatForLatex(this.getFractionLaTeX(-c, b)) }
            );

            return answerSteps;
        }

        answerSteps.push(
            { latex: 'x &= \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
            { latex: '&= \\frac{-@1@ \\pm \\sqrt{@1@^2 - 4(@0@)(@2@)}}{2(@0@)}'.formatForLatex(a, b, c) },
            { latex: '&=\\frac{-@0@ \\pm \\sqrt{@1@ - @2@}}{@3@}'.formatForLatex(b, b * b, 4 * a * c, denominator) },
            { latex: '&=\\frac{-@0@ \\pm \\sqrt{@1@}}{@2@}'.formatForLatex(b, underSqrRt, denominator) }
        );

        var isPerfectSquare = this.isPerfectSquare(Math.abs(underSqrRt));

        if (this.isPerfectSquare(Math.abs(underSqrRt))) {
            if (underSqrRt === 0) {
                answerSteps.push(
                    { latex: '&=\\frac{-@0@}{@1@}'.formatForLatex(b, denominator) },

                    // Simplify fraction
                    { latex: '&=@0@'.formatForLatex(this.getFractionLaTeX(-b, denominator)) }
                );
            } else {
                var firstFractionLatex = this.getFractionLaTeX(-b, denominator);

                answerSteps.push({ latex: '&=\\frac{-@0@}{@1@} \\pm \\frac{\\sqrt{@2@}}{@1@}'
                    .formatForLatex(b, denominator, underSqrRt) });

                if (!isReal) {
                    answerSteps.push({latex: '&=\\frac{-@0@}{@1@} \\pm \\frac{\\sqrt{@2@}i}{@1@}'
                        .formatForLatex(b, denominator, -underSqrRt) })
                }

                answerSteps.push(
                    { latex: '&=@0@ \\pm \\frac{@1@@2@}{@3@}'.formatForLatex(
                        firstFractionLatex, squareRoot, isReal ? '' : 'i', denominator) },
                    { latex: '&=@0@ \\pm @1@@2@'.formatForLatex(firstFractionLatex,
                        this.getFractionLaTeX(squareRoot, denominator), isReal ? '' : 'i')  }
                );
            }
        } else {
            var firstFractionLatex = this.getFractionLaTeX(-b, denominator);

            answerSteps.push({ latex: '&=\\frac{-@0@}{@1@} \\pm \\frac{\\sqrt{@2@}}{@1@}'
                .formatForLatex(b, denominator, underSqrRt) });

            if (!isReal) {
                underSqrRt = Math.abs(underSqrRt);
                answerSteps.push({latex: '&=\\frac{-@0@}{@1@} \\pm \\frac{\\sqrt{@2@}i}{@1@}'
                    .formatForLatex(b, denominator, underSqrRt) });
            }

            answerSteps.push(
                { latex: '&=@0@ \\pm \\frac{\\sqrt{@1@}}{@2@}@3@'.formatForLatex(
                    firstFractionLatex,
                    underSqrRt,
                    denominator,
                    isReal ? '' : 'i') }
            );

            // Reduce square root
            var multiplier = null;

            for (var i = (underSqrRt / 2); i > 0; i--) {
                if (underSqrRt % i === 0 && this.isPerfectSquare(i)) {
                    multiplier = Math.sqrt(i);
                    underSqrRt = underSqrRt / i;
                    break;
                }
            }

            if (multiplier > 1) {
                answerSteps.push(
                    { latex: '&=@0@ \\pm \\frac{@1@\\sqrt{@2@}}{@3@}@4@'.formatForLatex(
                        firstFractionLatex,
                        multiplier,
                        underSqrRt,
                        denominator,
                        isReal ? '' : 'i') }
                );

                var secondFrac = this.simplifyFraction(multiplier, denominator);

                answerSteps.push(
                    { latex: '&=@0@ \\pm \\frac{@1@\\sqrt{@2@}}{@3@}@4@'.formatForLatex(
                        firstFractionLatex,
                        secondFrac.numerator !== 1 ? secondFrac.numerator : '',
                        underSqrRt,
                        secondFrac.denominator,
                        isReal ? '' : 'i') }
                );
            }
        }

        return answerSteps;
    },

    // http://stackoverflow.com/questions/2941048/how-to-simplify-fractions-in-c
    simplifyFraction: function(numerator, denominator) {
        if (numerator === 0) {
            numerator = 0;
            denominator = null;
        } else {
            var gcd = QS.gcd(numerator, denominator);
            numerator = numerator / gcd;
            denominator = denominator / gcd;

            if (denominator === 1) {
                denominator = null;
            }
        }

        return { isNegative: (numerator / denominator) < 0, numerator: numerator, denominator: denominator };
    },

    gcd: function (a, b) {
        while (b > 0) {
            var rem = a % b;
            a = b;
            b = rem;
        }

        return a;
    },

    isPerfectSquare: function(x) {
        var closestRoot = Math.floor(Math.sqrt(x));
        return x - (closestRoot * closestRoot) < 0.00001;
    },

    getFractionLaTeX: function(numerator, denominator) {
        // Simplify fraction
        var isNegative = numerator * denominator < 0;
        var frac = this.simplifyFraction(Math.abs(numerator), Math.abs(denominator));

        if (frac.denominator === null) {
            return '{0}{1}'.format(isNegative ? '-': '', frac.numerator);
        } else {
            return '@0@\\frac{@1@}{@2@}'.formatForLatex(isNegative ? '-': '', frac.numerator, frac.denominator);
        }
    },
};
