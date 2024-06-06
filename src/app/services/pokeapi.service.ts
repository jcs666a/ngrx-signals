import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, combineLatest, map, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PokemonPage } from '../models/pokemonPage';
import { Pokemon, defaultPokemon } from '../models/pokemon';
import { Ability } from '../models/ability';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private defaultPage: PokemonPage = {
    count: 0,
    next: null,
    previous: null,
    results: [],
    isLoading: false
  };
  private defaultPokemon = JSON.parse(JSON.stringify(defaultPokemon));

  private pokemonsPage$ = new BehaviorSubject<PokemonPage>({
    ...this.defaultPage, isLoading: true
  });

  constructor(private http: HttpClient) { }

  get pokemonPage() {
    return this.pokemonsPage$.asObservable();
  }

  getPage(url?: string): Observable<PokemonPage> {
    return this.http.get<PokemonPage>(
      url || 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'
    );
  }

  getPageWithImage(url?: string): Observable<PokemonPage> {
    this.pokemonsPage$.next({ ...this.pokemonsPage$.getValue(), isLoading: true });
    return this.getPage(url).pipe(
      switchMap((pokemonPage) => {
        const detailServices = pokemonPage.results.map((pokemon) =>
          this.http.get<Pokemon>(pokemon.url)
        );
        return combineLatest(detailServices).pipe(
          switchMap((pokemonDetails) => {
            pokemonPage.results.forEach((pokemon, i) => {
              pokemon.image = pokemonDetails[i].sprites.other['official-artwork'].front_default;
              pokemon.audio = pokemonDetails[i].cries.latest;
              pokemon.fullData = pokemonDetails[i];
            });
            return of(pokemonPage);
          }),
          tap((pokemonPage) =>
            this.pokemonsPage$.next({ ...pokemonPage, isLoading: false })
          )
        );
      }),
      catchError(() => {
        this.pokemonsPage$.next({ ...this.defaultPage, isLoading: false });
        return of(this.defaultPage)
      })
    );
  }

  getPokemonInfo(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .pipe(catchError(() => of({...this.defaultPokemon, error: true})));
  }

  getAbility(url: string): Observable<Ability> {
    return this.http.get<Ability>(url);
  }

  searchPokemon(name: string): Observable<PokemonPage> {
    this.pokemonsPage$.next({ ...this.pokemonsPage$.getValue(), isLoading: true });
    return name
      ? this.getPokemonInfo(name).pipe(
        map((pokemon) => ({
          count: pokemon.error ? 0 : 1,
          next: null,
          previous: null,
          results: [{
            name: pokemon.name,
            url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`,
            image: pokemon.sprites.other['official-artwork'].front_default,
            audio: pokemon.cries.latest,
            fullData: pokemon,
          }]
        })),
        tap((pokemonPage) =>
          this.pokemonsPage$.next({ ...pokemonPage, isLoading: false })
        ),
        catchError(() => {
          this.pokemonsPage$.next({ ...this.defaultPage, isLoading: false });
          return of(this.defaultPage)
        })
      )
    : this.getPageWithImage();
  }

}
