import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";
import Search from "../components/search";
import { useNavigate } from "react-router-dom";
import { usePokemonData } from "./pokemonContext";
import { ButtonContainer } from "../styles/normalButtons";
import { SearchBoxStyle } from "../styles/searchBox";
import { SearchContainer } from "../styles/searchContainer";
import { PokemonClient } from "pokenode-ts";
import { formatString, formatMegas } from "../components/formatString";
import listOfPokemon from "../libraries/pokemonlist.json";
import { useDarkMode } from "../pages/darkModeContext";

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
  const [suggestionClicked, setSuggestionClicked] = useState<boolean>(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

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

  const [selectedSuggestionIndex, setSelectedSuggestionIndex] =
    useState<number>(-1);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (selectedSuggestionIndex !== -1) {
        handleSuggestionClick(suggestedPokes[selectedSuggestionIndex]);
      } else {
        handleSearch();
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      if (suggestionsRef.current && selectedSuggestionIndex - 1 >= 0) {
        suggestionsRef.current.children[selectedSuggestionIndex - 1].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestedPokes.length - 1)
      );
      if (suggestionsRef.current && selectedSuggestionIndex + 1 < suggestedPokes.length) {
        suggestionsRef.current.children[selectedSuggestionIndex + 1].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  };

  const handleSuggestionClick = (pokemon: Pokemon) => {
    setSearch(pokemon.name);
    setSuggested([]);
    setSuggestionClicked(true);
    setSelectedSuggestionIndex(-1);
  };

  useEffect(() => {
    if (suggestionClicked) {
      handleSearch();
      setSuggestionClicked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestedPokes, suggestionClicked]);

  const handleList = () => {
    navigate("/list");
  };

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
            <div className="suggestions" ref={suggestionsRef}>
              {suggestedPokes.map((pokemon, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(pokemon)}
                  className={`suggestion ${
                    index === selectedSuggestionIndex ? "selected" : ""
                  }`}
                  onMouseEnter={() => setSelectedSuggestionIndex(index)}
                >
                  {formatString(formatMegas(pokemon.name))}
                </div>
              ))}
            </div>
          )}
        </SearchBoxStyle>
        <div>
          <ButtonContainer onClick={handleSearch} isDarkMode={isDarkMode}>
            Search
          </ButtonContainer>
          <ButtonContainer onClick={handleList} isDarkMode={isDarkMode}>
            List
          </ButtonContainer>
          <ButtonContainer onClick={randomizer} isDarkMode={isDarkMode}>
            Random
          </ButtonContainer>
        </div>
      </SearchContainer>
    </div>
  );
}
