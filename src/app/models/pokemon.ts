export interface Ability {
    name: string;
    url: string;
}

export interface PokemonAbility {
    ability: Ability;
    is_hidden: boolean;
    slot: number;
}

export interface Cries {
    latest: string;
    legacy: string;
}

export interface Form {
    name: string;
    url: string;
}

export interface Version {
    name: string;
    url: string;
}

export interface GameIndex {
    game_index: number;
    version: Version;
}

export interface Item {
    name: string;
    url: string;
}

export interface VersionDetail {
    rarity: number;
    version: Version;
}

export interface HeldItem {
    item: Item;
    version_details: VersionDetail[];
}

export interface Move {
    name: string;
    url: string;
}

export interface MoveLearnMethod {
    name: string;
    url: string;
}

export interface VersionGroup {
    name: string;
    url: string;
}

export interface VersionGroupDetail {
    level_learned_at: number;
    move_learn_method: MoveLearnMethod;
    version_group: VersionGroup;
}

export interface PokemonMove {
    move: Move;
    version_group_details: VersionGroupDetail[];
}

export interface Species {
    name: string;
    url: string;
}

export interface Sprites {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
    other: {
      dream_world: {
        front_default: string;
        front_female: string | null;
      };
      home: {
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
      };
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
      showdown: {
        back_default: string;
        back_female: string | null;
        back_shiny: string;
        back_shiny_female: string | null;
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
      };
    };
    versions: {
      "generation-i": {
        "red-blue": {
          back_default: string;
          back_gray: string;
          back_transparent: string;
          front_default: string;
          front_gray: string;
          front_transparent: string;
        };
        yellow: {
          back_default: string;
          back_gray: string;
          back_transparent: string;
          front_default: string;
          front_gray: string;
          front_transparent: string;
        };
      };
      "generation-ii": {
        crystal: {
          back_default: string;
          back_shiny: string;
          back_shiny_transparent: string;
          back_transparent: string;
          front_default: string;
          front_shiny: string;
          front_shiny_transparent: string;
          front_transparent: string;
        };
        gold: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
          front_transparent: string;
        };
        silver: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
          front_transparent: string;
        };
      };
      "generation-iii": {
        emerald: {
          front_default: string;
          front_shiny: string;
        };
        "firered-leafgreen": {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
        "ruby-sapphire": {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
      };
      "generation-iv": {
        "diamond-pearl": {
          back_default: string;
          back_female: string | null;
          back_shiny: string;
          back_shiny_female: string | null;
          front_default: string;
          front_female: string | null;
          front_shiny: string;
          front_shiny_female: string | null;
        };
        "heartgold-soulsilver": {
          back_default: string;
          back_female: string | null;
          back_shiny: string;
          back_shiny_female: string | null;
          front_default: string;
          front_female: string | null;
          front_shiny: string;
          front_shiny_female: string | null;
        };
      };
    };
}

export interface Pokemon {
    abilities: PokemonAbility[];
    base_experience: number;
    cries: Cries;
    forms: Form[];
    game_indices: GameIndex[];
    height: number;
    held_items: HeldItem[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: PokemonMove[];
    name: string;
    order: number;
    past_abilities: any[];
    past_types: any[];
    species: Species;
    sprites: Sprites;
    error?: boolean;
}

export const defaultPokemon: Pokemon = {
  abilities: [],
  base_experience: 0,
  cries: { latest: '', legacy: '' },
  forms: [],
  game_indices: [],
  height: 0,
  held_items: [],
  id: 0,
  is_default: false,
  location_area_encounters: '',
  moves: [],
  name: '',
  order: 0,
  past_abilities: [],
  past_types: [],
  species: { name: '', url: '' },
  sprites: {
    back_default: '',
    back_female: '',
    back_shiny: '',
    back_shiny_female: '',
    front_default: '',
    front_female: '',
    front_shiny: '',
    front_shiny_female: '',
    other: {
      dream_world: {
        front_default: '',
        front_female: '',
      },
      home: {
        front_default: '',
        front_female: '',
        front_shiny: '',
        front_shiny_female: '',
      },
      "official-artwork": {
        front_default: '',
        front_shiny: '',
      },
      showdown: {
        back_default: '',
        back_female: '',
        back_shiny: '',
        back_shiny_female: '',
        front_default: '',
        front_female: '',
        front_shiny: '',
        front_shiny_female: '',
      },
    },
    versions: {
      "generation-i": {
        "red-blue": {
          back_default: '',
          back_gray: '',
          back_transparent: '',
          front_default: '',
          front_gray: '',
          front_transparent: '',
        },
        yellow: {
          back_default: '',
          back_gray: '',
          back_transparent: '',
          front_default: '',
          front_gray: '',
          front_transparent: '',
        },
      },
      "generation-ii": {
        crystal: {
          back_default: '',
          back_shiny: '',
          back_shiny_transparent: '',
          back_transparent: '',
          front_default: '',
          front_shiny: '',
          front_shiny_transparent: '',
          front_transparent: '',
        },
        gold: {
          back_default: '',
          back_shiny: '',
          front_default: '',
          front_shiny: '',
          front_transparent: '',
        },
        silver: {
          back_default: '',
          back_shiny: '',
          front_default: '',
          front_shiny: '',
          front_transparent: '',
        },
      },
      "generation-iii": {
        emerald: {
          front_default: '',
          front_shiny: '',
        },
        "firered-leafgreen": {
          back_default: '',
          back_shiny: '',
          front_default: '',
          front_shiny: '',
        },
        "ruby-sapphire": {
          back_default: '',
          back_shiny: '',
          front_default: '',
          front_shiny: '',
        },
      },
      "generation-iv": {
        "diamond-pearl": {
          back_default: '',
          back_female: '',
          back_shiny: '',
          back_shiny_female: '',
          front_default: '',
          front_female: '',
          front_shiny: '',
          front_shiny_female: '',
        },
        "heartgold-soulsilver": {
          back_default: '',
          back_female: '',
          back_shiny: '',
          back_shiny_female: '',
          front_default: '',
          front_female: '',
          front_shiny: '',
          front_shiny_female: '',
        },
      },
    },
  },
  error: false
};
