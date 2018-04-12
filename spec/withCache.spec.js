const {withCache} = require('src/decorators');
const {factorial} = require('src/funcs');

describe('withCache HOC testing', () => {
    it('Should return function', () => {
        const dummyFunc = () => {};
        const dymmyType = typeof dummyFunc;
        expect(dymmyType).toBe('function');

        const dummyFuncWithCache = withCache(dummyFunc);
        expect(typeof dummyFuncWithCache).toBe(dymmyType);
    });

    it('Should add to cache first run', () => {
        const factorialWithCache = withCache(factorial);

        spyOn(console, 'log');
        expect(factorialWithCache(4)).toBe(24);
        expect(console.log).toHaveBeenCalledWith('Add to cache with key: [4]');
    })

    it('Should get to cache second run', () => {
        const factorialWithCache = withCache(factorial);
        spyOn(console, 'log');
        expect(factorialWithCache(4)).toBe(24);
        expect(console.log).toHaveBeenCalledWith('Add to cache with key: [4]');

        expect(factorialWithCache(4)).toBe(24);
        expect(console.log).toHaveBeenCalledWith('Get from cache with key: [4]');
    })
});