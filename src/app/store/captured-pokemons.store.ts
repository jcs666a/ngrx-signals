import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tapResponse } from '@ngrx/operators';
import { combineLatest, of, pipe, switchMap, tap } from "rxjs";
import { Pokemon } from "../models/pokemon";
import { Ability } from "../models/ability";
import { PokeapiService } from "../services/pokeapi.service";

interface CapturedPokemonsState {
    captured: Pokemon[],
    capturedKeys: string[];
    abilities: Ability[];
    abilitiesKeys: string[];
    searchPokemonString: string;
    error: any,
    state: 'Loading' | 'Loaded' | 'Error'
};

const saveToLocalStorage = (captured: Pokemon[], abilities?: Ability[]): void => {
    localStorage.setItem('rs_captured', JSON.stringify(captured));
    localStorage.setItem(
        'rs_captured_keys',
        JSON.stringify(captured.map((pokemon) => pokemon.name))
    );
    if (abilities) {
        localStorage.setItem('rs_abilities', JSON.stringify(abilities));
        localStorage.setItem(
            'rs_abilities_keys',
            JSON.stringify(abilities.map((ability) => ability.name))
        );
    }
}

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
    searchPokemonString: '',
    error: {},
    state: 'Loaded'
};

export const PokemonsStore = signalStore(
    { providedIn: 'root' },
    withState(InitialState),
    withComputed(({ captured, abilities }) => ({
        totalCaptured: computed(() => captured().length),
        totalAbilities: computed(() => abilities().length)
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
                                    saveToLocalStorage(store.captured(), store.abilities());
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
                            saveToLocalStorage(store.captured());
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
            saveToLocalStorage(store.captured());
        },
    }))
);
