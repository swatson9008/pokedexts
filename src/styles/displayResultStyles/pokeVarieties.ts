import styled from "styled-components";
import IsDarkMode from "../isDarkModeInferface";

interface PokeVarietyDisplay {
    hasForms: boolean;
  }

export const PokeVarieties = styled.div <PokeVarietyDisplay & IsDarkMode>`
  display: ${props => (props.hasForms ? "flex" : "none")};
  background-color: ${(props) => (props.isDarkMode ? "#404258" : "#f2b3e7")};
  border: ${(props) => (props.isDarkMode ? "1px solid #9e9b9e" : "1px solid #a6799e")};
  transition: background-color 0.2s linear;
  justify-items: center;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;


  @media only screen and (min-width: 799px) {
    width: 60vw;
  }

  @media only screen and (max-width: 800px) {
    display: none;
    width: 90vw;
  }
`;
