import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    background-color: rgb(164 234 123);
    height: 100%;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default Global;
