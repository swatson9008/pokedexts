import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DisplayResults from "./displayResults";
import { usePokemonData } from "./pokemonContext";
import SearchBox from "./searchBox";
import Search from "../components/search";
import { PokemonData } from "../components/pokemonData";

export default function PokemonDetails() {
  const { name } = useParams<{ name: string }>() ?? { name: '' };
  const [pokemonDetails, setPokemonDetails] = useState<PokemonData | null>(null);
  const { pokemonData } = usePokemonData();

  useEffect(() => {
    if (pokemonData === null && name !== undefined) {
      searchPokemonByName(name);
    } 
    else if (pokemonData !== null) {
        setPokemonDetails(pokemonData as PokemonData);
    }
  }, [name, pokemonData]);

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
