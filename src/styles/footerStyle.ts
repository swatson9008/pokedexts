import styled from "styled-components";
import isDarkMode from "./isDarkModeInferface";

export const FooterBox = styled.div<isDarkMode>`
  transition: color 0.2s linear;
  color: ${(props) =>
    props.darkMode ? "#c9c9c9" : "#5e5e5e"};
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 15px;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 13px;

  @media only screen and (max-device-width: 768px) and (orientation: portrait) {
    > span {
      width: 90vw;
    }
  }
`;
