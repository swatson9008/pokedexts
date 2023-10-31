import styled from "styled-components";

interface PokeVarietySwitch {
  isCurrentForm: boolean;
}

export const VarietyLabels = styled.div<PokeVarietySwitch>`
  font-weight: ${(props) => (props.isCurrentForm ? "bold" : "normal")};
`;
