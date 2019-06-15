import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
  <div class="container">
  <button class="increase" (click)="increaseCnt()">+</button>
  <div class="counter">{{counter}}</div>
  <button class="decrease" (click)="decreaseCnt()">-</button>
</div>
  `,
  styles: [`
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 130px;
    margin: 20px auto;
    font-size: 24px;
    color: #3f51b5;
  }

  button {
    padding: 5px 10px;
    font-size: 24px;
    border-radius: 5px;
    color: #3f51b5;
    border-color: #3f51b5;
    outline: none;
    cursor: pointer;
  }

  .counter {
    width: 50px;
    text-align: center;
  }
  `]
})
export class CounterComponent {
  counter = 0;

  increaseCnt() {
    this.counter += 1;
    
  }

  decreaseCnt() {
    if (this.counter === 0) return;
    this.counter -= 1;
  }

}
