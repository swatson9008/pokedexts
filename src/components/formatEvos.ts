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

  function sliceEvoMethods(
    obj: typeof firstStageEvoMethods,
    toExclude: { [key: string]: boolean }
  ) {
    const result = Object.entries(obj)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([key, _]) => !toExclude[key])
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    return result;
  }

  if (
    triggerMethod === "level-up" &&
    Object.values(
      sliceEvoMethods(firstStageEvoMethods, { minLevel: true })
    ).every((prop) => !prop)
  ) {
    return `${formatString(
      evolutionChain.chain.species.name
    )} evolves to ${formatString(
      evolutionChain.chain.evolves_to[0].species.name
    )} at level ${firstStageEvoMethods.minLevel?.toString() || "not known"}`;
  }

  if (
    triggerMethod === "trade" &&
    Object.values(firstStageEvoMethods).every((prop) => !prop)
  ) {
    return (
      `${formatString(
        evolutionChain.chain.species.name
      )} evolves to ${formatString(
        evolutionChain.chain.evolves_to[0].species.name
      )} from being traded` || "not known"
    );
  }

  if (
    ///happiness evolution
    triggerMethod === "level-up" &&
    Object.values(
      sliceEvoMethods(firstStageEvoMethods, { minHappiness: true })
    ).every((prop) => !prop)
  ) {
    return (
      `${formatString(
        evolutionChain.chain.species.name
      )} evolves to ${formatString(
        evolutionChain.chain.evolves_to[0].species.name
      )} from leveling up with high friendship` || "not known"
    );
  }

  if (
    ///move specific evolution
    triggerMethod === "level-up" &&
    Object.values(
      sliceEvoMethods(firstStageEvoMethods, { knownMove: true })
    ).every((prop) => !prop)
  ) {
    return `${formatString(
      evolutionChain.chain.species.name
    )} evolves to ${formatString(
      evolutionChain.chain.evolves_to[0].species.name
    )} from leveling up while knowing ${
      evoShortcut.known_move?.name === undefined
        ? "unknown move"
        : formatString(evoShortcut.known_move?.name) || "not known"
    }`;
  }

  if (
    ///time of day evolution
    triggerMethod === "level-up" &&
    Object.values(
      sliceEvoMethods(firstStageEvoMethods, { timeOfDay: true, minLevel: true })
    ).every((prop) => !prop && evoShortcut.min_level != null)
  ) {
    return (
      `${formatString(
        evolutionChain.chain.species.name
      )} evolves to ${formatString(
        evolutionChain.chain.evolves_to[0].species.name
      )} from leveling up during the ${
        evoShortcut.time_of_day
      }time starting at level ${evoShortcut.min_level}` || "not known"
    );
  }

  if (
    ///time of day + item evolution
    triggerMethod === "level-up" &&
    Object.values(
      sliceEvoMethods(firstStageEvoMethods, { timeOfDay: true, itemHeld: true })
    ).every((prop) => !prop)
  ) {
    return (
      `${formatString(
        evolutionChain.chain.species.name
      )} evolves to ${formatString(
        evolutionChain.chain.evolves_to[0].species.name
      )} from leveling up during the ${
        evoShortcut.time_of_day
      }time starting at level ${evoShortcut.min_level} while holding ${
        evoShortcut.held_item?.name === undefined
          ? "unknown item "
          : formatString(evoShortcut.held_item?.name)
      }` || "not known"
    );
  } 
  
  if (
    ///gender evolution
    triggerMethod === "level-up" &&
    Object.values(
      sliceEvoMethods(firstStageEvoMethods, { genderCheck: true, minLevel: true })
    ).every((prop) => !prop)
  ) {
    return (
      `${formatString(
        evolutionChain.chain.species.name
      )} evolves to ${formatString(
        evolutionChain.chain.evolves_to[0].species.name
      )} if they are ${evoShortcut.gender === 1 ? "female" : "male"} starting at ${evoShortcut.min_level}` || "not known"
    );
  }
  
  
  
  else return "";
}
