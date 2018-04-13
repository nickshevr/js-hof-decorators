class DummyFunction {
    constructor(func) {
        this.func = func;
    }

    execute(...args) {
        return this.func(...args);
    }
}

class WithCache {
    constructor(funcInstance, logger = console) {
        if (typeof funcInstance.execute === 'function') {
            this._func = funcInstance;
        } else {
            throw new Error();
        }

        this.cache = {};
        this.logger = logger;
    }

    execute(...args) {
        const key = JSON.stringify(args);
        const {logger, cache} = this;

        if (!cache[key]) {
            logger.log(`Add to cache with key: ${key}`)
            cache[key] = this._func.execute(...args);
            return cache[key];
        } else {
            logger.log(`Get from cache with key: ${key}`)

            return cache[key];
        }
    }
}

class WithResultLogging {
    constructor(funcInstance, logger = console) {
        if (typeof funcInstance.execute === 'function') {
            this._func = funcInstance;
        } else {
            throw new Error();
        }

        this.logger = logger;
    }

    execute(...args) {
        const {logger} = this;
        const result = this._func.execute(...args);
        logger.log(`Result: ${result || 'void'}`);

        return result;
    }
}

module.exports = {
    DummyFunction,
    WithCache,
    WithResultLogging,
};
