import { EvolutionChain } from "pokenode-ts";
import { formatString } from "./formatString";

export default function formatEvos(evolutionChain: EvolutionChain) {
  const triggerMethod =
    evolutionChain.chain.evolves_to[0].evolution_details[0].trigger.name;

  const firstStageEvoMethods = {
    minLevel: evolutionChain.chain.evolves_to[0].evolution_details[0]?.min_level,
    minAfection: evolutionChain.chain.evolves_to[0].evolution_details[0]?.min_affection,
    itemHeld: evolutionChain.chain.evolves_to[0].evolution_details[0]?.held_item,
    minHappiness: evolutionChain.chain.evolves_to[0].evolution_details[0]?.min_happiness,
    genderCheck: evolutionChain.chain.evolves_to[0].evolution_details[0]?.gender,
    minBeauty: evolutionChain.chain.evolves_to[0].evolution_details[0]?.min_beauty,
    timeOfDay: evolutionChain.chain.evolves_to[0].evolution_details[0]?.time_of_day,
    overworldRain: evolutionChain.chain.evolves_to[0].evolution_details[0]?.needs_overworld_rain,
    knownMove: evolutionChain.chain.evolves_to[0].evolution_details[0]?.known_move
  };

  function sliceEvoMethods(obj: any, keyValue: number) {
    const keys = Object.keys(obj);
    const firstKey = keys[keyValue];
    const { [firstKey]: _, ...rest } = obj;
    return rest;
  }
  

  if (
    triggerMethod === "level-up" &&
    Object.values(sliceEvoMethods(firstStageEvoMethods, 0)).every(prop => prop === null || prop === "" || prop === false)
  ) {
    return `${formatString(
      evolutionChain.chain.species.name
    )} evolves to ${formatString(
      evolutionChain.chain.evolves_to[0].species.name
    )} at level ${firstStageEvoMethods.minLevel?.toString() || 'not known'}`;
  }

  return "";
}
