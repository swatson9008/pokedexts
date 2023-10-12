/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useMemo } from "react";
import { formatString, otherFormatString } from "../components/formatString";
import { PokemonData } from "../components/pokemonData";
import sortMoves from "../components/sortMove";
import { MoveClient } from "pokenode-ts";
import generationConverter from "../components/generationConverter";

interface DisplayResultsProps {
  pokeData: PokemonData;
}

interface AbilityData {
  generation: {
    name: string;
  };
  name: string;
  effect_entries: {
    short_effect: string;
  }[];
}

export default function DisplayResults({ pokeData }: DisplayResultsProps) {
  const sortedData = sortMoves(pokeData);
  const defaultGameTitle = Object.keys(sortedData.pokeMoves).slice(-1)[0];
  const [gameTitle, setGameTitle] = useState(defaultGameTitle);
  const [learnMethod, setLearnMethod] = useState("level-up");
  const learnMethodList = Object.keys(sortedData.pokeMoves[gameTitle] || {});
  const [tmHM, setTmHm] = useState<string[]>([]);
  const [abilityDataArray, setAbilityDataArray] = useState<AbilityData[]>([]);
  const moveList = useMemo(() => {
    return sortedData.pokeMoves[gameTitle][learnMethod] || [];
  }, [sortedData, gameTitle, learnMethod]);

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
    "zygarde-cube",
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

          const customSort = (a: string, b: string) => {
            const isTmA = a.startsWith("TM");
            const isTmB = b.startsWith("TM");

            if (isTmA && !isTmB) {
              return 1;
            } else if (!isTmA && isTmB) {
              return -1;
            } else if (isTmA && isTmB) {
              const tmNumberA = parseInt(a.slice(2));
              const tmNumberB = parseInt(b.slice(2));
              return tmNumberA - tmNumberB;
            } else {
              const firstTwoLettersA = a.slice(0, 2);
              const firstTwoLettersB = b.slice(0, 2);

              if (firstTwoLettersA === firstTwoLettersB) {
                return parseInt(a.slice(2)) - parseInt(b.slice(2));
              } else {
                return firstTwoLettersB.localeCompare(
                  firstTwoLettersA,
                  undefined,
                  { numeric: true }
                );
              }
            }
          };

          moveDataArray.sort(customSort);

          console.log(moveDataArray);
          setTmHm(moveDataArray);
          console.log(sortedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [learnMethod, gameTitle, moveList]);

  useEffect(() => {
    const fetchDataForAbilities = async () => {
      try {
        const abilityDataArray = await Promise.all(
          pokeData.pokeAbilities.map(async (abilities) => {
            if (abilities.url) {
              const response = await fetch(abilities.url);
              const abilityData = await response.json();
              return abilityData;
            } else {
              console.log(`No URL found for ability: ${abilities.name}`);
              return null;
            }
          })
        );

        console.log("Ability Data:", abilityDataArray);
        console.log(abilityDataArray[0].generation.name);
        setAbilityDataArray(abilityDataArray);
      } catch (error) {
        console.error("Error fetching ability data:", error);
      }
    };

    fetchDataForAbilities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const smogonLinkGen = (pokemon: string, generation: string) => {
    return `https://www.smogon.com/dex/${generationConverter(
      generation
    )}/pokemon/${pokemon}/`;
  };

  return (
    <div className="searchMain">
      <div className="displayResult">
        <div key={sortedData.pokeName}>
          <div className="pokeName">{formatString(sortedData.pokeName)}</div>
          <div className="pokeTypes">
            Types: {pokeData.pastTypes.length
              ? (gameTitle === "red-blue" ||
                  gameTitle === "yellow" ||
                  gameTitle === "gold-silver" ||
                  gameTitle === "crystal" ||
                  gameTitle === "ruby-sapphire" ||
                  gameTitle === "emerald" ||
                  gameTitle === "firered-leafgreen" ||
                  gameTitle === "colosseum" ||
                  gameTitle === "xd" ||
                  gameTitle === "diamond-pearl" ||
                  gameTitle === "platinum" ||
                  gameTitle === "heartgold-soulsilver" ||
                  gameTitle === "black-white" ||
                  gameTitle === "black-2-white-2") &&
                pokeData.pastTypes[0].generation.name === "generation-v"
                ? pokeData.pastTypes[0].types.map((type, index) => (
                    <div key={index}>{formatString(type.type.name)}</div>
                  ))
                : pokeData.pastTypes[0].types.map((type, index) => (
                    <div key={index}>{formatString(type.type.name)}</div>
                  ))
              : pokeData.pokeTypes.map((type, index) => (
                  <div key={index}>{formatString(type.name)}</div>
                ))}
          </div>

          {gameTitle === "red-blue" ||
          gameTitle === "yellow" ||
          gameTitle === "gold-silver" ||
          gameTitle === "crystal" ? null : (
            <div className="pokeAbilities">
              {pokeData.pokeAbilities.map((abilities, index) => (
                <div key={index}>
                  {abilities.is_hidden &&
                  (gameTitle === "ruby-sapphire" ||
                    gameTitle === "emerald" ||
                    gameTitle === "firered-leafgreen" ||
                    gameTitle === "colosseum" ||
                    gameTitle === "xd" ||
                    gameTitle === "diamond-pearl" ||
                    gameTitle === "platinum" ||
                    gameTitle === "heartgold-soulsilver")
                    ? null
                    : (abilities.is_hidden ? "Hidden: " : "Regular: ") +
                      formatString(abilities.name) +
                      " - " +
                      (abilityDataArray[index]
                        ? abilityDataArray[index].generation.name ===
                            "generation-ix" ||
                          abilityDataArray[index].generation.name ===
                            "generation-viii"
                          ? ""
                          : abilityDataArray[index].generation.name ===
                            "generation-vii"
                          ? abilityDataArray[index].effect_entries[0]
                              .short_effect
                          : abilityDataArray[index].effect_entries[1]
                              .short_effect
                        : "")}
                </div>
              ))}
            </div>
          )}
          <div className="pokeBaseStats">
            {pokeData.pokeStats.map((stats, index) => (
              <div key={index}>
                {formatString(stats.name) + " - " + stats.base_stat}
              </div>
            ))}
          </div>
          <div className="smogonLink">
            <a href={smogonLinkGen(pokeData.pokeName, gameTitle)}>
              Recommended Smogon Movesets
            </a>
          </div>
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
                      {otherFormatString(move)}{" "}
                    </div>
                  ))
                : moveList.map((move, index) => (
                    <div key={index} className="pokeMove">
                      {move.level &&
                        `Level: ${
                          move.level === "0" ? (move.level = "-") : move.level
                        } `}
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
