import styled from "styled-components";

export const LearnMethodStyle = styled.div`
  .learnMethodList {
    display: flex;
    justify-content: space-around;
    margin-top: 1px;
    

    > div {
      flex-grow: 1;
      text-align: center;
      padding: 10px;
      cursor: pointer;
      background-color: rgb(164 234 123);
    }

    .selected {
      background-color: transparent;
    }
  }

  .moveList {
    display: flex;
    flex-direction: column;
  }
`;
