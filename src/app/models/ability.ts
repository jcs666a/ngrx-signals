export interface Language {
    name: string;
    url: string;
}

export interface EffectEntry {
    effect: string;
    language: Language;
    short_effect: string;
}

export interface VersionGroup {
    name: string;
    url: string;
}

export interface FlavorTextEntry {
    flavor_text: string;
    language: Language;
    version_group: VersionGroup;
}

export interface Name {
    language: Language;
    name: string;
}

export interface PokemonEntry {
    is_hidden: boolean;
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
}

export interface Ability {
    effect_changes: any[];
    effect_entries: EffectEntry[];
    flavor_text_entries: FlavorTextEntry[];
    generation: {
      name: string;
      url: string;
    };
    id: number;
    is_main_series: boolean;
    name: string;
    names: Name[];
    pokemon: PokemonEntry[];
}