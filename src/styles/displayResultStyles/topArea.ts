import styled from "styled-components";

export const TopAreaStyle = styled.div`

display: grid;
grid-template-columns: auto auto auto; /* Create 3 equal-width columns */
  grid-gap: 20px; /* Add some gap between items */
  width: 80vw;

> div.mainPicture {
    padding: 25px;
}

> div.topInfoBox {
   display: flex;
   flex-direction: column;
   gap: 10px;
   justify-content: center;
   align-items: center;
   width: 20vw;

}

> div.topInfoBox > div {
    display: flex;
    gap: 5px;


}

`