import { PokemonClient } from "pokenode-ts";
import { PokemonData } from "./pokemonData";
import { EvolutionClient } from "pokenode-ts";

export default async function Search(searchPoke: string) {
  if (searchPoke === "shaymin") {
    searchPoke = "shaymin-land";
  }

  if (searchPoke === "meowstic") {
    searchPoke = "meowstic-male";
  }

  if (searchPoke === "darmanitan") {
    searchPoke = "darmanitan-standard";
  }

  if (searchPoke === "deoxys") {
    searchPoke = "deoxys-normal";
  }

  if (searchPoke === "wormadam") {
    searchPoke = "wormadam-plant";
  }

  if (searchPoke === "giratina") {
    searchPoke = "giratina-altered";
  }

  if (searchPoke === "basculin") {
    searchPoke = "basculin-red-striped";
  }

  if (searchPoke === "basculegion") {
    searchPoke = "basculegion-male";
  }

  if (searchPoke === "tornadus") {
    searchPoke = "tornadus-incarnate";
  }

  if (searchPoke === "thundurus") {
    searchPoke = "thundurus-incarnate";
  }

  if (searchPoke === "landorus") {
    searchPoke = "landorus-incarnate";
  }

  if (searchPoke === "enamorus") {
    searchPoke = "enamorus-incarnate";
  }

  if (searchPoke === "keldeo") {
    searchPoke = "keldeo-ordinary";
  }

  if (searchPoke === "meloetta") {
    searchPoke = "meloetta-aria";
  }

  if (searchPoke === "aegislash") {
    searchPoke = "aegislash-shield";
  }

  if (searchPoke === "pumpkaboo") {
    searchPoke = "pumpkaboo-average";
  }

  if (searchPoke === "zygarde") {
    searchPoke = "zygarde-50";
  }

  if (searchPoke === "oricorio") {
    searchPoke = "oricorio-baile";
  }

  if (searchPoke === "lycanroc") {
    searchPoke = "lycanroc-midday";
  }

  if (searchPoke === "wishiwashi") {
    searchPoke = "wishiwashi-solo";
  }

  if (searchPoke === "minior") {
    searchPoke = "minior-red-meteor";
  }

  if (searchPoke === "mimikyu") {
    searchPoke = "mimikyu-disguised";
  }

  if (searchPoke === "toxtricity") {
    searchPoke = "toxtricity-amped";
  }

  if (searchPoke === "eiscue") {
    searchPoke = "eiscue-ice";
  }

  if (searchPoke === "indeedee") {
    searchPoke = "indeedee-male";
  }

  if (searchPoke === "morpeko") {
    searchPoke = "morpeko-full-belly";
  }

  if (searchPoke === "urshifu") {
    searchPoke = "urshifu-single-strike";
  }

  try {
    const api = new PokemonClient();
    const data = await api.getPokemonByName(searchPoke);

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
        } else {
          movesByVersionAndMethod[versionGroupName][moveLearnMethod].push({
            name: move.move.name,
          });
        }
      });
    });

    Object.values(movesByVersionAndMethod).forEach((methods) => {
      if (methods["level-up"]) {
        methods["level-up"].sort((a, b) => {
          if (a.level && b.level) {
            return parseInt(a.level) - parseInt(b.level);
          }
          return 0;
        });
      }
    });

    ///pokeapi doesn't include egg moves for evolutions, lets fix that
    const findEggMoves = async (pokeName: string) => {
      try {
        const api = new EvolutionClient();
        const res = await api.getEvolutionChainById(
          parseInt(searchedPokemonData.pokeEvoID)
        );

        if (pokeName !== res?.chain.species.name) {
          const eggMovesByVersionGroup: Record<
            string,
            Record<string, { name: string }[]>
          > = {};

          const newApi = new PokemonClient();
          const baseData = await newApi.getPokemonByName(
            res.chain.species.name
          );

          baseData.moves.forEach((move) => {
            move.version_group_details.forEach((groupDetail) => {
              const versionGroupName = groupDetail.version_group.name;
              const moveLearnMethod = groupDetail.move_learn_method.name;

              if (moveLearnMethod === "egg") {
                if (!eggMovesByVersionGroup[versionGroupName]) {
                  eggMovesByVersionGroup[versionGroupName] = { egg: [] };
                }

                eggMovesByVersionGroup[versionGroupName].egg.push({
                  name: move.move.name,
                });
              }
            });
          });

          const formattedEggMoves = Object.entries(eggMovesByVersionGroup).map(
            ([versionGroup, methods]) => {
              const formattedMethods = Object.entries(methods).map(
                ([method, moves]) => {
                  return {
                    [method]: moves,
                  };
                }
              );
              return {
                versionGroup: versionGroup,
                ...Object.assign({}, ...formattedMethods),
              };
            }
          );

          formattedEggMoves.forEach(({ versionGroup, egg }) => {
            if (searchedPokemonData.pokeMoves[versionGroup]) {
              if (!searchedPokemonData.pokeMoves[versionGroup]["egg"]) {
                searchedPokemonData.pokeMoves[versionGroup]["egg"] = [];
              }
              searchedPokemonData.pokeMoves[versionGroup]["egg"] = egg;
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAndExtractEvolutionChain = async () => {
      try {
        const response = await fetch(searchedPokemonData.pokeSpecies.url);
        if (response.ok) {
          const speciesData = await response.json();
          const evolutionChainUrl = speciesData.evolution_chain.url;
          const matches = evolutionChainUrl.match(/\/(\d+)\/$/);
          if (matches && matches.length > 1) {
            searchedPokemonData.pokeEvoID = matches[1];
          }
        } else {
          console.error(
            "Failed to fetch species data:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching species data:", error);
      }
    };

    const fetchAlternateForms = async () => {
      try {
        const api = new PokemonClient();
        const response = await api.getPokemonSpeciesByName(data.species.name);

        if (response) {
          const formData = { forms: [response.varieties] };
          searchedPokemonData.pokeForms = [formData];
        }
      } catch (error) {
        console.error("Error fetching forms data:", error);
      }
    };

    const searchedPokemonData: PokemonData = {
      pokeName: data.name,
      pokeMoves: movesByVersionAndMethod,
      pokeTypes: data.types.map((typeInfo) => ({
        name: typeInfo.type.name,
        url: typeInfo.type.url,
      })),
      pokeAbilities: data.abilities.map((ability) => ({
        name: ability.ability.name,
        url: ability.ability.url,
        is_hidden: ability.is_hidden,
      })),
      pastTypes: data.past_types.map((pastType) => ({
        generation: {
          name: pastType.generation.name,
        },
        types: pastType.types.map((type) => ({
          slot: type.slot,
          type: {
            name: type.type.name,
          },
        })),
      })),
      pokeStats: data.stats.map((stats) => ({
        name: stats.stat.name,
        base_stat: stats.base_stat.toString(),
      })),
      pokeSpecies: { url: data.species.url },
      pokeSprites: { sprite: data.sprites.front_default },
      pokeEvoID: "",
      pokeForms: [{ forms: [] }],
    };

    await fetchAndExtractEvolutionChain();
    await fetchAlternateForms();

    await findEggMoves(searchedPokemonData.pokeName);

    try {
      const response = await fetch(searchedPokemonData.pokeAbilities[0].url);
      if (!response.ok) {
        throw new Error(`Unable to fetch ability data: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error fetching ability data: ${error}`);
      throw error;
    }

    try {
      const response = await fetch(searchedPokemonData.pokeSpecies.url);
      if (!response.ok) {
        throw new Error(`Unable to fetch species data: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error fetching species data: ${error}`);
      throw error;
    }
    return searchedPokemonData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
