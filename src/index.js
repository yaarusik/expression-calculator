function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    //приводим в нужный вид строку
    let newExpr = expr.replace(/\*/g, ' * ')
    .replace(/\//g, ' / ')
    .replace(/\-/g, ' - ')
    .replace(/\+/g, ' + ')
    .replace(/\(/g, ' ( ')
    .replace(/\)/g, ' ) ');
    //убираем лишние пробелы
    newExpr =newExpr.replace(/\s +/g, ' ');
    newExpr = newExpr.trim().split(' ');
    //проверяем скобки
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
        let leftBrackets = expr.filter(el => el == '(').length;
        let rightBrackets = expr.filter(el => el == ')').length;
      
        if (leftBrackets != rightBrackets) {
          throw new Error ('ExpressionError: Brackets must be paired')
        }
      }


    function mathOperation(){
        let last = outputString.pop();
        let penultimate = outputString.pop();
        let symbol = stack.pop();
        //вычислили
        let mathOperation = operation(symbol, last, penultimate);
        //добавили результат
        outputString.push(+mathOperation);
    }

    function operation(symbol, a, b){     
        if ( symbol == '/' && (b / a == Infinity) ) {
            throw new Error("TypeError: Division by zero.");
        }
       return symbol == '-' ? b - a : symbol == '+' ? b + a : symbol == '/' ? b / a : b * a;
    }
    //итоговый результат
    function toCalculate(){
        while (stack.length){
            mathOperation();
        }
    }

    newExpr.map( item => {
        //проверяем знаки
        if (OPERATORS.includes(item)) {
            //проверка на пустоту
            if (!stack.length) {
                stack.push(item);
                
            } else if(item == '('){
                stack.push(item);
            } //проверка на приоритет 
            else if( !(OPERATORS__PRIORITY[stack[stack.length - 1]] < OPERATORS__PRIORITY[item])) {
                // одинаковые знаки операцйии не должны стоять рядом
                while(stack.length && !(OPERATORS__PRIORITY[stack[stack.length - 1]] < OPERATORS__PRIORITY[item]) ){
                    mathOperation();
                }
                stack.push(item);                
            } //если приоритет ниже берем два последних элемента из выходной строки и вычисляем
            else {
                stack.push(item);
            }          
        } else if (item == ')') {
            //вычисляем пока не дойдем до ближайшей скобки
            while(stack[stack.length - 1] !== '('){
                mathOperation()
            }
            stack.pop();
        } else {
            outputString.push(+item);
        }
    });

    toCalculate();

    return +outputString[0];  
}

 module.exports = {
    expressionCalculator,
 }