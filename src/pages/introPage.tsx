import SearchBox from "./searchBox"
import { HomeContainer } from "../styles/homePageMain"
import { TextIntroContainer } from "../styles/introDiv"
import RandomizedSprites from "../components/randomizedSprites"

export default function IntroPage(){
    return(
     <HomeContainer>
        <RandomizedSprites/>
        <TextIntroContainer>
            Welcome to the simplified Pokedex. 
        </TextIntroContainer>
        <SearchBox />
     </HomeContainer>   
    )
}