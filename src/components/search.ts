import { useState, ChangeEvent } from "react";

interface PokemonData {
  pokeName: string;
  capture: number;
}

export default function Search() {
  const [pokeSearch, setSearch] = useState<string>('');
  const [pokeData, setPokeData] = useState<PokemonData[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchClick = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeSearch}`)
      .then((res) => res.json())
      .then((data) => {
        const searchedPokemon: PokemonData = {
          pokeName: data.name,
          capture: data.capture_rate,
        };
        setPokeData([searchedPokemon]);
      });
  };

  return (
    <div>
    /*<div className="searchMain">
      <div className="searchContainer">
        <input
          type="text"
          id="searchInput"
          placeholder="Enter a Pokemon"
          value={pokeSearch}
          onChange={handleInputChange}
        />
        <button id="searchButton" onClick={handleSearchClick}>
          Search
        </button>
      </div>
      <div className="displayResult">
        {pokeData.map((pokemon) => (
          <div key={pokemon.pokeName}>
            <div className="pokeName">{pokemon.pokeName}</div>
            <div className="pokeDescrip">{pokemon.capture}</div>
          </div>
        ))}
      </div>
    </div>*/
  );
}
