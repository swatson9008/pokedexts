export default function generationConverter(generation: string){
    if (generation === "red-blue" || generation === "yellow") {
        generation = "rb";
      }
      if (generation === "gold-silver" || generation === "crystal") {
        generation = "gs";
      }
      if (
        generation === "ruby-sapphire" ||
        generation === "emerald" ||
        generation === "firered-leafgreen" ||
        generation === "colosseum" ||
        generation === "xd"
      ) {
        generation = "rs";
      }
      if (
        generation === "diamond-pearl" ||
        generation === "platinum" ||
        generation === "heartgold-soulsilver"
      ) {
        generation = "dp";
      }
      if (generation === "black-white" || generation === "black-2-white-2") {
        generation = "bw";
      }
      if (generation === "x-y" || generation === "omega-ruby-alpha-sapphire") {
        generation = "xy";
      }
      if (
        generation === "sun-moon" ||
        generation === "ultra-sun-ultra-moon" ||
        generation === "lets-go-pikachu-lets-go-eevee"
      ) {
        generation = "sm";
      }
      if (
        generation === "sword-shield" ||
        generation === "brilliant-diamond-and-shining-pearl"
      ) {
        generation = "ss";
      }
      if (generation === "scarlet-violet") {
        generation = "sv";
      }

      return generation

}