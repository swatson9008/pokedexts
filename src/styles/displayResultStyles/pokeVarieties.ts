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
  border: 1px solid #a6799e;
  padding: 10px;
  border-radius: 10px;
`;
