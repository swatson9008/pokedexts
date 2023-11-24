// RandomSpriteStyle.js
import styled, { keyframes } from "styled-components";

const fadeInOut = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  20% {
    opacity: 1;
    transform: translateX(0);
  }
  80% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(20px);
  }
`;

export const RandomSpriteSlide = styled.div`
  position: relative;
  animation: ${fadeInOut} 5s linear infinite; 
  height: 100px;
`;

export const Image = styled.img`

`;
