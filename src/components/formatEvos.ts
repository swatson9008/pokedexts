import { EvolutionChain, EvolutionDetail } from "pokenode-ts";
import { formatString } from "./formatString";

export default function formatEvos(
  evolutionChain: EvolutionChain,
  stage: string,
  indexValue: number,
  multipleValue: number
) {
  let triggerMethod;

  let evoShortcut: EvolutionDetail;

  let baseSpecies: string;

  let secondSpecies;

  if (stage === "first") {
    triggerMethod =
      evolutionChain.chain.evolves_to[indexValue].evolution_details[
        multipleValue
      ].trigger.name;

    evoShortcut =
      evolutionChain.chain.evolves_to[indexValue].evolution_details[
        multipleValue
      ];

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
    // Tyrogue check
    triggerMethod === "level-up" &&
    Object.values(sliceEvoMethods(evoMethods, { minLevel: true })).every(
      (prop) => !prop && baseSpecies === "tyrogue"
    )
  ) {
    return `${formatString(baseSpecies)} evolves to ${formatString(
      secondSpecies
    )} at level ${evoMethods.minLevel?.toString()} ${
      secondSpecies === "hitmonlee"
        ? "if its Attack stat is greater than its Defense"
        : secondSpecies === "hitmonchan"
        ? "if its Defense stat is greater than its Attack"
        : "if its Attack and Defense stats are equal"
     || "not known"}`;
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
    //item gender specific evolution
    triggerMethod === "use-item" &&
    Object.values(sliceEvoMethods(evoMethods, { itemUsed: true, genderCheck: true })).every(
      (prop) => !prop
    )
  ) {
    return `${formatString(baseSpecies)} evolves to ${formatString(
      secondSpecies
    )} from using a ${
      evoShortcut?.item?.name === undefined
        ? "unknown item"
        : formatString(evoShortcut.item.name)
    } if they are ${
      evoShortcut.gender === 1 ? "female" : "male"
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
      )} from being traded while holding the ${
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
    ///time of day + item held evolution
    triggerMethod === "level-up" &&
    Object.values(
      sliceEvoMethods(evoMethods, { timeOfDay: true, itemHeld: true })
    ).every((prop) => !prop)
  ) {
    return (
      `${formatString(baseSpecies)} evolves to ${formatString(
        secondSpecies
      )} from leveling up during the ${evoShortcut.time_of_day}time 
       ${
         evoShortcut.min_level === null
           ? ""
           : `starting at level ${evoShortcut.min_level}`
       } while holding a ${
        evoShortcut.held_item?.name === undefined
          ? "unknown item "
          : formatString(evoShortcut.held_item?.name)
      }` || "not known"
    );
  }

  if (
    ///time of day + item used evolution
    triggerMethod === "use-item" &&
    Object.values(
      sliceEvoMethods(evoMethods, { timeOfDay: true, itemUsed: true })
    ).every((prop) => !prop)
  ) {
    return (
      `${formatString(baseSpecies)} evolves to ${formatString(
        secondSpecies
      )} from leveling up during the ${evoShortcut.time_of_day}time 
       ${
         evoShortcut.min_level === null
           ? ""
           : `starting at level ${evoShortcut.min_level}`
       } when exposed to ${
        evoShortcut.item?.name === undefined
          ? "unknown item "
          : formatString(evoShortcut.item?.name) ?? "unknown item"
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
    Object.values(sliceEvoMethods(evoMethods, { location: true })).every(
      (prop) => !prop
    )
  ) {
    return `${formatString(baseSpecies)} evolves to ${formatString(
      secondSpecies
    )} when leveling up at ${
      evoMethods?.location === undefined
        ? "unknown location"
        : formatString(evoMethods.location?.name === undefined ? "" : evoMethods.location?.name)
    }`;
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
    //sylveon mk2 evolution
    triggerMethod === "level-up" &&
    Object.values(
      sliceEvoMethods(evoMethods, { knownMoveType: true, minHappiness: true })
    ).every((prop) => !prop)
  ) {
    return `${formatString(baseSpecies)} evolves to ${formatString(
      secondSpecies
    )} knowing a ${
      evoShortcut?.known_move_type?.name === undefined
        ? "unknown"
        : evoShortcut.known_move_type.name
    } type move at high friendship`;
  }

  if (
    //feebas evolution
    triggerMethod === "level-up" &&
    Object.values(sliceEvoMethods(evoMethods, { minBeauty: true })).every(
      (prop) => !prop
    )
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
    //rain evolution
    triggerMethod === "level-up" &&
    Object.values(
      sliceEvoMethods(evoMethods, {
        overworldRain: true,
        minLevel: true,
      })
    ).every((prop) => !prop)
  ) {
    return `${formatString(baseSpecies)} evolves to ${formatString(
      secondSpecies
    )} starting at level ${evoShortcut.min_level} during rain or fog.`;
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
    //recoil evolution
    triggerMethod === "recoil-damage" &&
    baseSpecies === "basculin"
  ) {
    return `${formatString(baseSpecies)} evolves to ${formatString(
      secondSpecies
    )} after losing at least 294HP from recoil damage without fainting and is the white stripe variant`;
  }

  if (
    //shedninja evolution
    triggerMethod === "shed"
  ) {
    return `${formatString(baseSpecies)} evolves to ${formatString(
      secondSpecies
    )} when evolving into Ninjask if there is space in the party and a Pokeball in the bag`;
  }

  if (
    ///hardcoded gen 8 evolution
    triggerMethod === "three-critical-hits"
  ) {
    return `${formatString(baseSpecies)} evolves into ${formatString(
      secondSpecies
    )} after landing three critical hits in a single battle`;
  }

  if (
    ///hardcoded gen 8 evolution
    triggerMethod === "tower-of-darkness" ||
    triggerMethod === "tower-of-waters"
  ) {
    return `${formatString(baseSpecies)} evolves into ${formatString(
      secondSpecies
    )} after being exposed to the ${formatString(triggerMethod)}`;
  }

  if (
    ///hardcoded gen 8 evolution
    triggerMethod === "spin"
  ) {
    return `${formatString(baseSpecies)} evolves into ${formatString(
      secondSpecies
    )} after spinning in the overworld`;
  }

  if (
    ///hardcoded gen 8 evolution
    triggerMethod === "take-damage"
  ) {
    return `${formatString(baseSpecies)} evolves into ${formatString(
      secondSpecies
    )} after taking 49 damage and traveling under the rock arch in Dusty Bowl`;
  }

  if (
    ///hardcoded gen 9 evolution
    triggerMethod === "other" &&
    (baseSpecies === "rellor" || baseSpecies === "bramblin" || baseSpecies === "pawmo")
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
    baseSpecies === "tandemaus"
  ) {
    return `${formatString(baseSpecies)} evolves into ${formatString(
      secondSpecies
    )} starting at level 25.`;
  }


  if (
    ///hardcoded gen 9 evolution
    triggerMethod === "other" &&
    baseSpecies === "primeape"
  ) {
    return `${formatString(baseSpecies)} evolves into ${formatString(
      secondSpecies
    )} after using Rage Fist 20 times.`;
  }

  if (
    ///hardcoded gen 9 evolution
    triggerMethod === "other" &&
    baseSpecies === "gimmighoul"
  ) {
    return `${formatString(baseSpecies)} evolves into ${formatString(
      secondSpecies
    )} from leveling up after obtaining 999 Gimmighoul Coins.`;
  } 

  if (
    ///hardcoded gen 9 evolution
    triggerMethod === "other" &&
    baseSpecies === "bisharp"
  ) {
    return `${formatString(baseSpecies)} evolves into ${formatString(
      secondSpecies
    )} from defeating three Bisharp that hold a Leader's Crest.`;
  } 

  if (
    ///hardcoded gen 9 evolution
    baseSpecies === "poltchageist"
  ) {
    return `${formatString(baseSpecies)} evolves into ${formatString(
      secondSpecies
    )} using an Unremarkable Teacup or Masterpiece Teacup.`;
  } 

else return "";
}


