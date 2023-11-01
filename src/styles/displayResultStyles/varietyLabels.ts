import styled from "styled-components";

interface PokeVarietySwitch {
  isCurrentForm: boolean;
}

export const VarietyLabels = styled.div<PokeVarietySwitch>`
  font-weight: ${(props) => (props.isCurrentForm ? "bold" : "normal")};
  color: ${(props) => (props.isCurrentForm ? "white" : "black")};
  background-color: ${(props) => (props.isCurrentForm ? "#e05043" : "")};
  padding: 6px;
  border-radius: 10px;
  cursor: pointer;
`;
