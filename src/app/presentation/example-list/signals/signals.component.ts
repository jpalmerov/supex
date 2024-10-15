import {Component, Signal, signal} from '@angular/core';
import {Subject, timeInterval} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";
import {AsyncScheduler} from "rxjs/internal/scheduler/AsyncScheduler";

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.css']
})
export class SignalsComponent {
  counterA = signal(0);

  subjectCounterB = new Subject<number>();
  counterB = toSignal(this.subjectCounterB);
  selectedIndex = signal(0);

  constructor() {
    this.subjectCounterB.next(0)
    this.updateCounterB();
  }

  incrementCounterA() {
    this.counterA.update(value => {
      return value + 1;
    });
  }

  updateCounterB() {
    const counterB = this.counterB!;
    setInterval(() => {
      if (counterB !== undefined) {
        // @ts-ignore
        this.subjectCounterB.next(counterB() + 1);
      }
    }, 1000)
  }
}
