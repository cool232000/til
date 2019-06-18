import { Component } from '@angular/core';

@Component({
  selector: 'app-analog-clock',
  template: `
    <div class="clock">
      <div class="analog-clock">
        <div class="hour hand" [style.transform]="this.hour"></div>
        <div class="minute hand" [style.transform]="this.min"></div>
        <div class="second hand" [style.transform]="this.sec"></div>
        <div class="center-circle"></div>
      </div>
      <div class="digital-clock">{{zero(digHour)}}:{{zero(digMin)}}:{{zero(digSec)}}</div>
    </div>
  `,
  styles: [`
  .analog-clock {
    position: relative;
    margin: 100px auto 0;
    width: 200px;
    height: 200px;
    background-color: aliceblue;
    border-radius: 50%;
  }

  .hand {
    position: absolute;
    left: 50%;
    width: 1px;
    height: 100px;
    /* 자바스크립트에 의해 덮어써진다. */
    /* transform: translate3d(-50%, 0, 0); */
    transform-origin: 100% 100%;
  }

  .hour {
    background-color: #f44336;
  }

  .minute {
    background-color: #3f51b5;
  }

  .second {
    background-color: #9e9e9e;
  }

  .center-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 12px;
    height: 12px;
    background-color: black;
    border-radius: 50%;
  }

  .digital-clock {
    position: absolute;
    top: 350px;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    font-size: 2em;
    font-family: 'Source Code Pro', monospace;
  }
  `]
})
export class AnalogClockComponent {
  
  clock = new Date();

  digHour = this.clock.getHours();
  digMin = this.clock.getMinutes();
  digSec = this.clock.getSeconds();

  hour: any;
  min: any;
  sec: any;

  zero(num: number) {
    if (num < 10) {
      return `0` + num;
    }
    return num;
  }

  constructor() {

    setInterval(() => {
      this.digSec += 1;
  
      if (this.digSec === 60) {
        this.digMin += 1;
        this.digSec = 0;
      }
  
      if (this.digMin === 60) {
        this.digHour += 1;
        this.digMin = 0;
      }
  
      if (this.digHour === 24) {
        this.digHour = 0;
      }
      
      this.hour = `rotate(${(this.digHour*30)+(this.digMin*0.5)}deg)`      
      this.min = `rotate(${this.digMin*6}deg)`
      this.sec = `rotate(${this.digSec*6}deg)`

    }, 1000)

  }
}
