import { Component, Input, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { NavComponent } from '../pokemon-list/nav/nav.component';
import { PokeapiService } from '../../../services/pokeapi.service';
import { Pokemon } from '../../../models/pokemon';
import { PokemonsStore } from '../../../store/captured-pokemons.store';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [ CommonModule, NavComponent ],
  providers: [ PokeapiService ],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss'
})
export class PokemonDetailsComponent {
  readonly pokemonsStore = inject(PokemonsStore);

  @Input() pokemon!: string;
  pokemon$!: Observable<Pokemon>;
  private _abilitiesEffects$!: BehaviorSubject<string[]>;
  abilitiesEffects$?: Observable<string[]>;

  constructor(private pokeapiService: PokeapiService) {
    effect(() => {
      this.pokemonsStore.capturedKeys();
      this.setAbilitiesEffects();
    })
  }

  ngOnInit(): void {
    if (this.pokemonsStore.capturedKeys().includes(this.pokemon)) {
      this.pokemon$ = of(this.pokemonsStore.captured()
        .filter((pokemon) => pokemon.name === this.pokemon)[0]
      );
    } else {
      this.pokemon$ = this.pokeapiService.getPokemonInfo(this.pokemon);
    }
    this.setAbilitiesEffects();
  }

  setAbilitiesEffects(): void {
    if (this._abilitiesEffects$) {
      this._abilitiesEffects$.next(this.getStoredAbilities());
    } else {
      this._abilitiesEffects$ = new BehaviorSubject(this.getStoredAbilities());
      this.abilitiesEffects$ = this._abilitiesEffects$.asObservable();
    }
  }

  getStoredAbilities(): string[] {
    return this.pokemonsStore.capturedKeys().includes(this.pokemon)
      ? this.pokemonsStore.abilities()
        .filter((ability) =>
          ability.pokemon
            .some((pokemon) => pokemon.pokemon.name === this.pokemon))
        .map((ability) => ability.effect_entries)
        .flat()
        .map((effect) => effect.short_effect)
      : [];
  }

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
