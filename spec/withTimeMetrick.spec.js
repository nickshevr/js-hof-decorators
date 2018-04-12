const {withTimeMetrick} = require('src/decorators');
const {factorial} = require('src/funcs');

const cycleFactorial = n => {
    let res = 1;

    for (let i = n; i >= 1; i--) {
        res = res * i;
    }

    return res;
}

describe('withResultLogging HOC testing', () => {
    it('Should return function', () => {
        const dummyFunc = () => {};
        const dymmyType = typeof dummyFunc;
        expect(dymmyType).toBe('function');

        const dummyFuncWithLogging = withTimeMetrick(dummyFunc);
        expect(typeof dummyFuncWithLogging).toBe(dymmyType);
    });

    it('Should log func execution time', () => {
        const factorialWithLoggin = withTimeMetrick(factorial);

        spyOn(console, 'log');
        const result = factorialWithLoggin(4);
        expect(result).toBe(24);
        expect(console.log.calls.argsFor(0)[0]).toMatch(/Function: ([a-z])+ Execution time:  [0-9]+/);
    });
});