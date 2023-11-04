import styled from "styled-components";

interface GameSwitch {
  isCurrentGame: boolean;
}

export const VarietyLabels = styled.div<GameSwitch>`
  font-weight: ${(props) => (props.isCurrentGame ? "bold" : "normal")};
  color: ${(props) => (props.isCurrentGame ? "white" : "black")};
  background-color: ${(props) => (props.isCurrentGame ? "#e05043" : "")};
  padding: 6px;
  border-radius: 10px;
  cursor: pointer;
`;
