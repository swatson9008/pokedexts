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
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    > div {
      span {
        > span.abilityClass {
          font-weight: bold;
        }
      }
    }
  }
`;
