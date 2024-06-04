import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterSignalsService {
  count = signal(1000);
  over9000 = computed(() => this.count() > 9000);
  vegeta = computed(() => this.over9000()
    ? '/assets/images/its-over9000.gif'
    : '/assets/images/vegeta.webp');

  increment() {
    this.count.update((count) => count + 100);
  }

  decrease() {
    this.count.update((count) => count - 100);
  }

  double() {
    this.count.update((count) => count * 2);
  }

  triple() {
    this.count.update((count) => count * 3);
  }

  reset() {
    this.count.set(1000);
  }
}
