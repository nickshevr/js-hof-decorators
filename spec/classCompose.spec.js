const {DummyFunction, WithCache, WithResultLogging} = require('src/classes');
const {factorial} = require('src/funcs');

const classCompose = (classes) => (...args) => {
    const [head, ...tail] = classes;
    
    if (!head) {
        return args[0];
    }

    return classCompose(tail)(new head(...args));
};

const DECORATORS = [WithCache, WithResultLogging];
const FactorialFunc = new DummyFunction(factorial);

describe('Class compose testing', () => {
    let DecoratedFactorial = null;

    beforeEach(() => {
        DecoratedFactorial = classCompose(DECORATORS)(FactorialFunc);
    })

    it('Should log func execution time, add to cache, log result', () => {
        spyOn(console, 'log');
        const result = DecoratedFactorial.execute(4);
        expect(result).toBe(24);

        expect(console.log).toHaveBeenCalledWith('Add to cache with key: [4]');
        expect(console.log).toHaveBeenCalledWith(`Result: ${result}`);
    });

    it('Should log func execution time, get from cache, log result', () => {
        const spy = spyOn(console, 'log');
        let result = DecoratedFactorial.execute(4);
        expect(result).toBe(24);
        spy.calls.reset();

        result = DecoratedFactorial.execute(4);
        expect(result).toBe(24);
        expect(console.log).toHaveBeenCalledWith('Get from cache with key: [4]');
        expect(console.log).toHaveBeenCalledWith(`Result: ${result}`);
    });
});