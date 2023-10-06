import { useState } from "react";
import formatString from "../components/formatString";
import { PokemonData } from "../components/pokemonData";
import sortMoves from "../components/sortMove";

interface DisplayResultsProps {
  pokeData: PokemonData;
}

export default function DisplayResults({ pokeData }: DisplayResultsProps) {
  const sortedData = sortMoves(pokeData);
  const defaultGameTitle = Object.keys(sortedData.pokeMoves)[1];
  const [gameTitle, setGameT] = useState(defaultGameTitle);
  const [learnMethod, setMethod] = useState("level-up");
  const moveList = sortedData.pokeMoves[gameTitle][learnMethod] || [];
  console.log(moveList);
  return (
    <div className="searchMain">
      <div className="displayResult">
        <div key={sortedData.pokeName}>
          <div className="pokeName">{formatString(sortedData.pokeName)}</div>
          <div className="pokeMoves">
            <div className="gameTitle">{formatString(gameTitle)}</div>
            <div className="learnMethod">{formatString(learnMethod)}</div>
            <div className="moveList">
              {moveList.map((move) => (
                <div key={move.name} className="pokeMove">
                  {move.level && `Level: ${move.level} `}
                  {formatString(move.name)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
