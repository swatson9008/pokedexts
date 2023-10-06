import { PokemonData } from "./pokemonData";

export default function sortMoves(pokemonData: PokemonData): PokemonData {
  const gameReleaseOrder: string[] = [
    "red-blue",
    "yellow",
    "gold-silver",
    "crystal",
    "ruby-sapphire",
    "colosseum",
    "firered-leafgreen",
    "xd",
    "emerald",
    "diamond-pearl",
    "platinum",
    "heartgold-soulsilver",
    "black-white",
    "black-2-white-2",
    "x-y",
    "omega-ruby-alpha-sapphire",
    "sun-moon",
    "ultra-sun-ultra-moon",
    "lets-go-pikachu-lets-go-eevee",
    "sword-shield",
    "brilliant-diamond-and-shining-pearl",
    "scarlet-violet",
  ];

  const sortedPokeMoves = Object.fromEntries(
    Object.entries(pokemonData.pokeMoves).sort(
      (a, b) => gameReleaseOrder.indexOf(a[0]) - gameReleaseOrder.indexOf(b[0])
    )
  );

  return {
    ...pokemonData,
    pokeMoves: sortedPokeMoves,
  };
}
