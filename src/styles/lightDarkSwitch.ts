import styled from 'styled-components';

interface LightDarkSwitchStyleProps {
  darkMode: boolean;
}

export const LightDarkSwitchStyle = styled.div<LightDarkSwitchStyleProps>`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  * {
    box-sizing: border-box;
  }

  body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    transition: background 0.2s linear;
    background-color: ${(props) => (props.darkMode ? '#292c35' : '#fff')};
    color: ${(props) => (props.darkMode ? '#fff' : '#000')};
  }


  .checkbox {
    opacity: 0;
    position: absolute;
  }

  .label {
    background-color: ${(props) => (props.darkMode ? "#14151a" : "#d9d9d9")};
    transition: background 0.2s linear;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    border-radius: 50px;
    position: relative;
    height: 36px;
    width: 70px;
  }

  .ball {
    background-color: #fff;
    position: absolute;
    border-radius: 50%;
    top: 1px;
    left:1px;
    height: 34px;
    width: 34px;
    transition: transform 0.2s linear;
  }

  .checkbox:checked + .label .ball {
    transform: translateX(34px); 
  }

  .spriteDark img, .spriteLight img {
    width: 27px;
  }

  .ball img {
    width: 34px;
  }

  .fa-moon {
    color: #f1c40f;
  }

  .fa-sun {
    color: #f39c12;
  }
`;

