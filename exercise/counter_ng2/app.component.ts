import { Component } from '@angular/core';
import { CounterComponent } from './counter.component';

@Component({
  selector: 'app-root',
  template: `
  <app-counter></app-counter>
  `,
  styles: []
})
export class AppComponent {
  title = 'counter2';
}
