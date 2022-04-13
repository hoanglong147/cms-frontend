import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'spending-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit, OnDestroy {
  @Input() endDate: Date = new Date();
  _second = 1000;
  _minute = this._second * 60;
  _hour = this._minute * 60;
  _day = this._hour * 24;
  displayTime: { value: number, label: string }[] = [];
  timer: any;
  constructor() { }

  ngOnInit(): void {
    this.showRemaining();
    this.timer = setInterval(() => this.showRemaining(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  showRemaining() {
    const now = new Date();
    const distance = this.endDate.getTime() - now.getTime();
    if (distance < 0) {
      clearInterval(this.timer);
      this.displayTime = [];
      return;
    }
    const days = Math.floor(distance / this._day);
    const hours = Math.floor((distance % this._day) / this._hour);
    const minutes = Math.floor((distance % this._hour) / this._minute);
    const seconds = Math.floor((distance % this._minute) / this._second);
    this.displayTime = [{ value: days, label: 'Days' }, { value: hours, label: 'hours' }, { value: minutes, label: 'minutes' }, { value: seconds, label: 'seconds' }];
  }
}
