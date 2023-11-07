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

  @media only screen and (min-device-width: 769px) {
    .pokeEvoChain {
      grid-template-columns: ${({ stageNumber }) => {
        if (stageNumber === 1) {
          return "1fr";
        } else if (stageNumber === 2) {
          return "1fr 1fr 1fr";
        } else if (stageNumber === 3) {
          return "1fr 1fr 1fr 1fr 1fr";
        }
      }};
      align-items: center;
      justify-items: center;
      width: 80vw;
    }
    .baseEvo {
      display: grid;
      width: 80%;
      justify-content: end;
      justify-items: center;
    }

    .firstStageEvo > div,
    .secondStageEvo > div {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      grid-auto-flow: row dense;
      align-items: center;
      justify-items: center;
      padding: 10px;
    }

    .evoMethod {
      grid-column: 1;
      grid-row: 1 / span 2;
      position: relative;
      background: #cfd4d5;
      border: 4px solid #cbf5cd;
      padding: 20px;

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

    .monName {
      grid-column: 2;
      grid-row: 1 / span 2;
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }
`;
