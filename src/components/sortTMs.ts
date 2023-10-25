export default function customSort(a: string, b: string) {
    const isTmA = a.startsWith("TM");
    const isTmB = b.startsWith("TM");

    if (isTmA && !isTmB) {
      return 1;
    } else if (!isTmA && isTmB) {
      return -1;
    } else if (isTmA && isTmB) {
      const tmNumberA = parseInt(a.slice(2));
      const tmNumberB = parseInt(b.slice(2));
      return tmNumberA - tmNumberB;
    } else {
      const firstTwoLettersA = a.slice(0, 2);
      const firstTwoLettersB = b.slice(0, 2);

      if (firstTwoLettersA === firstTwoLettersB) {
        return parseInt(a.slice(2)) - parseInt(b.slice(2));
      } else {
        return firstTwoLettersB.localeCompare(
          firstTwoLettersA,
          undefined,
          { numeric: true }
        );
      }
    }
  }