/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, ChangeEvent } from "react";
import { PokemonClient } from "pokenode-ts";

interface PokemonData {
  pokeName: string;
  pokeMoves: Record<string, Record<string, string[]>>;
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
        const movesByVersionAndMethod: Record<string, Record<string, string[]>> = {};

        data.moves.forEach((move) => {
          move.version_group_details.forEach((groupDetail) => {
            const versionGroupName = groupDetail.version_group.name;
            const moveLearnMethod = groupDetail.move_learn_method.name;

            if (!movesByVersionAndMethod[versionGroupName]) {
              movesByVersionAndMethod[versionGroupName] = {};
            }

            if (!movesByVersionAndMethod[versionGroupName][moveLearnMethod]) {
              movesByVersionAndMethod[versionGroupName][moveLearnMethod] = [];
            }

            movesByVersionAndMethod[versionGroupName][moveLearnMethod].push(move.move.name);
          });
        });

        const searchedPokemon: PokemonData = {
          pokeName: data.name,
          pokeMoves: movesByVersionAndMethod,
        };

        setPokeData([searchedPokemon]);
        console.log(data);
        console.log(movesByVersionAndMethod);
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
              {Object.keys(pokemon.pokeMoves).map((versionGroup) => (
                <div key={versionGroup}>
                  <div className="versionGroupName">{versionGroup}</div>
                  <div className="moveLearnMethods">
                    {Object.keys(pokemon.pokeMoves[versionGroup]).map((moveLearnMethod) => (
                      <div key={moveLearnMethod}>
                        <div className="moveLearnMethod">{moveLearnMethod}</div>
                        <div className="movesList">
                          {pokemon.pokeMoves[versionGroup][moveLearnMethod].map((move) => (
                            <div key={move} className="pokeMove">
                              {move}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
