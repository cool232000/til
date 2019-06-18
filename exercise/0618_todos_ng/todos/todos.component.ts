import { Component } from '@angular/core';
import { Todo } from "../todo-interface";

@Component({
  selector: 'app-todos',
  template: `
    <app-todo-input (add)="addTodo($event)"></app-todo-input>
    <app-todo-list [todos]="todos" (complete)="completeTodo($event)" (remove)="removeTodo($event)"></app-todo-list>
    <!--<pre>{{ todos | json }}</pre>-->
  `,
  styles: []
})
export class TodosComponent {
  
  todos: Todo[] = [
    { id: 1, content: "HTML", completed: true },
    { id: 2, content: "CSS", completed: false },
    { id: 3, content: "Javascript", completed: true }
  ];

  generateId() {
    return this.todos.length ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1;
  }

  addTodo(content: string) {
    if (content === '' ) return;
    this.todos = [{ id: this.generateId(), content, completed: false }, ...this.todos ]
  }

  completeTodo(id: number) {
    this.todos = this.todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo )    
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }

}
