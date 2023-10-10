/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useMemo } from "react";
import formatString from "../components/formatString";
import { PokemonData } from "../components/pokemonData";
import sortMoves from "../components/sortMove";
import { MoveClient } from "pokenode-ts";

interface DisplayResultsProps {
  pokeData: PokemonData;
}

export default function DisplayResults({ pokeData }: DisplayResultsProps) {
  const sortedData = sortMoves(pokeData);
  const defaultGameTitle = Object.keys(sortedData.pokeMoves)[0];
  const [gameTitle, setGameTitle] = useState(defaultGameTitle);
  const [learnMethod, setLearnMethod] = useState("level-up");
  const learnMethodList = Object.keys(sortedData.pokeMoves[gameTitle] || {});
  const [tmHM, setTmHm] = useState<string[]>([]);
  const moveList = useMemo(() => {
    return sortedData.pokeMoves[gameTitle][learnMethod] || []; 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [learnMethod]);
  

  const customLearnMethodOrder = [
    "level-up",
    "machine",
    "egg",
    "tutor",
    "stadium-surfing-pikachu",
    "light-ball-egg",
    "colosseum-purification",
    "xd-shadow",
    "xd-purification",
    "form-change",
    "zygarde-cube"
  ];

  learnMethodList.sort((a, b) => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (learnMethod === "machine") {
          const moveClient = new MoveClient();
          const moveDataArray = await Promise.all(
            moveList.map(async (move) => {
              let moveName = move.name;
              const moveData = await moveClient.getMoveByName(moveName);
              const matchingMachine = moveData.machines.find(
                (machine) => machine.version_group.name === gameTitle
              );
              // return moveData;

              if (matchingMachine) {
                const url = matchingMachine.machine.url;
                const response = await fetch(url);
                const moveRes = await response.json();
                const moveTM = moveRes.item.name;
                console.log(moveTM);
                moveName = `${moveTM}-${move.name}`;
              } else {
                console.log(
                  `No machine found with version group name ${gameTitle}`
                );
              }

              return moveName;
            })
          );

          console.log(moveDataArray);
          setTmHm(moveDataArray);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [learnMethod]);

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
              {learnMethodList.map((method, index) => (
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
              {learnMethod === "machine"
                ? tmHM.map((move, index) => (
                    <div key={index} className="pokeMove">
                      {formatString(move)}{" "}
                    </div>
                  ))
                : moveList.map((move, index) => (
                    <div key={index} className="pokeMove">
                      {move.level && `Level: ${move.level} `}
                      {formatString(move.name)}{" "}
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
