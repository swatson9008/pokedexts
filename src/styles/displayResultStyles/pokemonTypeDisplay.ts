import styled from "styled-components";
import { colorTypes } from "../../components/colorTypes";

interface PokeTypeDisplayProps {
  type: string;
}

export const PokeTypeDisplay = styled.div<PokeTypeDisplayProps>`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  border: 2px solid black;
  width: 72px;
  padding: 3px;
  border-radius: 10px;
  color: white;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  background-color: ${(props) =>
    colorTypes[props.type as keyof typeof colorTypes] || "transparent"};
`;
