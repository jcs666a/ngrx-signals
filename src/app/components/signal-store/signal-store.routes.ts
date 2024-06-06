import { Routes } from '@angular/router';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokeapiPageComponent } from './pokeapi-page/pokeapi-page.component';
import { CapturedPageComponent } from './captured-page/captured-page.component';

export const signalRoutes: Routes = [
    {
        path: 'signal-store',
        children: [
            { path: 'list', component: PokeapiPageComponent },
            { path: 'captured', component: CapturedPageComponent },
            { path: 'details/:pokemon', component: PokemonDetailsComponent }
        ]
    }
];
