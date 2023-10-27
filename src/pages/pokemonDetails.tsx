import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DisplayResults from "./displayResults";
import SearchBox from "./searchBox";
import Search from "../components/search";
import { PokemonData } from "../components/pokemonData";

export default function PokemonDetails() {
  const { name } = useParams<{ name: string }>() ?? { name: '' };
  const [pokemonDetails, setPokemonDetails] = useState<PokemonData | null>(null);

  useEffect(() => {
    if (name !== undefined) {
      searchPokemonByName(name);
    } 
  }, [name]);

  const searchPokemonByName = async (name: string) => {
    try {
      const result = await Search(name);
      if (result) {
        setPokemonDetails(result);
      } else {
        console.error(Error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <SearchBox />
      {pokemonDetails ? (
        <DisplayResults pokeData={pokemonDetails} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
