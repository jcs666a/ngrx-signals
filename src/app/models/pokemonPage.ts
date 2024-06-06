import { Pokemon } from "./pokemon";

interface PokemonRow {
    name: string;
    url: string;
    image?: string;
    audio?: string;
    fullData?: Pokemon;
}

export interface PokemonPage {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonRow[];
    isLoading?: boolean;
}
