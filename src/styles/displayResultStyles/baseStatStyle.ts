import styled from "styled-components";

export const BaseStatStyles = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 35vw;

  > div.baseChart {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    width: 100%; 
  }
  canvas {
    width: 100%; 
    height: 100%; 
  }

  @media only screen and (max-device-width: 768px) and (orientation: portrait) {
    width: 95vw;
  }

  @media only screen and (min-device-width: 769px) {
    width: 35vw;
  }
`;