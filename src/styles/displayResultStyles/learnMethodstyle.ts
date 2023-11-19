import styled from "styled-components";
import IsDarkMode from "../isDarkModeInferface";

export const LearnMethodStyle = styled.div<IsDarkMode>`

  .learnMethodList {
    display: flex;
    justify-content: space-around;
    margin-top: 1px;
    

    > div {
      flex-grow: 1;
      text-align: center;
      padding: 10px;
      cursor: pointer;
      background-color: ${(props) => (props.isDarkMode ? "#50577A" : "rgb(164 234 123)")};
      transition: background-color 0.2s linear;
      opacity: 50%;

      &:hover { 
        opacity:80%;
      }
    }

    .selected {
      background-color: transparent;
      opacity: 100%;
    }
  }

  .moveList {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
  }

  .pokeMove {
    border-top: 1px solid black;
    padding: 5px;
    cursor: pointer;
  }

  @media only screen and (max-device-width: 768px) and (orientation: portrait) {
    max-width: 96vw;
  }

`;
