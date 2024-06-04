import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardImageComponent } from './card-image/card-image.component';
import { FormSubjectComponent } from './form-subject/form-subject.component';
import { FormSignalsComponent } from './form-signals/form-signals.component';
import { CounterSignalsService } from '../../services/counter-signals.service';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-signals-vs-subjects',
  standalone: true,
  imports: [ CommonModule, CardImageComponent, FormSignalsComponent, FormSubjectComponent ],
  providers: [ CounterSignalsService ],
  templateUrl: './signals-vs-subjects.component.html',
  styleUrl: './signals-vs-subjects.component.scss'
})
export class SignalsVsSubjectsComponent {
  subjectVegetaImage = '/assets/images/vegeta.webp';
  signalVegetaImage$ = toObservable(this.counterSignalsService.vegeta);

  constructor(private counterSignalsService: CounterSignalsService) { }

}
