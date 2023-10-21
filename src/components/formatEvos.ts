import { EvolutionChain } from "pokenode-ts";
import { formatString } from "./formatString";

export default function formatEvos(
  evolutionChain: EvolutionChain,
  stage: string,
  indexValue: number,
  multipleValue: number
) {
  let triggerMethod;

  let evoShortcut;

  let baseSpecies;

  let secondSpecies;

  if (stage === "first") {
    triggerMethod =
      evolutionChain.chain.evolves_to[indexValue].evolution_details[multipleValue].trigger
        .name;

    evoShortcut =
      evolutionChain.chain.evolves_to[indexValue].evolution_details[multipleValue];

    baseSpecies = evolutionChain.chain.species.name;

    secondSpecies = evolutionChain.chain.evolves_to[indexValue].species.name;
  } else if (stage === "second") {
    triggerMethod =
      evolutionChain.chain.evolves_to[0].evolves_to[indexValue]
        .evolution_details[multipleValue].trigger.name;
    evoShortcut =
      evolutionChain.chain.evolves_to[0].evolves_to[indexValue]
        .evolution_details[multipleValue];
    baseSpecies = evolutionChain.chain.evolves_to[0].species.name;
    secondSpecies =
      evolutionChain.chain.evolves_to[0].evolves_to[indexValue].species.name;
  } else {
    return "";
  }

  const evoMethods = {
    minLevel: evoShortcut?.min_level,
    minAfection: evoShortcut?.min_affection,
    itemHeld: evoShortcut?.held_item,
    itemUsed: evoShortcut?.item,
    location: evoShortcut?.location,
    minHappiness: evoShortcut?.min_happiness,
    minAffection: evoShortcut?.min_affection,
    genderCheck: evoShortcut?.gender,
    minBeauty: evoShortcut?.min_beauty,
    timeOfDay: evoShortcut?.time_of_day,
    overworldRain: evoShortcut?.needs_overworld_rain,
    knownMove: evoShortcut?.known_move,
    knownMoveType: evoShortcut?.known_move_type,
    partySpecies: evoShortcut?.party_species,
    partyType: evoShortcut?.party_type,
    upsideDown: evoShortcut?.turn_upside_down,
    tradeSpecies: evoShortcut?.trade_species,
  };

  function sliceEvoMethods(
    obj: typeof evoMethods,
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
    Object.values(sliceEvoMethods(evoMethods, { minLevel: true })).every(
      (prop) => !prop
    )
  ) {
    return `${formatString(baseSpecies)} evolves to ${formatString(
      secondSpecies
    )} at level ${evoMethods.minLevel?.toString() || "not known"}`;
  }

  if (
    triggerMethod === "trade" &&
    Object.values(evoMethods).every((prop) => !prop)
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
    Object.values(sliceEvoMethods(evoMethods, { itemUsed: true })).every(
      (prop) => !prop
    )
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
    Object.values(sliceEvoMethods(evoMethods, { itemHeld: true })).every(
      (prop) => !prop
    )
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
    Object.values(sliceEvoMethods(evoMethods, { tradeSpecies: true })).every(
      (prop) => !prop
    )
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
    Object.values(sliceEvoMethods(evoMethods, { minHappiness: true })).every(
      (prop) => !prop
    )
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
    Object.values(sliceEvoMethods(evoMethods, { knownMove: true })).every(
      (prop) => !prop
    )
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
      sliceEvoMethods(evoMethods, { timeOfDay: true, minLevel: true })
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
    ///time of day friendship evolution
    triggerMethod === "level-up" &&
    Object.values(
      sliceEvoMethods(evoMethods, { timeOfDay: true, minHappiness: true })
    ).every((prop) => !prop)
  ) {
    return (
      `${formatString(baseSpecies)} evolves to ${formatString(
        secondSpecies
      )} from leveling up during the ${
        evoShortcut.time_of_day
      }time at high friendship` || "not known"
    );
  }

  if (
    ///time of day + item evolution
    triggerMethod === "level-up" &&
    Object.values(
      sliceEvoMethods(evoMethods, { timeOfDay: true, itemHeld: true })
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
      sliceEvoMethods(evoMethods, {
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
    Object.values(sliceEvoMethods(evoMethods, { partySpecies: true })).every(
      (prop) => !prop
    )
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
    //location based evolution
    triggerMethod === "level-up" &&
    Object.values(
      sliceEvoMethods(evoMethods, { location: true })
    ).every((prop) => !prop)
  ) {
    return `${formatString(baseSpecies)} evolves to ${formatString(
      secondSpecies
    )} when leveling up at ${evoMethods?.location === undefined ? "unknown location" : formatString(evoMethods.location?.name)}`;
  }

  if (
    //party type based evolution
    triggerMethod === "level-up" &&
    Object.values(
      sliceEvoMethods(evoMethods, { partyType: true, minLevel: true })
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
    //sylveon evolution
    triggerMethod === "level-up" &&
    Object.values(
      sliceEvoMethods(evoMethods, { knownMoveType: true, minAffection: true })
    ).every((prop) => !prop)
  ) {
    return `${formatString(baseSpecies)} evolves to ${formatString(
      secondSpecies
    )} knowing a ${
      evoShortcut?.known_move_type?.name === undefined
        ? "unknown"
        : evoShortcut.known_move_type.name
    } type move at high affection`;
  }

  if (
    //feebas evolution
    triggerMethod === "level-up" &&
    Object.values(
      sliceEvoMethods(evoMethods, { minBeauty: true })
    ).every((prop) => !prop)
  ) {
    return `${formatString(baseSpecies)} evolves to ${formatString(
      secondSpecies
    )} with a high beauty stat`;
  }

  if (
    //upside down evolution
    triggerMethod === "level-up" &&
    Object.values(
      sliceEvoMethods(evoMethods, {
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
    //stantler evolution
    triggerMethod === "agile-style-move" &&
    Object.values(sliceEvoMethods(evoMethods, { knownMove: true })).every(
      (prop) => !prop
    )
  ) {
    return `${formatString(baseSpecies)} evolves to ${formatString(
      secondSpecies
    )} from using ${
      evoShortcut?.known_move?.name === undefined
        ? "unknown move"
        : formatString(evoShortcut?.known_move?.name)
    } in agile style 20 times in Pokemon Arceus`;
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
