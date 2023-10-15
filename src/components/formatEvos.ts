import { EvolutionChain } from "pokenode-ts";
import { formatString } from "./formatString";

export default function formatEvos(evolutionChain: EvolutionChain) {
  const triggerMethod =
    evolutionChain.chain.evolves_to[0].evolution_details[0].trigger.name;

  const evoShortcut = evolutionChain.chain.evolves_to[0].evolution_details[0];


  const firstStageEvoMethods = {
    minLevel: evoShortcut?.min_level,
    minAfection: evoShortcut?.min_affection,
    itemHeld: evoShortcut?.held_item,
    minHappiness: evoShortcut?.min_happiness,
    genderCheck: evoShortcut?.gender,
    minBeauty: evoShortcut?.min_beauty,
    timeOfDay: evoShortcut?.time_of_day,
    overworldRain: evoShortcut?.needs_overworld_rain,
    knownMove: evoShortcut?.known_move,
  };


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function sliceEvoMethods(obj: any, keyValue: number) {
    const keys = Object.keys(obj) as Array<keyof typeof firstStageEvoMethods>;
    const firstKey = keys[keyValue];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [firstKey]: _, ...rest } = obj;
    return rest;
  }

  if (
    triggerMethod === "level-up" &&
    Object.values(sliceEvoMethods(firstStageEvoMethods, 0)).every(
      (prop) => !prop
    )
  ) {
    return `${formatString(
      evolutionChain.chain.species.name
    )} evolves to ${formatString(
      evolutionChain.chain.evolves_to[0].species.name
    )} at level ${firstStageEvoMethods.minLevel?.toString() || "not known"}`;
  }

  if (
    triggerMethod === "trade" &&
    Object.values(sliceEvoMethods(firstStageEvoMethods, 2)).every(
      (prop) => !prop
    )
  ) {
    return `${formatString(
      evolutionChain.chain.species.name
    )} evolves to ${formatString(
      evolutionChain.chain.evolves_to[0].species.name
    )} from being traded` || "not known";
  }

  else return "";
}
