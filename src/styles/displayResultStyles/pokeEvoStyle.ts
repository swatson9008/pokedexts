import styled from "styled-components";

interface numberOfStages {
  stageNumber: number;
}

export const PokeEvoStyle = styled.div<numberOfStages>`
  img {
    image-rendering: pixelated;
  }
  margin-top: 20px;

  .pokeEvoChain {
    display: grid;
  }

  .baseEvo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .evoMethod {
    position: relative;
    background: #cfd4d5;
    border: 4px solid #cbf5cd;
    padding: 20px;
    max-width: 18vw;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    line-height: 1.3;
    

    &::before,
    &::after {
      top: 50%;
      border: solid transparent;
      content: "";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }

    &::after {
      border-color: rgba(207, 212, 213, 0);
      border-width: 30px;
      margin-top: -30px;
    }

    &::before {
      border-color: rgba(203, 245, 205, 0);
      border-width: 36px;
      margin-top: -36px;
    }

    > div { 
      background-color: rgba(255, 255, 255, 0.4);
      border-radius: 5px;
      padding: 5px;
    
    }
  }

  @media only screen and (max-device-width: 768px) and (orientation: portrait) {
    width: 100%;

    .firstStageEvo,
    .secondStageEvo {
      display: grid;
      gap: 20px;
      padding: 10px;
    }

    .secondStageEvo > div {
      flex-direction: row-reverse;
    }

    .evoMethod {
      max-width: fit-content;
    }

    .secondStageEvo > div > .evoMethod {
      &::before,
      &::after {
        right: 100%;
      }

      &::before {
        border-right-color: #cbf5cd;
      }

      &::after {
        border-right-color: #cfd4d5;
      }
    }

    .firstStageEvo > div > .evoMethod {
      &::before,
      &::after {
        left: 100%;
      }

      &::before {
        border-left-color: #cbf5cd;
      }

      &::after {
        border-left-color: #cfd4d5;
      }
    }
  }

  @media only screen and (min-device-width: 769px) {
    display: flex;
    justify-content: space-evenly;

    .pokeEvoChain {
      grid-template-columns: ${({ stageNumber }) => {
        if (stageNumber === 1) {
          return "1fr";
        } else if (stageNumber === 2) {
          return "1fr 2fr";
        } else if (stageNumber === 3) {
          return "1fr 2fr 2fr";
        }
      }};
      align-items: center;
      justify-items: center;
      width: 80%;
    }
    .baseEvo {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .firstStageEvo,
    .secondStageEvo {
      display: flex;
      flex-direction: column;
    }

    .firstStageEvo > div,
    .secondStageEvo > div {
      display: flex;
    }

    .firstStageEvo {
      grid-column: ${({ stageNumber }) => {
        if (stageNumber === 3) {
          return "";
        }
      }};
    }

    .evoMethod {
      grid-column: 1;
      grid-row: 1 / span 2;
      position: relative;
      background: #cfd4d5;
      border: 4px solid #cbf5cd;
      padding: 20px;
      max-width: 18vw;

      &::before,
      &::after {
        left: 100%;
      }

      &::after {
        border-left-color: #cfd4d5;
      }

      &::before {
        border-left-color: #cbf5cd;
      }
    }

    .evoArrows {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .monName {
      grid-column: 2;
      grid-row: 1 / span 2;
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }
`;
