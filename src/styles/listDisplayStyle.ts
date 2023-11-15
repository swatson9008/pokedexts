import styled from "styled-components";

export const PokemonListStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  background-color: rgba(255, 255, 255, 0.4);
  width: 90vw;
  padding: 1vw;

  > div {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    height: 100px;

    &:hover{
        background-color: rgba(255, 255, 255, 0.5);
    }
  }


`;
