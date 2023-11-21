import styled from "styled-components";
import IsDarkMode from "../isDarkModeInferface";

export const EntireDetailPage = styled.div<IsDarkMode>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  background-color: ${(props) => (props.isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.4)")};
  padding: 1vw;
  color: ${(props) => (props.isDarkMode ? "#fff" : "#000")};
  transition: background-color 0.2s linear, color 0.2s linear;

  .pokeMoves {
    margin-top: 30px;
  }

  .smogonLink {
    background-color: ${(props) => (props.isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.4)")};
    border-radius: 5px;
    padding: 10px;
    font-weight: bold;
  }

  @media only screen and (min-device-width: 799px) {
    border-radius: 20px;
    
  }
`;
