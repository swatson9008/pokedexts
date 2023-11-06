import styled from "styled-components";

export const TopAreaStyle = styled.div`
  display: grid;
  grid-gap: 20px;
  width: 90vw;
  margin-bottom: 40px;
  max-height: 100%;
  justify-items: center;
  align-items: center;

  @media only screen and (max-device-width: 768px) and (orientation: portrait) {
    grid-template-rows: auto auto;
  }

  @media only screen and (min-device-width: 769px) {
    grid-template-columns: auto auto;
  }
`;
