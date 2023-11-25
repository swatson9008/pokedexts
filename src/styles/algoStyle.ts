import styled from "styled-components";
import { ButtonContainer } from "./normalButtons";
import IsDarkMode from "./isDarkModeInferface";

export const AlgoStyle = styled.div<IsDarkMode>`
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@500&family=Inter&family=Karla:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=VT323&display=swap');
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  padding-bottom: 10px;
  z-index: 100;
  background-color: ${(props) =>
    props.isDarkMode ? "#404258" : "rgb(164 234 123)"};
  transition: background-color 0.2s linear;

  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: "";
  }

  .dropdownBox {
    display: flex;
    gap: 8px;

    > div > select {
      font-family: 'VT323', monospace;
      font-size: 12px;
      color: ${(props) =>
    props.isDarkMode ? "white" : "black"};
      background-color: ${(props) =>
        props.isDarkMode ? "#50577A" : "#e2bef7"};
      transition: background-color 0.2s linear color 0.2s linear;
      padding: 5px;

      &:focus {
        border-color: transparent;
      }
    }
  }

  .resetBox {
    ${ButtonContainer} {
      flex: initial;
    }
    margin-top: 10px;
  }

  @media only screen and (max-width: 799px) {
    .sortBox {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 10px;
      margin-top: 10px;
    }
  }

  @media only screen and (min-width: 800px) {
    .sortBox {
      display: flex;
      align-items: center;
      flex-direction: row;
      height: 50px;
      gap: 10px;
      width: fit-content;
      ${ButtonContainer} {
        flex: initial;
      }
    }
  }

  /*.typeFilters {
    display: grid;
    width: 100%;
    align-items: center;
    justify-items: center;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 5px;
    margin-top: 10px;

    > div {
      cursor: pointer;
    }
  }*/
`;
