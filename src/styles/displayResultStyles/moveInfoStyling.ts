import styled from "styled-components";


export const MoveInfoStyle = styled.div`
  display: flex;
  flex-direction: column;

  img {
    margin-top: 5px;
    max-width: 60px;
  }

  @media only screen and (max-width: 799px) {
    padding: 5px;
    width: 80vw;
  }

`;
