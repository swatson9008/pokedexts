import styled from "styled-components";

interface DoAbilitiesExist {
  abilitiesExist: boolean;
}

export const AbilitiesStyle = styled.div<DoAbilitiesExist>`
  display: ${({ abilitiesExist }) => (abilitiesExist ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > div {
    background-color: #f2b3e7;
    padding: 25px;
    border-radius: 25px;
    border: 1px solid #a6799e;

    > div {
      span {
        > span.abilityClass {
          font-weight: bold;
        }
      }
    }
  }

  @media only screen and (max-device-width: 768px) and (orientation: portrait) {
    width: 100vw;
    margin-top: 20px;
  }

  @media only screen and (min-device-width: 769px) {
    width: 35vw;
  }
`;
