import { Component } from '@angular/core';

@Component({
  selector: 'app-stop-watch',
  template: `
  <div class="stop-watch">
    <div class="display">{{zero(min)}}:{{zero(sec)}}:{{zero(msec)}}</div>
    <button class="control" (click)="stopWatch()">Start</button>
  </div>
  `,
  styles: [`
  .stop-watch {
    font-family: 'Source Code Pro', monospace;
    text-align: center;
    font-size: 3em;
    padding: 30px;
  }

  .control {
    width: 300px;
    padding: 5px;
    margin-top: 15px;
    font-size: 36px;
    font-weight: bold;
    border: 2px solid #f44336;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
  }

  .control:hover {
    background: #f44336;
    color: aliceblue;
  }
  `]
})
export class StopWatchComponent {

  timer = false;
  interval: any;
  min = 0;
  sec = 0;
  msec = 0;

  zero(num: number) {
    if (num < 10) {
      return `0` + num
    }
    return num;
  }

  stopWatch() {
    if (this.timer === false) {
      this.start()
    } else {
      this.stop()
    }
  }

  start() {
    this.timer = true;

    this.interval = setInterval(() => {
      this.msec += 1;
      
      if (this.msec === 100) {
        this.sec += 1;
        this.msec = 0;
      }      
  
      if (this.sec === 60) {
        this.min += 1;
        this.sec = 0;
      }
    }, 10)
  }

  stop() {
    this.timer = false;
    clearInterval(this.interval)
  }

}
