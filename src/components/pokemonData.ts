export interface PokemonData {
    pokeName: string;
    pokeMoves: Record<string, Record<string, Array<{ name: string; level?: string }>>>;
    pokeTypes: Array<{name: string, url: string}>;
    pokeAbilities: Array<{ name: string; url: string; is_hidden: boolean }>;
  }
  