/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, ChangeEvent } from "react";
import { PokemonClient } from "pokenode-ts";

interface PokemonData {
  pokeName: string;
  pokeMoves: Record<string, Record<string, Array<{ name: string; level?: string }>>>;
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
        const movesByVersionAndMethod: Record<
          string,
          Record<string, Array<{ name: string; level?: string }>>
        > = {};

        data.moves.forEach((move) => {
          move.version_group_details.forEach((groupDetail) => {
            const versionGroupName = groupDetail.version_group.name;
            const moveLearnMethod = groupDetail.move_learn_method.name;
            let moveLevel;

            if (!movesByVersionAndMethod[versionGroupName]) {
              movesByVersionAndMethod[versionGroupName] = {};
            }

            if (!movesByVersionAndMethod[versionGroupName][moveLearnMethod]) {
              movesByVersionAndMethod[versionGroupName][moveLearnMethod] = [];
            }

            if (moveLearnMethod === "level-up") {
              moveLevel = groupDetail.level_learned_at.toString();
            }

            if (moveLevel !== undefined) {
              const newSet = {
                name: move.move.name,
                level: moveLevel,
              };
              movesByVersionAndMethod[versionGroupName][moveLearnMethod].push(
                newSet
              );
            } else
              movesByVersionAndMethod[versionGroupName][moveLearnMethod].push({
                name: move.move.name,
              });
          });
        });

        const searchedPokemon: PokemonData = {
          pokeName: data.name,
          pokeMoves: movesByVersionAndMethod,
        };

        setPokeData([searchedPokemon]);
        console.log(data);
        console.log(data.moves[3].version_group_details[0].level_learned_at);
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
                    {Object.keys(pokemon.pokeMoves[versionGroup]).map(
                      (moveLearnMethod) => (
                        <div key={moveLearnMethod}>
                          <div className="moveLearnMethod">
                            {moveLearnMethod}
                          </div>
                          <div className="movesList">
                            {pokemon.pokeMoves[versionGroup][
                              moveLearnMethod
                            ].map((move) => (
                              <div key={move.name} className="pokeMove">
                                {move.name}
                                {move.level && ` (Level: ${move.level})`}
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )}
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
