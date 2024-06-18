import { Component, effect, inject } from '@angular/core';
import { PokemonsStore } from '../../../store/captured-pokemons.store';
import { Router } from '@angular/router';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { Pokemon } from '../../../models/pokemon';

@Component({
  selector: 'app-captured-page',
  standalone: true,
  imports: [ PokemonListComponent ],
  templateUrl: './captured-page.component.html',
  styleUrl: './captured-page.component.scss'
})
export class CapturedPageComponent {
  readonly pokemonsStore = inject(PokemonsStore);
  pokemonPage = { ...this.pokemonsStore.capturedPage() };

  constructor(private router: Router) {
    effect(() => {
      this.pokemonPage = { ...this.pokemonsStore.capturedPage() };
    })
  }

  openDetails(name: string): void {
    this.router.navigateByUrl(`/signal-store/details/${name}`);
  }

  searchPokemon(name: string): void {
    this.pokemonPage.results = this.pokemonsStore.capturedPage().results
      .filter((pokemon: Pokemon) => pokemon.name === name || !name);
  }

}
