import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterSignalsService } from '../../../services/counter-signals.service';

@Component({
  selector: 'app-form-signals',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './form-signals.component.html',
  styleUrl: './form-signals.component.scss'
})
export class FormSignalsComponent {
  over9000 = this.counterSignalsService.over9000;
  showOver9000 = false;

  constructor(protected counterSignalsService: CounterSignalsService) {
    effect(() => {
      console.log(
        `%c SIGNAL:  over9000: ${this.over9000()} `,
        'background: #222; color: #bada55'
      );
      this.showOver9000 = this.over9000();
    });
  }

}
