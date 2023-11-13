import listOfPokemon from "../libraries/pokemonlist.json";
import { formatString } from "../components/formatString";
import Search from "../components/search";
import { useNavigate } from "react-router-dom";
import { usePokemonData } from "./pokemonContext";

interface Pokemon {
  name: string;
  url: string;
}

export default function ListPage() {
  const navigate = useNavigate();
  const { storePokemonData } = usePokemonData();

  const handleSearch = async (pokemonName: string) => {
    try {
      const result = await Search(pokemonName);
      if (result) {
        storePokemonData(result);
        navigate(`/pokemon/${result.pokeName}`);
      }
    } catch (error) {
      console.error(error);
      alert("Please enter a proper name for a Pokemon species");
    }
  };

  const initialList = listOfPokemon.results
    .slice(0, 1017)
    .map((pokemon: Pokemon) => (
      <div key={pokemon.name} onClick={() => handleSearch(pokemon.name)}>
        {formatString(pokemon.name)}
      </div>
    ));

  return <>{initialList}</>;
}
