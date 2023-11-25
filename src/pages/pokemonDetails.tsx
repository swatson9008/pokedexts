import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DisplayResults from "./displayResults";
import SearchBox from "./searchBox";
import Search from "../components/search";
import { PokemonData } from "../components/pokemonData";
import { getIDNo } from "../components/formatString";
import { DetailsPage } from "../styles/detailsStyle";
import { useDarkMode } from "./darkModeContext";
import loadingShake from '../assets/pokeShake.gif' 

export default function PokemonDetails() {
  const { name } = useParams<{ name: string }>() ?? { name: '' };
  const [pokemonDetails, setPokemonDetails] = useState<PokemonData | null>(null);
  const [keyValue, setKV] = useState<number>(0);
  const { isDarkMode } = useDarkMode();


  useEffect(() => {
    if (name !== undefined) {
      searchPokemonByName(name);
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const searchPokemonByName = async (name: string) => {
    try {
      const result = await Search(name);
      if (result) {
        setKV(parseInt(getIDNo(pokemonDetails?.pokeSpecies.url)))
        setPokemonDetails(result);
      } else {
        console.error(Error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <DetailsPage isDarkMode={isDarkMode}>
      <SearchBox />
      {pokemonDetails ? (
        <DisplayResults pokeData={pokemonDetails} key={keyValue}/>
      ) : (
        <div className="loadingGif"><img src={loadingShake} alt="loading..."/></div>
      )}
    </DetailsPage>
  );
}
