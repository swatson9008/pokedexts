const gen89Abilities: { [key: string]: string } = {
    "ball-fetch": "If the Pokémon is not holding an item, it will fetch the Poké Ball from the first failed throw of the battle.",
    "cotton-down": "When the Pokémon is hit by an attack, it scatters cotton fluff around and lowers the Speed stat of all Pokémon except itself.",
    "curious-medicine": "When the Pokémon is brought into battle, any stat alterations of allies are removed.",
    "dauntless-shield": "Boosts the Pokémon's Defense stat when the Pokémon enters a battle.",
    "dragons-maw": "Increases the damage inflicted by Dragon-type moves by 50%.",
    "gorilla-tactics": "Boosts the Pokémon's Attack stat but only allows the use of the first selected move.",
    "gulp-missile": "When the Pokémon uses Surf or Dive, it will come back with prey. When it takes damage, it will spit out the prey to attack.",
    "hunger-switch": "The Pokémon changes its form, alternating between its Full Belly Mode and Hangry Mode after the end of each turn.",
    "ice-face": "The Pokémon's ice head can take a physical attack as a substitute, but the attack also changes the Pokémon's appearance. The ice will be restored when it hails.",
    "ice-scales": "The Pokémon is protected by ice scales, which halve the damage taken from special moves.",
    "intrepid-sword": "Boosts the Pokémon's Attack stat when the Pokémon enters a battle.",
    "libero": "Changes the Pokémon's type to the type of the move it's about to use.",
    "mimicry": "Changes the Pokémon's type depending on the terrain.",
    "mirror-armor": "Bounces back only the stat-lowering effects that the Pokémon receives.",
    "neutralizing-gas": "If the Pokémon with Neutralizing Gas is in the battle, the effects of all Pokémon's Abilities will be nullified or will not be triggered.",
    "pastel-veil": "Protects the Pokémon and its ally Pokémon from being poisoned.",
    "perish-body": "When hit by a move that makes direct contact, the Pokémon and the attacker will faint after three turns unless they switch out of battle.",
    "power-spot": "Just being next to the Pokémon powers up moves.",
    "propeller-tail": "Ignores the effects of opposing Pokémon's Abilities and moves that draw in moves.",
    "punk-rock": "Boosts the power of sound-based moves. The Pokémon also takes half the damage from these kinds of moves.",
    "quick-draw": "At the start of each turn, this Pokémon has a 30% chance of moving first in the Speed Priority Bracket.",
    "ripen": "Ripens Berries and doubles their effect.",
    "sand-spit": "The Pokémon creates a sandstorm when it's hit by an attack.",
    "screen-cleaner": "When the Pokémon enters a battle, the effects of Light Screen, Reflect, and Aurora Veil are nullified for both opposing and ally Pokémon.",
    "stalwart": "Ignores the effects of opposing Pokémon's Abilities and moves that draw in moves.",
    "steam-engine": "Boosts the Pokémon's Speed stat drastically if hit by a Fire- or Water-type move.",
    "steely-spirit": "Powers up ally Pokémon's Steel-type moves.",
    "transistor": "Increases the damage inflicted by Electric-type moves by 50%.",
    "unseen-fist": "The Pokémon can deal damage with moves that make physical contact, even if the target is protected.",
    "wandering-spirit": "The Pokémon exchanges Abilities with a Pokémon that hits it with a move that makes direct contact.",
    "anger-shell": "When an attack causes its HP to drop to half or less, the Pokémon gets angry. This lowers its Defense and Sp. Def stats but boosts its Attack, Sp. Atk, and Speed stats.",
    "armor-tail": "The mysterious tail covering the Pokémon's head makes opponents unable to use priority moves against the Pokémon or its allies.",
    "beads-of-ruin": "The power of the Pokémon's ruinous beads lowers the Sp. Def stats of all Pokémon except itself.",
    "commander": "When the Pokémon enters a battle, it goes inside the mouth of an ally Dondozo if one is on the field. The Pokémon then issues commands from there.",
    "costar": "When the Pokémon enters a battle, it copies an ally's stat changes.",
    "cud-chew": "When the Pokémon eats a Berry, it will regurgitate that Berry at the end of the next turn and eat it one more time.",
    "earth-eater": "If hit by a Ground-type move, the Pokémon has its HP restored instead of taking damage.",
    "electromorphosis": "The Pokémon becomes charged when it takes damage, boosting the power of the next Electric-type move the Pokémon uses.",
    "embody-aspect-teal-mask": "The Pokémon's heart fills with memories, causing the Teal Mask to shine and the Pokémon's Speed stat to be boosted.",
    "embody-aspect-hearthflame-mask": "The Pokémon's heart fills with memories, causing the Hearthflame Mask to shine and the Pokémon's Attack stat to be boosted.",
    "embody-aspect-wellspring-mask": "The Pokémon's heart fills with memories, causing the Wellspring Mask to shine and the Pokémon's Sp. Def stat to be boosted.",
    "embody-aspect-cornerstone-mask": "The Pokémon's heart fills with memories, causing the Cornerstone Mask to shine and the Pokémon's Defense stat to be boosted.",
    "good-as-gold": "A body of pure, solid gold gives the Pokémon full immunity to other Pokémon's status moves.",
    "guard-dog": "Boosts the Pokémon's Attack stat if intimidated. Moves and items that would force the Pokémon to switch out also fail to work.",
    "hadron-engine": "Turns the ground into Electric Terrain when the Pokémon enters a battle. The futuristic engine within the Pokémon also boosts its Sp. Atk stat on Electric Terrain.",
    "hospitality": "Heals up to 25% of its partner Pokémon's Maximum Hit Points when it enters battle.",
    "lingering-aroma": "Contact with the Pokémon changes the attacker's Ability to Lingering Aroma.",
    "minds-eye": "The Pokémon ignores changes to opponents' evasiveness, its accuracy can't be lowered, and it can hit Ghost types with Normal- and Fighting-type moves.",
    "mycelium-might": "The Pokémon will always act more slowly when using status moves, but these moves will be unimpeded by the Ability of the target.",
    "opportunist": "If an opponent's stat is boosted, the Pokémon seizes the opportunity to boost the same stat for itself.",
    "orichalcum-pulse": "Turns the sunlight harsh when the Pokémon enters a battle. The ancient pulse thrumming through the Pokémon also boosts its Attack stat in harsh sunlight.",
    "protosynthesis": "Boosts the Pokémon's most proficient stat in harsh sunlight or if the Pokémon is holding Booster Energy.",
    "purifying-salt": "The Pokémon's pure salt protects it from status conditions and halves the damage taken from Ghost-type moves.",
    "quark-drive": "Boosts the Pokémon's most proficient stat on Electric Terrain or if the Pokémon is holding Booster Energy.",
    "rocky-payload": "Powers up Rock-type moves.",
    "seed-sower": "Turns the ground into Grassy Terrain when the Pokémon is hit by an attack.",
    "sharpness": "Powers up slicing moves.",
    "supreme-overlord": "When the Pokémon enters a battle, its Attack and Sp. Atk stats are slightly boosted for each of the allies in its party that have already been defeated.",
    "supersweet-syrup": "Lowers the evasion of opposing Pokémon by 1 stage when first sent into battle.",
    "sword-of-ruin": "The power of the Pokémon's ruinous sword lowers the Defense stats of all Pokémon except itself.",
    "tablets-of-ruin": "The power of the Pokémon's ruinous wooden tablets lowers the Attack stats of all Pokémon except itself.",
    "thermal-exchange": "Boosts the Attack stat when the Pokémon is hit by a Fire-type move. The Pokémon also cannot be burned.",
    "toxic-chain": "May badly poison the opponent when the user lands a move against them.",
    "toxic-debris": "Scatters poison spikes at the feet of the opposing team when the Pokémon takes damage from physical moves.",
    "vessel-of-ruin": "The power of the Pokémon's ruinous vessel lowers the Sp. Atk stats of all Pokémon except itself.",
    "well-baked-body": "The Pokémon takes no damage when hit by Fire-type moves. Instead, its Defense stat is sharply boosted.",
    "wind-power": "The Pokémon becomes charged when it is hit by a wind move, boosting the power of the next Electric-type move the Pokémon uses.",
    "wind-rider": "Boosts the Pokémon's Attack stat if Tailwind takes effect or if the Pokémon is hit by a wind move. The Pokémon also takes no damage from wind moves.",
    "zero-to-hero": "The Pokémon transforms into its Hero Form when it switches out."
  };

  export { gen89Abilities }