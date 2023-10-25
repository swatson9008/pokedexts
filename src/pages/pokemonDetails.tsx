import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DisplayResults from "./displayResults";
import { usePokemonData } from "./pokemonContext";
import Search from "../components/search";

export default function PokemonDetails() {
  const { name } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const { pokemonData } = usePokemonData();

  useEffect(() => {
    // Check if pokemonData is null, and if so, trigger the search
    if (pokemonData === null) {
      searchPokemonByName(name);
    }
    else {setPokemonDetails(pokemonData)}
  }, [name, pokemonData]);

  const searchPokemonByName = async (name: string) => {
    try {
      const result = await Search(name);
      if (result) {
        setPokemonDetails(result);
      } else {
        // Handle the case when the search result is null
      }
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during the search
    }
  };

  return (
    <div>
      {pokemonDetails ? (
        <DisplayResults pokeData={pokemonDetails} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
