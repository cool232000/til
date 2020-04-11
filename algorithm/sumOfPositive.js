https://www.codewars.com/kata/5715eaedb436cf5606000381

function positiveSum(arr) {
  let sum = 0;
  arr = arr.filter(arr => arr >= 0);
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

console.log(positiveSum([1,-4,7,12])) // 20
