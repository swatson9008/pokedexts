import styled from "styled-components";

interface BaseStatColors {}

export const BaseStatStyles = styled.div<BaseStatColors>`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 30vw;

  > div.baseChart {
    display: flex;
    flex: 1;
  }

  > div.BST {
    width: 100%;
    display: flex;

    justify-content: center;
  }
  canvas {
    width: 100%; 
    height: 100%;
  }
`;
