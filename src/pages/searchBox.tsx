import { useState, ChangeEvent } from "react";
import Search from "../components/search";
import DisplayResults from "./displayResults";
import { PokemonData } from "../components/pokemonData";
import { useNavigate } from "react-router-dom";
import { usePokemonData } from "./pokemonContext";

export default function SearchBox() {
  const [pokeSearch, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<PokemonData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { storePokemonData } = usePokemonData();
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearch(searchValue.toLowerCase().replace(/'/g, ''));
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const result = await Search(pokeSearch);
      if (result) {
        storePokemonData(result); // Store the result in the context
        navigate(`/pokemon/${result.pokeName}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  

  return (
    <div className="searchMain">
      <div className="searchContainer">
        <input
          type="text"
          id="searchInput"
          placeholder="Enter a Pokemon"
          onChange={handleInputChange}
        />
        <button id="searchButton" onClick={handleSearch}>
          Search
        </button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        searchResult !== null && <DisplayResults pokeData={searchResult} />
      )}
    </div>
  );
}
