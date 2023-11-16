import styled from "styled-components";
import { ButtonContainer } from "./normalButtons";

export const AlgoStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  width: 90vw;

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

  .resetBox{
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
