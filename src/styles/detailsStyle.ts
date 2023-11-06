import styled from "styled-components";

export const DetailsPage = styled.div`

display: flex;
flex-direction: column;
margin-top: 20px;


> div.searchMain > div {
    display: flex;
    justify-content: center;
    align-items: flex-end;
}


  @media only screen and (min-device-width: 769px) {
    > div.searchMain > div {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: flex-end;
}
  }
`