import styled from "styled-components";

export const PokemonListStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 1vw;

  > div {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    height: 130px;
    width: 130px;
    image-rendering: pixelated;

    &:hover {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }

  @media only screen and (min-device-width: 769px) {
    width: 90vw;
    flex-direction: row;
    flex-wrap: wrap;

    > div {
      flex-direction: column;
      padding: 5px;
      justify-content: flex-end;
    }
  }

  @media only screen and (max-device-width: 768px) and (orientation: portrait) {
    > div {
      width: 100%;
      justify-content: space-evenly;
    }
  }
`;
