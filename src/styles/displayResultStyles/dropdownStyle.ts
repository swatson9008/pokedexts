import styled from "styled-components";
import IsDarkMode from "../isDarkModeInferface";

interface PokeVarietyDisplay {
  hasForms: boolean;
}

export const DropdownDisplay = styled.select<PokeVarietyDisplay & IsDarkMode>`
  display: ${(props) => (props.hasForms ? "flex" : "none")};
  color: ${(props) => (props.isDarkMode ? "white" : "black")};
  background-color: ${(props) => (props.isDarkMode ? "#404258" : "#f2b3e7")};
  border: ${(props) =>
    props.isDarkMode ? "1px solid #9e9b9e" : "1px solid #a6799e"};
  transition: background-color 0.2s linear;
  width: 90vw;
  height: 30px;
  border-radius: 10px;
  margin-bottom: 5px;

  @media only screen and (min-width: 799px) {
    display: none;
  }
`;

interface DropdownOptionProps {
  isDarkMode: boolean;
}

export const DropdownOption = styled.option<DropdownOptionProps>`

`;
