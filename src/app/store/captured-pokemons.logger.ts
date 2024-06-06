import { effect } from '@angular/core';
import { getState, signalStoreFeature, withHooks } from '@ngrx/signals';
import { Pokemon } from '../models/pokemon';
import { Ability } from '../models/ability';
import { CapturedPokemonsState } from './captured-pokemons.store';

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

export function withLogger() {
  return signalStoreFeature(
    withHooks({
      onInit(store) {
        effect(() => {
          const state = getState(store) as CapturedPokemonsState;
          saveToLocalStorage(state.captured, state.abilities);
        });
      },
    })
  );
}