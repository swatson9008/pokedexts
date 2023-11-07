import styled from "styled-components";

export const EntireDetailPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 1vw;

  .pokeMoves {
    margin-top: 30px;
  }

  @media only screen and (min-device-width: 769px) {
    border-radius: 20px;
    .pokeMoves {
      width: 60%;
    }
  }
`;
