import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-increase',
  template: `
    <button class="increase" (click)="increaseCnt.emit()">+</button>
  `,
  styles: [`
  button {
    padding: 5px 10px;
    font-size: 24px;
    border-radius: 5px;
    color: #3f51b5;
    border-color: #3f51b5;
    outline: none;
    cursor: pointer;
  }
  `]
})
export class IncreaseComponent {

  @Output() increaseCnt = new EventEmitter();
}
