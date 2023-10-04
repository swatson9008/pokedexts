/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, ChangeEvent } from "react";
import { PokemonClient } from "pokenode-ts";

interface PokemonData {
  pokeName: string;
  pokeMove: string[];
}

export default function Search() {
  const [pokeSearch, setSearch] = useState<string>("");
  const [pokeData, setPokeData] = useState<PokemonData[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchClick = () => {
    const api = new PokemonClient();

    api
      .getPokemonByName(pokeSearch)
      .then((data) => {

        const moveNames = data.moves.map((move) => move.name);

        const searchedPokemon: PokemonData = {
          pokeName: data.name,
          pokeMove: moveNames,
        };

        setPokeData([searchedPokemon]);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="searchMain">
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
            <div className="pokeMoves">
              {pokemon.pokeMove.map((move) => (
                <div key={move} className="pokeMove">
                  {move}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
