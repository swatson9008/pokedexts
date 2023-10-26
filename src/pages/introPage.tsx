import SearchBox from "./searchBox"
import { HomeContainer } from "../styles/homePageMain"

export default function IntroPage(){
    return(
     <HomeContainer>
        Enter a Pokemon's name
        <SearchBox />
     </HomeContainer>   
    )
}