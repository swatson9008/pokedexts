import { createGlobalStyle } from "styled-components";
import IsDarkMode from "./isDarkModeInferface";

export const Global = createGlobalStyle<IsDarkMode>`
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@500&family=Karla:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=VT323&display=swap');
  body {
    font-family: 'Barlow', sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    transition: background 0.2s linear;
    background-color: ${(props) =>
      props.isDarkMode ? "#404258" : "rgb(164 234 123)"};
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
