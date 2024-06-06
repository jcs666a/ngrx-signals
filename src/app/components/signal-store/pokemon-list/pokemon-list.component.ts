import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Pokemon } from '../../../models/pokemon';
import { SearchAndActionButtonsComponent } from './search-and-action-buttons/search-and-action-buttons.component';
import { NavComponent } from './nav/nav.component';
import { PokemonPage } from '../../../models/pokemonPage';
import { PokemonsStore } from '../../../store/captured-pokemons.store';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [ CommonModule, SearchAndActionButtonsComponent, NavComponent ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent {
  readonly pokemonsStore = inject(PokemonsStore);

  @Input() title!: string;
  @Input() hideNavButtons?: boolean;
  @Input() pokemonPage$!: Observable<PokemonPage>;
  @Output() openPage = new EventEmitter<string>();
  @Output() searchPokemon = new EventEmitter<string>();
  @Output() openDetails = new EventEmitter<string>();

  capture(pokemon: Pokemon | undefined): void {
    if (pokemon) {
      this.pokemonsStore.capturePokemon(pokemon);
    }
  }

  remove(pokemon: Pokemon | undefined): void {
    if (pokemon) {
      this.pokemonsStore.remove(pokemon);
    }
  }
}
