// 최대공약수(GCD)와 최소공배수(LCM) 구하기 (유클리드 호제법)

const GCDnLCM = (n, m) => {
  let answer = [];
  let [a, b, r] = [n, m, m];
  let gcd = 0;
  while (r > 0) {
    r = a % b;
    if (r === 0) gcd = b;
    a = b;
    b = r;
  }
  const lcm = (n * m) / gcd;
  answer = [gcd, lcm];
  return answer;
};

console.log(GCDnLCM(3, 12)); // 3, 12
console.log(GCDnLCM(2, 5)); // 1, 10
