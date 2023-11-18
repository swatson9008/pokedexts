import styled from "styled-components";
import IsDarkMode from "../isDarkModeInferface";

interface PokeVarietySwitch {
  isCurrentForm: boolean;
}

export const VarietyLabels = styled.div<PokeVarietySwitch & IsDarkMode>`
  font-weight: ${(props) => (props.isCurrentForm ? "bold" : "normal")};
  color: ${(props) => (props.isCurrentForm || props.isDarkMode ? "white" : "black")};
  background-color: ${(props) =>
    props.isCurrentForm && props.isDarkMode === true
      ? "#50577A"
      : props.isCurrentForm && props.isDarkMode === false
      ? "#e05043"
      : ""};
  padding: 6px;
  border-radius: 10px;
  cursor: pointer;
`;
