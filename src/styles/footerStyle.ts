import styled from "styled-components";

export const FooterBox = styled.div`
  color: #5e5e5e;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 15px;
  justify-content: center;
  align-items: center; /* Center horizontally */
  text-align: center;
  font-size: 13px;

  @media only screen and (max-device-width: 768px) and (orientation: portrait) {
    > span { 
        width: 90vw;
    }
  }
`;
