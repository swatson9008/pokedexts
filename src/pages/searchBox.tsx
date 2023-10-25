import { useState, ChangeEvent } from "react";
import Search from "../components/search";
import { useNavigate } from "react-router-dom";
import { usePokemonData } from "./pokemonContext";

export default function SearchBox() {
  const [pokeSearch, setSearch] = useState<string>("");
  const { storePokemonData } = usePokemonData();
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearch(searchValue.toLowerCase().replace(/'/g, ''));
  };

  const handleSearch = async () => {
    try {
      const result = await Search(pokeSearch);
      if (result) {
        storePokemonData(result); 
        navigate(`/pokemon/${result.pokeName}`);
      }
    } catch (error) {
      console.error(error);
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
    </div>
  );
}
