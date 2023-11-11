import styled from "styled-components";

export const DetailsPage = styled.div`

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


  @media only screen and (min-device-width: 769px) {
    margin-top: 20px;
    > div.searchMain > div {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: flex-end;
}
  }

  @media only screen and (max-device-width: 768px) and (orientation: portrait) {
    .searchMain {
      position: sticky;
      top: 0;
      padding-top: 10px;
      padding-bottom: 10px;
      z-index: 100;
      width: 100vw;
      background-color: rgb(164 234 123);
    }
  }
`