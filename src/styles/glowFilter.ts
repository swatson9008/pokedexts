import styled from "styled-components";

interface glow {
  isSelected: boolean;
}

export const GlowFilter = styled.div<glow>`
  > div {
    border: ${(props) => (props.isSelected ? "2px solid blue" : "2px solid black")};
  }
`;
