import styled from "styled-components";

interface PokeVarietyDisplay {
    hasForms: boolean;
  }

export const PokeVarieties = styled.div <PokeVarietyDisplay>`
  display: ${props => (props.hasForms ? "flex" : "none")};
  justify-items: center;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #f2b3e7;
  padding: 10px;
  border-radius: 10px;
`;
