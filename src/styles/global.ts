import { createGlobalStyle } from "styled-components";
import isDarkMode from "./isDarkModeInferface";

const Global = createGlobalStyle<isDarkMode>`
  body {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    transition: background 0.2s linear;
    background-color: ${(props) => (props.darkMode ? "#292c35" : "rgb(164 234 123)")};
    height: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  @media only screen and (min-device-width: 769px) {
    body {
      align-items: center;
    }
  }
`;

export default Global;
