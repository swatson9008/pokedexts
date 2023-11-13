import styled from "styled-components";

export const EvolutionDisplay = styled.div`
  display: flex;
  gap: 40px;
  img {
    height: 100px;
    width: 100px;
  }

  .monInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media only screen and (max-device-width: 768px) and (orientation: portrait) {
  }

  @media only screen and (min-device-width: 769px) {
    align-items: center;
  }
`;
