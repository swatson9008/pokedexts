export default function formatString(input: string) {
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