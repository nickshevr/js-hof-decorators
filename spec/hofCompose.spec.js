const {withCache, withTimeMetrick, withResultLogging} = require('src/decorators');
const {factorial} = require('src/funcs');

const compose = (funcs) => (...args) => {
    const [head, ...tail] = funcs;

    if (!head) {
        return args[0];
    }

    return compose(tail)(head(...args));
};

const DECORATORS = [withCache, withTimeMetrick, withResultLogging];
const EXECUTION_REGEX = /Function: ([a-z])+ Execution time:  [0-9]+/

describe('HOC compose testing', () => {
    let decoratedFactorial = null;

    beforeEach(() => {
        decoratedFactorial = compose(DECORATORS)(factorial);
    })

    it('Should log func execution time, add to cache, log result', () => {
        spyOn(console, 'log');
        const result = decoratedFactorial(4);
        expect(result).toBe(24);

        expect(console.log).toHaveBeenCalledWith('Add to cache with key: [4]');
        expect(console.log).toHaveBeenCalledWith(jasmine.stringMatching(EXECUTION_REGEX));
        //Имя функции теряется при композиции, т.к. возвращается анонимная функция
        expect(console.log).toHaveBeenCalledWith(`Function: anonymous Result: ${result}`);
    });

    it('Should log func execution time, get from cache, log result', () => {
        const spy = spyOn(console, 'log');
        let result = decoratedFactorial(4);
        expect(result).toBe(24);
        spy.calls.reset();

        result = decoratedFactorial(4);
        expect(result).toBe(24);
        expect(console.log).toHaveBeenCalledWith('Get from cache with key: [4]');
        expect(console.log).toHaveBeenCalledWith(jasmine.stringMatching(EXECUTION_REGEX));
        //Имя функции теряется при композиции, т.к. возвращается анонимная функция
        expect(console.log).toHaveBeenCalledWith(`Function: anonymous Result: ${result}`);
    });
});