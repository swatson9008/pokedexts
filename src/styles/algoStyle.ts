import styled from "styled-components";

export const AlgoStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .typeFilters {
    display: grid;
    width: 95vw;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 5px;
    width: 90vw;
    margin-top: 10px;
  }
`;
