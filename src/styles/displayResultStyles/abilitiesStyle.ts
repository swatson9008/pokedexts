import styled from "styled-components";
import IsDarkMode from "../isDarkModeInferface";

interface DoAbilitiesExist {
  abilitiesExist: boolean;
}

export const AbilitiesStyle = styled.div<DoAbilitiesExist & IsDarkMode>`
  display: ${({ abilitiesExist }) => (abilitiesExist ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > div {
    background-color: ${(props) => (props.isDarkMode ? "#474E68" : "#f2b3e7")};
    padding: 25px;
    border-radius: 25px;
    border: ${(props) => (props.isDarkMode ? "1px solid #9e9b9e" : "1px solid #a6799e")};
    transition: background-color 0.2s linear, border 0.2s linear;

    > div {
      span {
        > span.abilityClass {
          font-weight: bold;
        }
      }
    }
  }

  @media only screen and (max-width: 799px) {
    margin-top: 20px;
  }

  @media only screen and (min-width: 800px) {
    width: 35vw;
  }
`;
