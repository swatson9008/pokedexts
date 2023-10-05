export interface PokemonData {
    pokeName: string;
    pokeMoves: Record<string, Record<string, Array<{ name: string; level?: string }>>>;
  }
  