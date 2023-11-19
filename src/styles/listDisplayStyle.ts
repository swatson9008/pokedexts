import styled from "styled-components";
import IsDarkMode from "./isDarkModeInferface";

export const PokemonListStyle = styled.div<IsDarkMode>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  background-color: ${(props) => (props.isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.4)")};
  color: ${(props) => (props.isDarkMode ? "#fff" : "#000")};
  transition: background-color 0.2s linear, color 0.2s linear;

  > div {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    height: 130px;
    width: 130px;
    image-rendering: pixelated;

    &:hover {
      background-color: rgba(255, 255, 255, 0.5);
      color: ${(props) => (props.isDarkMode ? "#000" : "")};
    }
  }

  @media only screen and (min-device-width: 769px) {
    width: 90vw;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 1vw;
    > div {
      flex-direction: column;
      padding: 5px;
      justify-content: flex-end;
    }
  }

  @media only screen and (max-device-width: 768px) and (orientation: portrait) {
    width: 100vw;
    > div {
      width: 90%;
      justify-content: space-evenly;
    }
  }
`;
