import styled from "styled-components";

export const TopAreaStyle = styled.div`

display: grid;
grid-template-columns: auto auto auto;
  grid-gap: 20px; 
  width: 90vw;
  margin-bottom: 40px;

> div.mainPicture {
    padding: 25px;
}

> div.topInfoBox {
   display: flex;
   flex-direction: column;
   gap: 10px;
   justify-content: center;
   align-items: center;
   width: 30vw;
   margin: auto; 

}

> div.topInfoBox > div {
    display: flex;
    gap: 5px;


}

`