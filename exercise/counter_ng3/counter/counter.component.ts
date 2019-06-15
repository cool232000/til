import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
  <div class="container">
  <app-increase (increaseCnt)="increaseCnt()"></app-increase>
  <div class="counter">{{counter}}</div>
  <app-decrease (decreaseCnt)="decreaseCnt()"></app-decrease>
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
