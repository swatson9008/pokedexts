import styled from "styled-components";
import { ButtonContainer } from "./normalButtons";
import IsDarkMode from "./isDarkModeInferface";

export const AlgoStyle = styled.div<IsDarkMode>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;

  position: sticky;
  top: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  z-index: 100;
  background-color: ${(props) => (props.isDarkMode ? "#404258" : "rgb(164 234 123)")};
  transition: background 0.2s linear;

  .sortBox {
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 100px;
    gap: 10px;
    width: fit-content;
    ${ButtonContainer} {
      flex: initial;
    }
  }

  .dropdownBox {
    display: flex;
  }

  .resetBox {
    ${ButtonContainer} {
      flex: initial;
    }
    margin-top: 10px;
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
