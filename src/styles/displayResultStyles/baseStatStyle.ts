import styled from "styled-components";

interface BaseStatColors {}

export const BaseStatStyles = styled.div<BaseStatColors>`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > div.baseChart canvas {
    width: 500px;
    
  }
`;
