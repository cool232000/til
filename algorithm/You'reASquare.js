// https://www.codewars.com/kata/54c27a33fb7da0db0100040e

const isSquare = n => (n < 0 ? false : Math.sqrt(n) % 1 ? false : true);

console.log(isSquare(-1)); // fasle
console.log(isSquare(0)); // true
console.log(isSquare(3)); // false
console.log(isSquare(4)); // true
console.log(isSquare(25)); // true
console.log(isSquare(26)); // false
