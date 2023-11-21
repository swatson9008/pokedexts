import styled from "styled-components";

export const TopAreaStyle = styled.div`
  display: flex;
  gap: 20px;
  width: 90vw;
  margin-top: 20px;
  margin-bottom: 40px;
  max-height: 100%;
  justify-items: center;
  justify-content: space-around;
  align-items: center;

  @media only screen and (max-width: 799px) {
    flex-direction: column;
  }

  @media only screen and (min-width: 800px) {
    
  }
`;
