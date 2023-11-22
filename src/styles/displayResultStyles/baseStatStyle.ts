import styled from "styled-components";
import IsDarkMode from "../isDarkModeInferface";

export const BaseStatStyles = styled.div<IsDarkMode>`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 35vw;

  > div.baseChart {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    width: 100%; 
  }
  canvas {
    width: 100%; 
    height: 100%; 
  }

  @media only screen and (max-width: 799px) {
    width: 75vw;
    margin-left: 20%;

    .BST {
      margin-right: 20%;
    }

  }


  @media only screen and (min-width: 900px) {
    width: 35vw;
  }
`;