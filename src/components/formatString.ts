function formatString(input: string) {
  if (input === "machine") {
    input = "TM/HM";
  }
  if (input === "farfetchd"){input = "Farfetch'd"}
  if (input === "sirfetchd"){input = "Sirfetch'd"}
  if (input.startsWith("xd")) {
    input = input.substring(0, 2).toUpperCase() + input.substring(2);
  }
  const words = input.split("-");
  const formatted = words
    .map((word) => {
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(" ");
  return formatted;
}

function otherFormatString(input: string) {
  if (
    input.startsWith("tm") ||
    input.startsWith("hm") ||
    input.startsWith("tr")
  ) {
    input = input.substring(0, 2).toUpperCase() + input.substring(2);
    const words = input.split("-");
    for (let i = 1; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    const formatted = words.join(" ");
    return formatted;
  }
}

function getIDNo(input: string | undefined) {
  if (input === undefined){return ''}
  const urlParts = input.split("/");
  const lastPart = urlParts[urlParts.length - 2];

  return lastPart

}

function formatNames(searchPoke: string){
  if (searchPoke === "shaymin-land") {
    searchPoke = "shaymin";
}

if (searchPoke === "meowstic-male") {
    searchPoke = "meowstic";
}

if (searchPoke === "darmanitan-standard") {
    searchPoke = "darmanitan";
}

if (searchPoke === "deoxys-normal") {
    searchPoke = "deoxys";
}

if (searchPoke === "wormadam-plant") {
    searchPoke = "wormadam";
}

if (searchPoke === "giratina-altered") {
    searchPoke = "giratina";
}

if (searchPoke === "basculin-red-striped") {
    searchPoke = "basculin";
}

if (searchPoke === "basculegion-male") {
    searchPoke = "basculegion";
}

if (searchPoke === "tornadus-incarnate") {
    searchPoke = "tornadus";
}

if (searchPoke === "thundurus-incarnate") {
    searchPoke = "thundurus";
}

if (searchPoke === "landorus-incarnate") {
    searchPoke = "landorus";
}

if (searchPoke === "enamorus-incarnate") {
    searchPoke = "enamorus";
}

if (searchPoke === "keldeo-ordinary") {
    searchPoke = "keldeo";
}

if (searchPoke === "meloetta-aria") {
    searchPoke = "meloetta";
}

if (searchPoke === "aegislash-shield") {
    searchPoke = "aegislash";
}

if (searchPoke === "pumpkaboo-average") {
    searchPoke = "pumpkaboo";
}

if (searchPoke === "zygarde-50") {
    searchPoke = "zygarde";
}

if (searchPoke === "oricorio-baile") {
    searchPoke = "oricorio";
}

if (searchPoke === "lycanroc-midday") {
    searchPoke = "lycanroc";
}

if (searchPoke === "wishiwashi-solo") {
    searchPoke = "wishiwashi";
}

if (searchPoke === "minior-red-meteor") {
    searchPoke = "minior";
}

if (searchPoke === "mimikyu-disguised") {
    searchPoke = "mimikyu";
}

if (searchPoke === "toxtricity-amped") {
    searchPoke = "toxtricity";
}

if (searchPoke === "eiscue-ice") {
    searchPoke = "eiscue";
}

if (searchPoke === "indeedee-male") {
    searchPoke = "indeedee";
}

if (searchPoke === "morpeko-full-belly") {
    searchPoke = "morpeko";
}

if (searchPoke === "urshifu-single-strike") {
    searchPoke = "urshifu";
}
else {return searchPoke}
}

export { otherFormatString, formatString, getIDNo, formatNames };
