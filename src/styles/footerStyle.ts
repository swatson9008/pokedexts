import styled from "styled-components";
import IsDarkMode from "./isDarkModeInferface";

export const FooterBox = styled.div<IsDarkMode>`
  transition: color 0.2s linear;
  color: ${(props) =>
    props.isDarkMode ? "#c9c9c9" : "#5e5e5e"};
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 15px;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 13px;

  @media only screen and (max-width: 799px) {
    > span {
      width: 90vw;
    }
  }
`;
