import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokemonsStore } from '../../../../store/captured-pokemons.store';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  readonly pokemonsStore = inject(PokemonsStore);

  @Input() title!: string;
}
