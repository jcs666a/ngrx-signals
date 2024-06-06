import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { PokeapiService } from '../../../services/pokeapi.service';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-pokeapi-page',
  standalone: true,
  imports: [ CommonModule, PokemonListComponent ],
  templateUrl: './pokeapi-page.component.html',
  styleUrl: './pokeapi-page.component.scss'
})
export class PokeapiPageComponent {
  pokemonPage$ = this.pokeapiService.pokemonPage;

  constructor(
    private pokeapiService: PokeapiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pokeapiService.getPageWithImage().pipe(take(1)).subscribe();
  }

  openPage(url: string): void {
    this.pokeapiService.getPageWithImage(url).pipe(take(1)).subscribe();
  }

  openDetails(name: string): void {
    this.router.navigateByUrl(`/signal-store/details/${name}`);
  }

  searchPokemon(name: string): void {
    this.pokeapiService.searchPokemon(name.toLowerCase().trim()).pipe(take(1)).subscribe();
  }

}
