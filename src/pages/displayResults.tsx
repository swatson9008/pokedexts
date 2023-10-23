/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useMemo } from "react";
import {
  formatString,
  otherFormatString,
  getIDNo,
} from "../components/formatString";
import { PokemonData } from "../components/pokemonData";
import sortMoves from "../components/sortMove";
import { MoveClient, EvolutionClient, EvolutionChain } from "pokenode-ts";
import generationConverter from "../components/generationConverter";
import formatEvos from "../components/formatEvos";

interface DisplayResultsProps {
  pokeData: PokemonData;
}

interface AbilityData {
  generation: {
    name: string;
  };
  name: string;
  effect_entries: {
    language: { name: string };
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
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(
    null
  );

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
              let matchingMachine = null;

              if (gameTitle === "brilliant-diamond-and-shining-pearl") {
                matchingMachine = moveData.machines.find(
                  (machine) => machine.version_group.name === "diamond-pearl"
                );
              } else {
                matchingMachine = moveData.machines.find(
                  (machine) => machine.version_group.name === gameTitle
                );
              }

              if (matchingMachine) {
                const url = matchingMachine.machine.url;
                const response = await fetch(url);
                const moveRes = await response.json();
                let moveTM = moveRes.item.name;
                if (
                  gameTitle === "brilliant-diamond-and-shining-pearl" &&
                  moveTM.startsWith("hm")
                ) {
                  const thirdLetter = moveTM[2];
                  const fourthLetter = moveTM[3];
                  const number = parseInt(thirdLetter + fourthLetter, 10);
                  const newNumber = number + 92;
                  moveTM = `tm${newNumber}`;
                }
                moveName = `${moveTM}-${move.name}`;
              } else if (
                gameTitle === "brilliant-diamond-and-shining-pearl" &&
                move.name === "volt-switch"
              ) {
                moveName = `tm43-volt-switch`;
              } else if (
                gameTitle === "brilliant-diamond-and-shining-pearl" &&
                move.name === "workup"
              ) {
                moveName = `tm10-workup`;
              } else if (
                gameTitle === "brilliant-diamond-and-shining-pearl" &&
                move.name === "dazzling-gleam"
              ) {
                moveName = `tm21-dazzling-gleam`;
              } else if (
                gameTitle === "brilliant-diamond-and-shining-pearl" &&
                move.name === "low-sweep"
              ) {
                moveName = `tm27-low-sweep`;
              } else if (
                gameTitle === "brilliant-diamond-and-shining-pearl" &&
                move.name === "scald"
              ) {
                moveName = `tm49-scald`;
              } else if (
                gameTitle === "brilliant-diamond-and-shining-pearl" &&
                move.name === "bug-buzz"
              ) {
                moveName = `tm62-bug-buzz`;
              } else if (
                gameTitle === "brilliant-diamond-and-shining-pearl" &&
                move.name === "nasty-plot"
              ) {
                moveName = `tm63-nasty-plot`;
              } else if (
                gameTitle === "brilliant-diamond-and-shining-pearl" &&
                move.name === "bulldoze"
              ) {
                moveName = `tm83-bulldoze`;
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
        setAbilityDataArray(abilityDataArray);
      } catch (error) {
        console.error("Error fetching ability data:", error);
      }
    };

    fetchDataForAbilities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchDataForEvos = async () => {
      try {
        const api = new EvolutionClient();
        const data = await api.getEvolutionChainById(
          parseInt(pokeData.pokeEvoID)
        );
        setEvolutionChain(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataForEvos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (evolutionChain) {
      console.log(evolutionChain); // Log the data here
    }
  }, [evolutionChain]);

  const smogonLinkGen = (pokemon: string, generation: string) => {
    return `https://www.smogon.com/dex/${generationConverter(
      generation
    )}/pokemon/${pokemon}/`;
  };

  return (
    <div className="searchMain">
      <div className="displayResult">
        <div key={sortedData.pokeName}>
          <div>
            {pokeData.pokeSprites.sprite === null ? (
              "image not found"
            ) : (
              <img src={pokeData.pokeSprites.sprite} alt={pokeData.pokeName} />
            )}
          </div>
          <div className="pokeName">{formatString(sortedData.pokeName)}</div>
          <div className="pokeTypes">
            Types:{" "}
            {pokeData.pastTypes.length &&
            (gameTitle === "red-blue" ||
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
              : pokeData.pastTypes.length &&
                (gameTitle === "red-blue" || gameTitle === "yellow") &&
                pokeData.pastTypes[0].generation.name === "generation-i"
              ? pokeData.pastTypes[0].types.map((type, index) => (
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
                    : (abilities.is_hidden
                        ? "Hidden Ability: "
                        : "Regular Ability: ") +
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
                          : (
                              abilityDataArray[index].effect_entries.find(
                                (entry) => entry.language.name === "en"
                              ) || {}
                            ).short_effect || ""
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
          <div className="pokeEvoInfo">
            {evolutionChain?.chain.evolves_to.length === 0 ? (
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDNo(
                evolutionChain.chain.species.url
              )}.png`} alt="" /> +
              "This Pokemon has no evolution line"
            ) : (
              <div className="pokeEvoChain">
                <div className="baseEvo">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDNo(
                evolutionChain.chain.species.url
              )}.png`} alt="" /> {evolutionChain?.chain.species.name !== undefined
                ? formatString(evolutionChain?.chain.species.name)
                : ""}
                </div>
                <div className="firstStageEvo">
                  {evolutionChain?.chain.evolves_to.map((evolution, index) => (
                    <div key={index}>
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDNo(
                          evolution.species.url
                        )}.png`}
                        alt={evolution.species.name}
                      />
                      {evolution.species.name !== undefined
                        ? formatString(evolution.species.name)
                        : ""}

                      <div key={index}>
                        {evolutionChain?.chain.evolves_to[
                          index
                        ].evolution_details.map((method, methodIndex) => (
                          <div>
                            {formatEvos(
                              evolutionChain,
                              "first",
                              index,
                              methodIndex
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="secondStageEvo">
                  {evolutionChain?.chain.evolves_to[0].evolves_to.length === 0
                    ? null
                    : evolutionChain?.chain.evolves_to[0].evolves_to.map(
                        (evolution, index) => (
                          <div key={index}>
                            <img
                              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDNo(
                                evolution.species.url
                              )}.png`}
                              alt={evolution.species.name}
                            />
                            {evolution.species.name !== undefined
                              ? formatString(evolution.species.name)
                              : ""}
                            <div>
                              {evolutionChain?.chain.evolves_to[
                                0
                              ].evolution_details.map((method, methodIndex) => (
                                <div>
                                  {formatEvos(
                                    evolutionChain,
                                    "second",
                                    index,
                                    methodIndex
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                </div>
              </div>
            )}
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
