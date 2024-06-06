import { Component, effect, inject } from '@angular/core';
import { PokemonsStore } from '../../../store/captured-pokemons.store';
import { BehaviorSubject } from 'rxjs';
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
  private page$ = new BehaviorSubject({
    count: this.pokemonsStore.totalCaptured(),
    next: null,
    previous: null,
    results: this.getResutsPage(this.pokemonsStore.sortedByName())
  });

  pokemonPage$ = this.page$.asObservable();

  constructor(private router: Router) {
    effect(() => {
      this.updatePage(this.pokemonsStore.sortedByName());
    })
  }

  updatePage(captured: Pokemon[]) {
    this.page$.next({
      ...this.page$.getValue(),
      count: captured.length,
      results: this.getResutsPage(captured)
    });
  }

  getResutsPage(captured: Pokemon[]) {
    return captured.map((pokemon) => ({
      name: pokemon.name,
      url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`,
      image: pokemon.sprites.other['official-artwork'].front_default,
      audio: pokemon.cries.latest,
      fullData: pokemon
    }));
  }

  openPage(url: string): void {
    console.log('openPage', url);
  }

  openDetails(name: string): void {
    this.router.navigateByUrl(`/signal-store/details/${name}`);
  }

  searchPokemon(name: string): void {
    this.updatePage(this.pokemonsStore.sortedByName()
      .filter((pokemon) => pokemon.name === name || !name));
  }

}
