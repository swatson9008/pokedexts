import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";
import Search from "../components/search";
import { useNavigate } from "react-router-dom";
import { usePokemonData } from "./pokemonContext";
import { ButtonContainer } from "../styles/normalButtons";
import { SearchBoxStyle } from "../styles/searchBox";
import { SearchContainer } from "../styles/searchContainer";
import { PokemonClient } from "pokenode-ts";
import { formatString } from "../components/formatString";
import listOfPokemon from "../libraries/pokemonlist.json";
import { useDarkMode } from '../pages/darkModeContext';

interface Pokemon {
  name: string;
  url: string;
  types: { name: string; url: string }[];
}

export default function SearchBox() {
  const { isDarkMode } = useDarkMode();
  const [pokeSearch, setSearch] = useState<string>("");
  const [suggestedPokes, setSuggested] = useState<Pokemon[]>([]);
  const { storePokemonData } = usePokemonData();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
      .toLowerCase()
      .replace(/'/g, "")
      .replace(/\s+/g, "-");
    setSearch(searchValue);
    if (!searchValue) {
      setSuggested([]);
      setSearch("");
      return;
    }
    const filteredPokes = listOfPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setSuggested(filteredPokes);
  };

  useEffect(() => {
    setSearch("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setSuggested([]);
  }, [navigate]);

  const handleSearch = async () => {
    try {
      const result = await Search(pokeSearch);
      if (result) {
        storePokemonData(result);
        navigate(`/pokemon/${result.pokeName}`);
      }
    } catch (error) {
      console.error(error);
      alert("Please enter a proper name for a Pokemon species");
    }
  };

  const randomizer = async () => {
    const randomNumber = Math.floor(Math.random() * (1017 - 1 + 1) + 1);
    try {
      const api = new PokemonClient();
      const data = await api.getPokemonById(randomNumber);
      const result = await Search(data.species.name);
      storePokemonData(result);
      navigate(`/pokemon/${result.pokeName}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (pokemon: Pokemon) => {
    setSearch(pokemon.name);
    setSuggested([]);
  };

  const handleList = () => {
    navigate('/list')
  }

  return (
    <div className="searchMain">
      <SearchContainer>
        <SearchBoxStyle isDarkMode={isDarkMode}>
          <input
            type="text"
            id="searchInput"
            placeholder="Enter a Pokemon"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            value={formatString(pokeSearch)}
          />
          {/* Suggestions container */}
          {suggestedPokes.length > 0 && (
            <div className="suggestions">
              {suggestedPokes.map((pokemon, index) => (
                <div key={index} onClick={() => handleSuggestionClick(pokemon)}>
                  {formatString(pokemon.name)}
                </div>
              ))}
            </div>
          )}
        </SearchBoxStyle>
        <div>
          <ButtonContainer onClick={handleSearch}>Search</ButtonContainer>
          <ButtonContainer onClick={handleList}>List</ButtonContainer>
          <ButtonContainer onClick={randomizer}>Random</ButtonContainer>
        </div>
      </SearchContainer>
    </div>
  );
}
