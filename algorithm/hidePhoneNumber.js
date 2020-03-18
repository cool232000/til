// https://programmers.co.kr/learn/courses/30/lessons/12948

function solution(phone_number) {
    let answer = '';
    let star = '';
    answer = phone_number.substring(phone_number.length - 4);
    for (let i = 0; i < phone_number.length - 4; i++) star += '*';
    return star + answer;
  }
  
  solution('01033334444'); // *******4444
  solution('027778888'); // *****8888
  