import styled from "styled-components";
import IsDarkMode from "./isDarkModeInferface";

export const DetailsPage = styled.div<IsDarkMode>`

display: flex;
flex-direction: column;


> div.searchMain > div {
    display: flex;
    justify-content: center;
    align-items: center;
}

> div.searchMain > div > input {
    width: 250px;
}


  @media only screen and (min-width: 799px) {
    margin-top: 20px;
    > div.searchMain > div {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: flex-end;
}
  }

  @media only screen and (max-width: 800px) {
    .searchMain {
      position: sticky;
      top: 0;
      padding-top: 10px;
      padding-bottom: 10px;
      z-index: 100;
      background-color: ${(props) => (props.isDarkMode ? "#404258" : "rgb(164 234 123)")};
      transition: background 0.2s linear;
    }
  }
`