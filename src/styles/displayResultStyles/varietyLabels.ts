import styled from "styled-components";
import IsDarkMode from "../isDarkModeInferface";

interface PokeVarietySwitch {
  isCurrentForm: boolean;
}

export const VarietyLabels = styled.div<PokeVarietySwitch & IsDarkMode>`
  position: relative;
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

  ${(props) =>
    !props.isCurrentForm &&
    props.isDarkMode &&
    `
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px; 
      background-color: #fff;
      transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
    }

    &:hover::before {
      width: 95%;
      left: auto;
      right: 3%;
    }
  `}
`;

export default VarietyLabels;
