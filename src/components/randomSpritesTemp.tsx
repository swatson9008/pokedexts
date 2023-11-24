// RandomizedSpritesTemp.js
import { useNavigate } from "react-router-dom";
import Search from "./search";
import { usePokemonData } from "../pages/pokemonContext";
import { useState, useEffect } from "react";
import { RandomSpriteSlide, Image } from "../styles/randomSpriteStyle";

export default function RandomizedSpritesTemp() {
  const [key, setKey] = useState(0);
  const pokeNo = Math.floor(Math.random() * (1010 - 1 + 1) + 1);
  const navigate = useNavigate();
  const { storePokemonData } = usePokemonData();

  const pickARandomSprite = () => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeNo}.png`;
  };

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

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prevKey) => prevKey + 1);
    }, 5000); // Adjust the interval to 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <RandomSpriteSlide>
      <Image key={key} src={pickARandomSprite()} alt="" onClick={handleClick} />
    </RandomSpriteSlide>
  );
}
