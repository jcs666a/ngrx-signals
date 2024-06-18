import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterSubjectService {
  private count$ = new BehaviorSubject(1000);
  over9000$ = this.count$.pipe(map((count) => count > 9000));

  get count() {
    return this.count$.asObservable();
  }

  get vegeta() {
    return this.over9000$.pipe(
      takeUntilDestroyed(),
      map((over9000) => over9000
        ? '/assets/images/its-over9000.gif'
        : '/assets/images/vegeta.webp'
      )
    );
  }

  increment() {
    this.count$.next(this.count$.value + 100);
  }

  decrease() {
    this.count$.next(this.count$.value - 100);
  }

  double() {
    this.count$.next(this.count$.value * 2);
  }

  triple() {
    this.count$.next(this.count$.value * 3);
  }

  reset() {
    this.count$.next(1000);
  }

}
