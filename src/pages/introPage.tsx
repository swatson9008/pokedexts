import SearchBox from "./searchBox"
import { HomeContainer } from "../styles/homePageMain"
import { TextIntroContainer } from "../styles/introDiv"
import RandomizedSpritesTemp from "../components/randomSpritesTemp"
import Footer from "./footer"

export default function IntroPage(){
    return(
     <HomeContainer>
        <RandomizedSpritesTemp/>
        <TextIntroContainer>
            Welcome to the simplified Pokedex. 
        </TextIntroContainer>
        <SearchBox />
        <Footer />
     </HomeContainer>   
    )
}