import styled from "styled-components";
import IsDarkMode from "../isDarkModeInferface";

export const EntireDetailPage = styled.div<IsDarkMode>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  background-color: ${(props) => (props.isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.4)")};
  padding: 1vw;

  .pokeMoves {
    margin-top: 30px;
  }

  @media only screen and (min-device-width: 769px) {
    border-radius: 20px;
    .pokeMoves {
      width: 60%;
    }
  }
`;
