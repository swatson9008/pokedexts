import styled from "styled-components";
import IsDarkMode from "../isDarkModeInferface";
import pokeballbg from '../../assets/pokeballbg.png'

export const EvolutionDisplay = styled.div<IsDarkMode>`
  display: flex;
  gap: 40px;
  img {
    height: 100px;
    width: 100px;
  }

  .monInfo {
    position: relative; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    padding-bottom: 5px;
    gap: 5px;

    > div {
      position: relative; 
      cursor: pointer;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url(${pokeballbg}) center/cover no-repeat;
        background-color: ${(props) => (props.isDarkMode ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 1)")};
        opacity: 0.20; 
        border-radius: 50px;
        z-index: -1;
        transition: background-color 0.2s linear, opacity 0.2s linear;

      }

      &:hover::before {
        opacity: 0.50;
      }

      img {
       
      }
    }

  @media only screen and (max-device-width: 768px) and (orientation: portrait) {
  }

  @media only screen and (min-device-width: 769px) {
    align-items: center;
  }
}
`;
