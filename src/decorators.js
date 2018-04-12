const withCache = (func, logger = console) => {
    const cache = {};

    return (...args) => {
        const key = JSON.stringify(args);

        if (!cache[key]) {
            logger.log(`Add to cache with key: ${key}`)
            cache[key] = func(...args);
            return cache[key];
        } else {
            logger.log(`Get from cache with key: ${key}`)

            return cache[key];
        }
    }
}

const withResultLogging = (func, logger = console) => {
    return (...args) => {
        const result = func(...args);
        logger.log(`Function: ${func.name || 'anonymous'} Result: ${result || 'void'}`);

        return result;
    }
}

const NS_PER_SEC = 1e9;

const withTimeMetrick = (func, logger = console) => {
    return (...args) => {
        const startTime = process.hrtime();
        const result = func(...args);
        const diff = process.hrtime(startTime);
        logger.log(`Function: ${func.name || 'anonymous'} Execution time:  ${diff[0] * NS_PER_SEC + diff[1]}`);

        return result;
    }
}

module.exports = {
    withCache,
    withResultLogging,
    withTimeMetrick,
}
