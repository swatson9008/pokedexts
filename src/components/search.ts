import { PokemonClient } from "pokenode-ts";
import { PokemonData } from "./pokemonData";

export default async function Search(searchPoke: string) {
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
    };

    try {
      const response = await fetch(searchedPokemonData.pokeAbilities[0].url);
      if (!response.ok) {
        throw new Error(`Unable to fetch ability data: ${response.statusText}`);
      }
      const abilityData = await response.json();
      console.log(abilityData);
    } catch (error) {
      console.error(`Error fetching ability data: ${error}`);
      throw error;
    }

    try {
      const response = await fetch(searchedPokemonData.pokeSpecies.url);
      if (!response.ok) {
        throw new Error(`Unable to fetch species data: ${response.statusText}`);
      }
      const speciesData = await response.json();
      console.log(speciesData);
    } catch (error) {
      console.error(`Error fetching species data: ${error}`);
      throw error;
    }

    console.log(data);
    console.log(movesByVersionAndMethod);
    console.log(searchedPokemonData);
    return searchedPokemonData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
