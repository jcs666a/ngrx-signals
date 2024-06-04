import { Component, EventEmitter, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { CounterSubjectService } from '../../../services/counter-subject.service';

@Component({
  selector: 'app-form-subject',
  standalone: true,
  imports: [ CommonModule ],
  providers: [CounterSubjectService],
  templateUrl: './form-subject.component.html',
  styleUrl: './form-subject.component.scss'
})
export class FormSubjectComponent {
  @Output() vegetaImage = new EventEmitter<string>();
  showOver9000 = false;

  constructor(protected counterSubjectService: CounterSubjectService) {

    this.counterSubjectService.vegeta.pipe(
      takeUntilDestroyed(),
      tap((vegetaImage) => this.vegetaImage.emit(vegetaImage))
    ).subscribe();

    this.counterSubjectService.over9000.pipe(
      takeUntilDestroyed(),
      tap((over9000) => {
        console.log(
          `%c SUBJECT: over9000: ${over9000} `,
          'background: #bada55; color: #111'
        );
        this.showOver9000 = over9000;
      })
    ).subscribe();
  }

}
