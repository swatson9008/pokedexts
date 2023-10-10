export default function formatString(input: string) {
    if (input === "machine"){input = "TM/HM"}
    if (input.startsWith("tm") || input.startsWith("hm") || input.startsWith("tr") || input.startsWith("xd")) {
      input = input.substring(0, 2).toUpperCase() + input.substring(2);
      const words = input.split("-");
      for (let i = 1; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
      }
      const formatted = words.join(" ");
      return formatted
      
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