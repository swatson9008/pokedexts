import { useNavigate } from "react-router-dom";
import Search from "./search";
import { usePokemonData } from "../pages/pokemonContext";

export default function RandomizedSpritesTemp() {
    const pokeNo = Math.floor(Math.random() * (1010 - 1 + 1) + 1);
    const navigate = useNavigate();
    const { storePokemonData } = usePokemonData();

    const pickARandomSprite = () => {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeNo}.png`;
    }

    const handleClick = async () => {
        try {
          const result = await Search(pokeNo.toString());
          if (result) {
            storePokemonData(result);
            navigate(`/pokemon/${result.pokeName}`);
          }
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <>
            <img src={pickARandomSprite()} alt="" onClick={handleClick} />
        </>
    )
}

