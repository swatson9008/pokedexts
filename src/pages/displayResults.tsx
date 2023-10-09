import { useState } from "react";
import formatString from "../components/formatString";
import { PokemonData } from "../components/pokemonData";
import sortMoves from "../components/sortMove";

interface DisplayResultsProps {
  pokeData: PokemonData;
}

export default function DisplayResults({ pokeData }: DisplayResultsProps) {
  const sortedData = sortMoves(pokeData);
  const defaultGameTitle = Object.keys(sortedData.pokeMoves)[0];
  const [gameTitle, setGameTitle] = useState(defaultGameTitle);
  const [learnMethod, setLearnMethod] = useState("level-up");
  const moveList = sortedData.pokeMoves[gameTitle][learnMethod] || [];
  const learnList = Object.keys(sortedData.pokeMoves[gameTitle] || {});


  const customLearnMethodOrder = ["level-up", "machine", "egg", "tutor"];

  learnList.sort((a, b) => {
    const indexA = customLearnMethodOrder.indexOf(a);
    const indexB = customLearnMethodOrder.indexOf(b);
    return indexA - indexB;
  });

  const handleTitle = (title: string) => {
    setGameTitle(title);
  };

  const handleLearnMethod = (method: string) => {
    setLearnMethod(method);
  };

  return (
    <div className="searchMain">
      <div className="displayResult">
        <div key={sortedData.pokeName}>
          <div className="pokeName">{formatString(sortedData.pokeName)}</div>
          <div className="pokeMoves">
            <div className="pokeTitleList">
              {Object.keys(sortedData.pokeMoves).map((title, index) => (
                <div
                  key={index}
                  className={index.toString()}
                  onClick={() => handleTitle(title)}
                >
                  {formatString(title)}
                </div>
              ))}
            </div>
            <div className="gameTitle">{formatString(gameTitle)}</div>
            <div className="learnMethodList">
              {learnList.map((method, index) => (
                <div
                  key={`${method}-${index}`}
                  className={method === learnMethod ? "selected" : ""}
                  onClick={() => handleLearnMethod(method)}
                >
                  {formatString(method)}
                </div>
              ))}
            </div>
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
