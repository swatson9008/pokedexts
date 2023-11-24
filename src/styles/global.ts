import { createGlobalStyle } from "styled-components";
import IsDarkMode from "./isDarkModeInferface";

export const Global = createGlobalStyle<IsDarkMode>`
  body {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    transition: background 0.2s linear;
    background-color: ${(props) => (props.isDarkMode ? "#404258" : "rgb(164 234 123)")};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    image-rendering: -webkit-optimize-contrast;
  }

  @media only screen and (min-width: 799px) {
    body {
      align-items: center;
    }
  }
`;

