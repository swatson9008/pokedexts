export interface PokemonData {
  pokeName: string;
  pokeMoves: Record<
    string,
    Record<string, Array<{ name: string; level?: string }>>
  >;
  pokeTypes: Array<{ name: string; url: string }>;
  pastTypes: Array<{
    generation: {
      name: string;
    };
    types: Array<{
      slot: number;
      type: {
        name: string;
      };
    }>;
  }>;
  pokeAbilities: Array<{ name: string; url: string; is_hidden: boolean }>;
  pokeStats: Array<{name: string; base_stat: string}>;
  pokeSpecies: { url: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pokeForms: Array<{ forms: any[] }>;
  pokeSprites: { sprite: string | null };
  pokeEvoID: string;
  
}
