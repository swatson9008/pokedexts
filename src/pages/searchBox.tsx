import { useState, ChangeEvent } from "react";
import Search from "../components/search";
import { useNavigate } from "react-router-dom";
import { usePokemonData } from "./pokemonContext";
import { ButtonContainer } from "../styles/normalButtons";
import { SearchBoxStyle } from "../styles/searchBox";
import { SearchContainer } from "../styles/searchContainer";

export default function SearchBox() {
  const [pokeSearch, setSearch] = useState<string>("");
  const { storePokemonData } = usePokemonData();
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearch(searchValue.toLowerCase().replace(/'/g, ""));
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
  };

  return (
    <div className="searchMain">
      <SearchContainer>
        <SearchBoxStyle
          type="text"
          id="searchInput"
          placeholder="Enter a Pokemon"
          onChange={handleInputChange}
        />
        <div>
          <ButtonContainer onClick={handleSearch}>Search</ButtonContainer>
          <ButtonContainer>List</ButtonContainer>
          <ButtonContainer>Random</ButtonContainer>
        </div>
      </SearchContainer>
    </div>
  );
}
