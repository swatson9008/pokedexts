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

export { otherFormatString, formatString, getIDNo };
