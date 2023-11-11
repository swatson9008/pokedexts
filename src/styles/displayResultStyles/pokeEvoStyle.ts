import styled from "styled-components";

interface numberOfStages {
  stageNumber: number;
}

export const PokeEvoStyle = styled.div<numberOfStages>`
  img {
    image-rendering: pixelated;
  }
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;

  .pokeEvoChain {
    display: grid;
  }

  .baseEvo {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    @media only screen and (max-device-width: 768px) and (orientation: portrait) {
      .firstStageEvo, .secondStageEvo {
    display: grid;
    gap: 20px;
    padding: 10px;

  }

  .secondStageEvo > div {
    flex-direction: row-reverse;
  }
  }

  @media only screen and (min-device-width: 769px) {
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
        border-left-color: #cfd4d5;
        border-width: 30px;
        margin-top: -30px;
      }

      &::before {
        border-color: rgba(203, 245, 205, 0);
        border-left-color: #cbf5cd;
        border-width: 36px;
        margin-top: -36px;
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
