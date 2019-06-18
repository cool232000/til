import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-input',
  template: `
    <input type="text" placeholder="할 일을 입력하세요" (keyup.enter)="addTodo(input)" #input>
  `,
  styles: []
})
export class TodoInputComponent {
  
  @Output() add = new EventEmitter();

  addTodo(input: HTMLInputElement) {
    this.add.emit(input.value);
    input.value = '';
  }

}
