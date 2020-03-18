// https://www.codewars.com/kata/539a0e4d85e3425cb0000a88/train/javascript

function add(n) {
  const sum = function (args) {
    return add(n + args);
  };
  sum.valueOf = function () {
    return n;
  };
  return sum;
}

add(1); // 1
add(1)(2); // 3
add(1)(2)(3); // 6
