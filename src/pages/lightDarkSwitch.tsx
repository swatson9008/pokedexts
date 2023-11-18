import React from 'react';
import { LightDarkSwitchStyle } from '../styles/lightDarkSwitch';
import Reshiram from '../assets/reshiram.png';
import Zekrom from '../assets/zekrom.png';
import Pokeball from '../assets/pokeball.png';
import { useDarkMode } from '../pages/darkModeContext';

const LightDarkSwitch: React.FC = () => {
  const { isDarkMode, handleDarkModeChange } = useDarkMode();

  const handleCheckboxChange = () => {
    handleDarkModeChange();
  };

  return (
    <LightDarkSwitchStyle darkMode={isDarkMode}>
      <input
        type="checkbox"
        className="checkbox"
        id="checkbox"
        checked={isDarkMode}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="checkbox" className="label">
        <i className="spriteDark"><img src={Zekrom} alt="Zekrom" /></i>
        <i className="spriteLight"><img src={Reshiram} alt="Reshiram" /></i>
        <div className="ball"><img src={Pokeball} alt="Pokeball" /></div>
      </label>
    </LightDarkSwitchStyle>
  );
};

export default LightDarkSwitch;
