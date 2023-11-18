import SearchBox from "./searchBox";
import { HomeContainer } from "../styles/homePageMain";
import { TextIntroContainer } from "../styles/introDiv";
import RandomizedSpritesTemp from "../components/randomSpritesTemp";
import { useDarkMode } from '../pages/darkModeContext';

export default function IntroPage() {
  const { isDarkMode } = useDarkMode();
  return (
    <HomeContainer>
        <RandomizedSpritesTemp />
      <TextIntroContainer isDarkMode={isDarkMode}>
        Welcome to the simplified Pokedex.
      </TextIntroContainer>
      <SearchBox />
    </HomeContainer>
  );
}
