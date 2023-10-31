import styled from "styled-components";

interface PokeTypeDisplayProps {
  type: string;
}

export const PokeTypeDisplay = styled.div<PokeTypeDisplayProps>`
  font-size: 18px;
  text-align: center;
  border: 2px solid black;
  padding: 3px;
  border-radius: 10px;
  color: white;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  background-color: ${(props) => {
    switch (props.type) {
      case "water":
        return "hsl(209.85deg 92.42% 58.63%)";
      case "poison":
        return "hsl(299.2deg 35.89% 40.98%)";
      case "bug":
        return "hsl(65.83deg 63.72% 44.31%)";
      case "dark":
        return "hsl(24.71deg 26.56% 25.1%)";
      case "dragon":
        return "hsl(43.13deg 95.73% 54.12%)";
      case "fairy":
        return "hsl(300deg 74.19% 81.76%)";
      case "fighting":
        return "hsl(13.33deg 65.56% 29.61%)";
      case "fire":
        return "hsl(13.72deg 88.84% 49.22%)";
      case "flying":
        return "hsl(229.73deg 54.15% 59.8%)";
      case "ghost":
        return "hsl(239.26deg 34.18% 53.53%)";
      case "grass":
        return "hsl(93.43deg 55.56% 50.59%)";
      case "ground":
        return "hsl(44.16deg 59.24% 58.63%)";
      case "ice":
        return "hsl(192.82deg 91.15% 77.84%)";
      case "normal":
        return "hsl(43.64deg 8.53% 74.71%)";
      case "psychic":
        return "hsl(339.75deg 80.3% 60.2%)";
      case "rock":
        return "hsl(45.47deg 40.77% 54.31%)";
      case "steel":
        return "hsl(243.75deg 11.43% 72.55%)";
      case "???":
        return "hsl(141.23deg 55.89% 57.16%)";
      default:
        return "transparent";
    }
  }};
`;
