import styled from "styled-components";
import IsDarkMode from "./isDarkModeInferface";

export const FooterBox = styled.div<IsDarkMode>`
box-sizing: border-box;
  transition: color 0.2s linear;
  color: ${(props) => (props.isDarkMode ? "#c9c9c9" : "#5e5e5e")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 13px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 15px;

  @media only screen and (max-width: 799px) {
    > span {
      width: 90vw;
    }
  }
`;
