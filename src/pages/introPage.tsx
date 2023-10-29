import SearchBox from "./searchBox";
import { HomeContainer } from "../styles/homePageMain";
import { TextIntroContainer } from "../styles/introDiv";
import RandomizedSpritesTemp from "../components/randomSpritesTemp";
import Footer from "./footer";
import GenerateTrainerSprite from "../components/generateTrainer";

export default function IntroPage() {
  return (
    <HomeContainer>
      <div className="spriteRow">
        <RandomizedSpritesTemp /> <GenerateTrainerSprite />
      </div>
      <TextIntroContainer>
        Welcome to the simplified Pokedex.
      </TextIntroContainer>
      <SearchBox />
      <Footer />
    </HomeContainer>
  );
}
