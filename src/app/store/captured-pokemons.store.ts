import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tapResponse } from '@ngrx/operators';
import { combineLatest, of, pipe, switchMap, tap } from "rxjs";
import { Pokemon } from "../models/pokemon";
import { Ability } from "../models/ability";
import { PokeapiService } from "../services/pokeapi.service";
import { withLogger } from "./captured-pokemons.logger";

export interface CapturedPokemonsState {
    captured: Pokemon[],
    capturedKeys: string[];
    abilities: Ability[];
    abilitiesKeys: string[];
    error: any,
    state: 'Loading' | 'Loaded' | 'Error'
};

const localCaptured = (): Pokemon[] | null => {
    const captured = localStorage.getItem('rs_captured');
    let parsed = null;
    try { if (captured) { parsed = JSON.parse(captured); } }
    catch (error) { return null; }
    return parsed;
};

const localCapturedKeys = (): string[] | null => {
    const captured = localStorage.getItem('rs_captured_keys');
    let parsed = null;
    try { if (captured) { parsed = JSON.parse(captured); } }
    catch (error) { return null; }
    return parsed;
};

const localAbilities = (): Ability[] | null => {
    const abilities = localStorage.getItem('rs_abilities');
    let parsed = null;
    try { if (abilities) { parsed = JSON.parse(abilities); } }
    catch (error) { return null; }
    return parsed;
};

const localAbilitiesKeys = (): string[] | null => {
    const abilities = localStorage.getItem('rs_abilities_keys');
    let parsed = null;
    try { if (abilities) { parsed = JSON.parse(abilities); } }
    catch (error) { return null; }
    return parsed;
};

const InitialState: CapturedPokemonsState = {
    captured: localCaptured() || [],
    capturedKeys: localCapturedKeys() || [],
    abilities: localAbilities() || [],
    abilitiesKeys: localAbilitiesKeys() || [],
    error: {},
    state: 'Loaded'
};

export const PokemonsStore = signalStore(
    { providedIn: 'root' },
    withState(InitialState),
    withComputed(({ captured, abilities }) => ({
        totalCaptured: computed(() => captured().length),
        totalAbilities: computed(() => abilities().length),
        capturedPage: computed(() => {
            const sortedPokemons = JSON.parse(JSON.stringify(captured()))
                .sort((a: Pokemon, b: Pokemon) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            return {
                count: sortedPokemons.length,
                next: null,
                previous: null,
                results: sortedPokemons.map((pokemon: Pokemon) => ({
                    name: pokemon.name,
                    url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`,
                    image: pokemon.sprites.other['official-artwork'].front_default,
                    audio: pokemon.cries.latest,
                    fullData: pokemon
                }))
            };
        })
    })),
    withMethods((
        store,
        pokeapiService = inject(PokeapiService)
    ) => ({

        capturePokemon: rxMethod<Pokemon>(
            pipe(
                tap(() => patchState(store, { error: {}, state: 'Loading' })),
                switchMap((pokemon: Pokemon) => {
                    if (store.capturedKeys().includes(pokemon.name)) {
                        return of({});
                    }

                    const abilities$ = pokemon.abilities
                        .filter((ability) => !store.abilitiesKeys().includes(ability.ability.name))
                        .map((ability) => pokeapiService.getAbility(ability.ability.url));

                    return abilities$.length
                        ? combineLatest(abilities$).pipe(
                            tapResponse({
                                next: (abilities) => {
                                    abilities.forEach(ability =>
                                        ability.effect_entries = ability.effect_entries.filter((effect) => effect.language.name === 'en'));
                                    patchState(
                                        store,
                                        {
                                            state: 'Loaded',
                                            abilities: [...store.abilities(), ...abilities],
                                            abilitiesKeys: [...store.abilitiesKeys(), ...abilities.map((ability) => ability.name)],
                                            capturedKeys: [...store.capturedKeys(), pokemon.name],
                                            captured: [...store.captured(), pokemon]
                                        }
                                    );
                                },
                                error: (error) => patchState(store, { error, state: 'Error' })
                            })
                        )
                        : of({}).pipe(tap(() => {
                            patchState(store, {
                                state: 'Loaded',
                                captured: [...store.captured(), pokemon],
                                capturedKeys: [...store.capturedKeys(), pokemon.name]
                            });
                        }));
                })
            )
        ),

        remove(pokemon: Pokemon) {
            const captured = store.captured().filter((captured) => captured.name !== pokemon.name);
            patchState(store, {
                captured: captured,
                capturedKeys: captured.map((pk) => pk.name)
            });
        },
    })),
    withLogger()
);
