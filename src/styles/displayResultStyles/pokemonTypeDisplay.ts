import styled from "styled-components";
import { colorTypes } from "../../components/colorTypes";

interface PokeTypeDisplayProps {
  type: string;
}

export const PokeTypeDisplay = styled.div<PokeTypeDisplayProps>`
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@500&family=Inter&family=Karla:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=VT323&display=swap');
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  font-family: 'VT323', monospace;
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
