const memo = {};

module.exports = async function (context, req) {
    context.log('Función Fibonacci con Memoization ejecutada.');

    let nth = req.body.nth;
    
    if (nth === undefined || nth < 0) {
        context.res = {
            status: 400,
            body: "Por favor envía un número válido en el body (ej. { 'nth': 30 })"
        };
        return;
    }

    const fib = (n) => {
        if (n === 0) return 0;
        if (n === 1) return 1;
        
        if (memo[n] !== undefined) {
            return memo[n];
        }
        
        const result = fib(n - 1) + fib(n - 2);
        memo[n] = result;
        return result;
    };

    try {
        const startTime = Date.now();
        const result = fib(nth);
        const endTime = Date.now();

        context.res = {
            status: 200,
            body: {
                nth: nth,
                result: result,
                timeMs: endTime - startTime,
                memoSize: Object.keys(memo).length
            }
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: "Error calculando Fibonacci: " + error.message
        };
    }
};