import { LightDarkSwitchStyle } from "../styles/lightDarkSwitch";
("../styles/lightDarkSwitch");
import Reshiram from '../assets/reshiram.png'
import Zekrom from '../assets/zekrom.png'
import Pokeball from '../assets/pokeball.png'

interface LightDarkSwitchProps {
  onDarkModeChange: () => void;
  darkMode: boolean;
}

const LightDarkSwitch: React.FC<LightDarkSwitchProps> = ({ onDarkModeChange, darkMode }) => {
  const handleCheckboxChange = () => {
    onDarkModeChange();
  };

  return (
    <LightDarkSwitchStyle darkMode={darkMode}>
      <input
        type="checkbox"
        className="checkbox"
        id="checkbox"
        checked={darkMode}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="checkbox" className="label">
        <i className="spriteDark"><img src={Zekrom} alt="Zekrom"/></i>
        <i className="spriteLight"><img src={Reshiram} alt="Reshiram"/></i>
        <div className="ball"><img src={Pokeball} alt="Pokeball"/></div>
      </label>
    </LightDarkSwitchStyle>
  );
};

export default LightDarkSwitch;
