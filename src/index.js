function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let newExpr = expr.replace(/\*/g, ' * ');
    newExpr = newExpr.replace(/\//g, ' / ');
    newExpr = newExpr.replace(/\-/g, ' - ');
    newExpr = newExpr.replace(/\+/g, ' + ');
    newExpr = newExpr.replace(/\(/g, ' ( ');
    newExpr = newExpr.replace(/\)/g, ' ) ');
    //убираем лишние пробелы
    newExpr =newExpr.replace(/\s +/g, ' ');
    newExpr = newExpr.trim().split(' ');
    checkBrackets(newExpr);

    const OPERATORS = ['+', "-", "*", "/", '('];

    const OPERATORS__PRIORITY = {
        '+': 1,
        "-": 1,
        '*': 2,
        '/': 2,
        '(': 0
    }
    let stack = [];
    let outputString = [];
   
    function checkBrackets(expr) {
        const leftBracket = expr.filter(el => el == '(').length
        const rightBracket = expr.filter(el => el == ')').length
      
        if (leftBracket != rightBracket) {
          throw new Error ('ExpressionError: Brackets must be paired')
        }
      }


    function variables(){
        let last = outputString.pop();
        let penultimate = outputString.pop();
        let symbol = stack.pop();
        //вычислили
        let mathOperation = operation(symbol, last, penultimate);
        //добавили результат
        
        outputString.push(+mathOperation);
    }

    function operation(symbol, a, b){
        if ( b / a == Infinity) {
            throw new Error("TypeError: Division by zero.");
        }
       return symbol == '-' ? b - a : symbol == '+' ? b + a : symbol == '/' ? b / a : b * a;
    }
    //итоговый результат
    function calculateResult(){
        while (stack.length){
            variables();
        }
    }

    newExpr.map( item => {
        //проверяем знаки
        if (OPERATORS.includes(item)) {
            //проверка на пустоту
            if (!stack.length) {
                stack.push(item);
                //проверка на приоритет
            } else if(item == '('){
                stack.push(item);
            } else if( OPERATORS__PRIORITY[stack[stack.length - 1]] < OPERATORS__PRIORITY[item]) {
                stack.push(item);
            } //если приоритет ниже берем два последних элемента из выходной строки и вычисляем
            else {
               variables();
                // одинаковые знаки операцйии не должны стоять рядом
                stack.push(item);
            }
            
        } else if (item == ')') {
            //вычисляем пока не дойдем до ближайшей скобки
            while(stack[stack.length - 1] !== '('){
                variables()
            }
            stack.pop();
        } else {
            outputString.push(+item);

        }
    });

    calculateResult();

    //console.log(stack);
    //console.log(outputString);
    return +outputString[0];  
}

//console.log(expressionCalculator(" 20 - 57 * 12 - (  58 + 84 * 32 / 27  ) "));

 module.exports = {
    expressionCalculator,
 }