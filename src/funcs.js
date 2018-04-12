const factorial = (n, accum = 1) => n === 1 ? accum : factorial(n - 1, accum * n);

module.exports = {
    factorial,
}