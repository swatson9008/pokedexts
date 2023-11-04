import styled from "styled-components";

export const AbilitiesStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 29vw;

  > div {
    background-color: #f2b3e7;
    padding: 25px;
    border-radius: 25px;
    border: 1px solid #a6799e;


    > div {
      span {
        > span.abilityClass {
          font-weight: bold;
        }
      }
    }
  }
`;
