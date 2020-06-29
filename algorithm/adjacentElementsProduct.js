const adjacentElementsProduct = arr => {
  const multiple = [];
  for (let i = 0; i < arr.length - 1; i++) multiple.push(arr[i] * arr[i + 1]);
  return Math.max(...multiple);
};

console.log(adjacentElementsProduct([3, 6, -2, -5, 7, 3])); // 21
