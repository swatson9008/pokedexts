import { EvolutionChain } from "pokenode-ts";
import { formatString } from "./formatString";

export default function formatEvos(evolutionChain: EvolutionChain) {
  const triggerMethod =
    evolutionChain.chain.evolves_to[0].evolution_details[0].trigger.name;

  const evoShortcut = evolutionChain.chain.evolves_to[0].evolution_details[0];

  const baseSpecies = evolutionChain.chain.species.name;

  const secondSpecies = evolutionChain.chain.evolves_to[0].species.name;

  const firstStageEvoMethods = {
    minLevel: evoShortcut?.min_level,
    minAfection: evoShortcut?.min_affection,
    itemHeld: evoShortcut?.held_item,
    itemUsed: evoShortcut.item,
    minHappiness: evoShortcut?.min_happiness,
    genderCheck: evoShortcut?.gender,
    minBeauty: evoShortcut?.min_beauty,
    timeOfDay: evoShortcut?.time_of_day,
    overworldRain: evoShortcut?.needs_overworld_rain,
    knownMove: evoShortcut?.known_move,
    partySpecies: evoShortcut.party_species,
    partyType: evoShortcut.party_type,
    upsideDown: evoShortcut.turn_upside_down,
    tradeSpecies: evoShortcut.trade_species,
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
    return `${formatString(baseSpecies)} evolves to ${formatString(
      secondSpecies
    )} at level ${firstStageEvoMethods.minLevel?.toString() || "not known"}`;
  }

  if (
    triggerMethod === "trade" &&
    Object.values(firstStageEvoMethods).every((prop) => !prop)
  ) {
    return (
      `${formatString(baseSpecies)} evolves to ${formatString(
        secondSpecies
      )} from being traded` || "not known"
    );
  }

  if (
    //item evolution
    triggerMethod === "use-item" &&
    Object.values(
      sliceEvoMethods(firstStageEvoMethods, { itemUsed: true })
    ).every((prop) => !prop)
  ) {
    return `${formatString(baseSpecies)} evolves to ${formatString(
      secondSpecies
    )} from using a ${
      evoShortcut?.item?.name === undefined
        ? "unknown item"
        : formatString(evoShortcut.item.name)
    }`;
  }

  if (
    ///trade item evolution
    triggerMethod === "trade" &&
    Object.values(
      sliceEvoMethods(firstStageEvoMethods, { itemHeld: true })
    ).every((prop) => !prop)
  ) {
    return (
      `${formatString(baseSpecies)} evolves to ${formatString(
        secondSpecies
      )} from being traded holding the ${
        evoShortcut?.held_item?.name === undefined
          ? "unknown item"
          : formatString(evoShortcut.held_item.name)
      } 
      ` || "not known"
    );
  }

  if (
    ///trade species evolution
    triggerMethod === "trade" &&
    Object.values(
      sliceEvoMethods(firstStageEvoMethods, { tradeSpecies: true })
    ).every((prop) => !prop)
  ) {
    return (
      `${formatString(baseSpecies)} evolves to ${formatString(
        secondSpecies
      )} from being in a trade with ${
        evoShortcut?.trade_species?.name === undefined
          ? "unknown Pokemon"
          : formatString(evoShortcut?.trade_species?.name)
      } 
      ` || "not known"
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
      `${formatString(baseSpecies)} evolves to ${formatString(
        secondSpecies
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
    return `${formatString(baseSpecies)} evolves to ${formatString(
      secondSpecies
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
      `${formatString(baseSpecies)} evolves to ${formatString(
        secondSpecies
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
      `${formatString(baseSpecies)} evolves to ${formatString(
        secondSpecies
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
      sliceEvoMethods(firstStageEvoMethods, {
        genderCheck: true,
        minLevel: true,
      })
    ).every((prop) => !prop)
  ) {
    return (
      `${formatString(baseSpecies)} evolves to ${formatString(
        secondSpecies
      )} if they are ${
        evoShortcut.gender === 1 ? "female" : "male"
      } starting at ${evoShortcut.min_level}` || "not known"
    );
  }

  if (
    //party species based evolution
    triggerMethod === "level-up" &&
    Object.values(
      sliceEvoMethods(firstStageEvoMethods, { partySpecies: true })
    ).every((prop) => !prop)
  ) {
    return `${formatString(baseSpecies)} evolves to ${formatString(
      secondSpecies
    )} from leveling up and by having ${formatString(
      evoShortcut.party_species?.name === undefined
        ? "unknown Pokemon"
        : evoShortcut.party_species.name
    )} in the party`;
  }

  if (
    //party type based evolution
    triggerMethod === "level-up" &&
    Object.values(
      sliceEvoMethods(firstStageEvoMethods, { partyType: true, minLevel: true })
    ).every((prop) => !prop)
  ) {
    return `${formatString(baseSpecies)} evolves to ${formatString(
      secondSpecies
    )} starting at level ${evoShortcut.min_level} and by having ${formatString(
      evoShortcut.party_type?.name === undefined
        ? "unknown Pokemon type"
        : evoShortcut.party_type.name
    )} type Pokemon in the party`;
  }

  if (
    //upside down evolution
    triggerMethod === "level-up" &&
    Object.values(
      sliceEvoMethods(firstStageEvoMethods, {
        upsideDown: true,
        minLevel: true,
      })
    ).every((prop) => !prop)
  ) {
    return `${formatString(baseSpecies)} evolves to ${formatString(
      secondSpecies
    )} starting at level ${
      evoShortcut.min_level
    } by having the game device turned upside down`;
  }

  if (
    //stantlet evolution
    triggerMethod === "agile-style-move" &&
    Object.values(
      sliceEvoMethods(firstStageEvoMethods, { knownMove:true })
    ).every((prop) => !prop)
  ) {
    return `${formatString(baseSpecies)} evolves to ${formatString(
      secondSpecies
    )} from using ${
      evoShortcut?.known_move?.name === undefined
        ? "unknown move"
        : formatString(evoShortcut?.known_move?.name)
    } in agile style 20 times in Pokemon Arceus` ;
  }

  if (
    ///hardcoded gen 9 evolution
    triggerMethod === "other" &&
    (baseSpecies === "rellor" || baseSpecies === "bramblin")
  ) {
    return `${formatString(baseSpecies)} evolves into ${formatString(
      secondSpecies
    )} while outside of its Pokeball after walking 1000 steps when using the Let's Go feature`;
  }

  if (
    ///hardcoded gen 9 evolution
    triggerMethod === "other" &&
    baseSpecies === "finizen"
  ) {
    return `${formatString(baseSpecies)} evolves into ${formatString(
      secondSpecies
    )} while in a Union Circle Group starting at level 38.`;
  }

  if (
    ///hardcoded gen 9 evolution
    triggerMethod === "other" &&
    baseSpecies === "gimmighoul"
  ) {
    return `${formatString(baseSpecies)} evolves into ${formatString(
      secondSpecies
    )} from leveling up after obtaining 999 Gimmighoul Coins.`;
  } else return "";
}
