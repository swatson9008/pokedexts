export default function formatString(input: string) {
    if (input === "machine"){input = "TM/HM"}
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