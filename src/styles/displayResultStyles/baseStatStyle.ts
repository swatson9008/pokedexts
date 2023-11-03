import styled from "styled-components";

interface BaseStatColors {}

export const BaseStatStyles = styled.div<BaseStatColors>`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30vw;

  > div.baseChart {
    display: flex;
    flex: 1; /* Allow the chart to grow and stretch */
  }

  canvas {
    width: 100%; /* Make the canvas take 100% of the available width */
  }
`;
