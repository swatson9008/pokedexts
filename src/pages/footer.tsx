import { FooterBox } from "../styles/footerStyle";
import isDarkMode from "../styles/isDarkModeInferface";

const Footer: React.FC<isDarkMode> = ({ isDarkMode }) => {
  return (
    <FooterBox isDarkMode={isDarkMode}>
      <span>Created by Summer</span>
      <span>
        Pokémon © 1995-2023 Nintendo/Creatures Inc./GAME FREAK inc. TM
      </span>
    </FooterBox>
  );
};

export default Footer;
