import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-and-action-buttons',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './search-and-action-buttons.component.html',
  styleUrl: './search-and-action-buttons.component.scss'
})
export class SearchAndActionButtonsComponent {
  @Input() hideNavButtons?: boolean;
  @Input() nextPage!: string | null;
  @Input() prevPage!: string | null;
  @Input() isLoading!: boolean | undefined;
  @Output() openPage = new EventEmitter<string>();
  @Output() searchPokemon = new EventEmitter<string>();
  searchString = '';
}
