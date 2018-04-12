const {withResultLogging} = require('src/decorators');
const {factorial} = require('src/funcs');

describe('withResultLogging HOC testing', () => {
    it('Should return function', () => {
        const dummyFunc = () => {};
        const dymmyType = typeof dummyFunc;
        expect(dymmyType).toBe('function');

        const dummyFuncWithLogging = withResultLogging(dummyFunc);
        expect(typeof dummyFuncWithLogging).toBe(dymmyType);
    });

    it('Should log func result', () => {
        const factorialWithLoggin = withResultLogging(factorial);

        spyOn(console, 'log');
        const result = factorialWithLoggin(4)
        expect(result).toBe(24);
        expect(console.log).toHaveBeenCalledWith(`Function: ${factorial.name} Result: ${result}`);
    });

    it('Should log void for func that returns nothing', () => {
        const dummyFunc = () => {};
        const dummyFuncWithLogging = withResultLogging(dummyFunc);

        spyOn(console, 'log');
        const result = dummyFuncWithLogging(4)
        expect(result).toBe(undefined);
        expect(console.log).toHaveBeenCalledWith(`Function: ${dummyFunc.name} Result: void`);
    });
});