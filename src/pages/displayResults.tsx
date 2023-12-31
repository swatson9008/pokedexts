/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useMemo } from "react";
import {
  formatString,
  otherFormatString,
  getIDNo,
  formatMegas,
} from "../components/formatString";
import { PokemonData } from "../components/pokemonData";
import sortMoves from "../components/sortMove";
import { MoveClient, EvolutionClient, EvolutionChain } from "pokenode-ts";
import {
  generationConverter,
  generationList,
} from "../components/generationConverter";
import formatEvos from "../components/formatEvos";
import { BDSPTMs } from "../libraries/bdspTMs";
import { gen9TMs } from "../components/gen9TMs";
import { gen89Abilities } from "../components/gen89abilities";
import customSort from "../components/sortTMs";
import Search from "../components/search";
import { usePokemonData } from "./pokemonContext";
import { useNavigate } from "react-router-dom";
import { EntireDetailPage } from "../styles/displayResultStyles/entirePage";
import { TopAreaStyle } from "../styles/displayResultStyles/topArea";
import { PokeTypeDisplay } from "../styles/displayResultStyles/pokemonTypeDisplay";
import { PokeVarieties } from "../styles/displayResultStyles/pokeVarieties";
import { VarietyLabels } from "../styles/displayResultStyles/varietyLabels";
import { BaseStatStyles } from "../styles/displayResultStyles/baseStatStyle";
import { baseStatBarChart } from "../components/baseStateChart";
import { AbilitiesStyle } from "../styles/displayResultStyles/abilitiesStyle";
import { LearnMethodStyle } from "../styles/displayResultStyles/learnMethodstyle";
import { TopInfoStyle } from "../styles/displayResultStyles/topInfoBox";
import MoveInfoDisplay from "./moveInfoDisplay";
import { PokeEvoStyle } from "../styles/displayResultStyles/pokeEvoStyle";
import { SingleStageOnly } from "../styles/displayResultStyles/singleStageOnly";
import { EvolutionDisplay } from "../styles/displayResultStyles/evolutionDisplay";
import { DropdownDisplay } from "../styles/displayResultStyles/dropdownStyle";
import { DropdownOption } from "../styles/displayResultStyles/dropdownStyle";
import { useDarkMode } from "../pages/darkModeContext";
import loadingShake from "../assets/pokeShake.gif";

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
  const {
    pokeAbilities,
    pokeSprites,
    pokeForms,
    pokeTypes,
    pastTypes,
    pokeEvoID,
    pokeName,
  } = pokeData;
  const sortedData = sortMoves(pokeData);
  const [defaultGameTitle, setDefaultGameTitle] = useState("");
  const [gameTitle, setGameTitle] = useState(defaultGameTitle);
  const [learnMethod, setLearnMethod] = useState("level-up");
  const learnMethodList = Object.keys(sortedData.pokeMoves[gameTitle] || {});
  const [tmHM, setTmHm] = useState<string[]>([]);
  const [abilityDataArray, setAbilityDataArray] = useState<AbilityData[]>([]);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(
    null
  );
  const [moveDisplayStates, setMoveDisplayStates] = useState(new Map());
  const [currentTypes, setCurrentTypes] = useState<Array<string>>([]);
  const [isLoading, setLoading] = useState(false);
  const [tmLoading, setTmLoad] = useState(false);

  const { isDarkMode } = useDarkMode();

  const moveList = useMemo(() => {
    if (sortedData.pokeMoves && sortedData.pokeMoves[gameTitle]) {
      if (!sortedData.pokeMoves[gameTitle][learnMethod]) {
        setLearnMethod("level-up");
      }
      return sortedData.pokeMoves[gameTitle][learnMethod] || [];
    }
    return [];
  }, [sortedData.pokeMoves, gameTitle, learnMethod]);

  useEffect(() => {
    const keys = Object.keys(sortedData.pokeMoves);
    const newDefaultGameTitle = keys.length > 0 ? keys[keys.length - 1] : "";
    setDefaultGameTitle(newDefaultGameTitle);

    setGameTitle(newDefaultGameTitle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokeData]);

  useEffect(() => {
    if (pastTypes.length > 0) {
      if (
        (generationList.generation1.includes(gameTitle) ||
          generationList.generation2.includes(gameTitle) ||
          generationList.generation3.includes(gameTitle) ||
          generationList.generation4.includes(gameTitle) ||
          generationList.generation5.includes(gameTitle)) &&
        pastTypes[0].generation.name === "generation-v"
      ) {
        setCurrentTypes(pastTypes.map((typeObj) => typeObj.types[0].type.name));
      } else if (
        generationList.generation1.includes(gameTitle) &&
        pastTypes[0].generation.name === "generation-i"
      ) {
        setCurrentTypes(pastTypes.map((typeObj) => typeObj.types[0].type.name));
      } else {
        setCurrentTypes(pokeTypes.map((typeObj) => typeObj.name));
      }
    } else {
      setCurrentTypes(pokeTypes.map((typeObj) => typeObj.name));
    }
  }, [gameTitle, pastTypes, pokeTypes]);
  

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
          setTmLoad(true);
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

              if (matchingMachine && gameTitle !== "scarlet-violet") {
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
              } else if (gameTitle === "brilliant-diamond-and-shining-pearl") {
                const bdspTMFind = Object.values(BDSPTMs).find(
                  (item) => item.Name === move.name
                );
                if (bdspTMFind) {
                  moveName = `${bdspTMFind.TMNo}-${bdspTMFind.Name}`;
                } 
              } else if (moveName && gameTitle === "scarlet-violet") {
                const gen9Find = Object.entries(gen9TMs).find(
                  ([value]) => value === moveName
                );

                if (gen9Find) {
                  moveName = gen9Find[1];
                }
              }

              return moveName;
            })
          );

          moveDataArray.sort(customSort);
          setTmLoad(false);
          setTmHm(moveDataArray);
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
          pokeAbilities.map(async (abilities) => {
            if (abilities.url) {
              const response = await fetch(abilities.url);
              const abilityData = await response.json();
              return abilityData;
            } 
          })
        );

        setAbilityDataArray(abilityDataArray);
      } catch (error) {
        console.error("Error fetching ability data:", error);
      }
    };

    fetchDataForAbilities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokeAbilities]);

  useEffect(() => {
    const fetchDataForEvos = async () => {
      try {
        const api = new EvolutionClient();
        const data = await api.getEvolutionChainById(parseInt(pokeEvoID));
        setEvolutionChain(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataForEvos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokeData]);


  const smogonLinkGen = (pokemon: string, generation: string) => {
    return `https://www.smogon.com/dex/${generationConverter(
      generation
    )}/pokemon/${pokemon}/`;
  };
  const { storePokemonData } = usePokemonData();
  const navigate = useNavigate();
  const handleMonChange = async (pokemon: string) => {
    setLoading(true);
    try {
      const result = await Search(pokemon);
      if (result) {
        storePokemonData(result);
        navigate(`/pokemon/${result.pokeName}`);
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [pokeName]);

  const toggleMoveInfoDisplay = (moveName: string) => {
    const newDisplayStates = new Map(moveDisplayStates);
    newDisplayStates.set(moveName, !newDisplayStates.get(moveName));
    setMoveDisplayStates(newDisplayStates);
  };


  if (isLoading) {
    return (
      <div className="loadingGif">
        <img src={loadingShake} alt="loading..." />
      </div>
    );
  } else {
    return (
      <div className="displayDetails">
        <div className="displayResult">
          <EntireDetailPage key={sortedData.pokeName} isDarkMode={isDarkMode}>
            <PokeVarieties
              hasForms={pokeForms[0].forms[0].length > 1 ? true : false}
              isDarkMode={isDarkMode}
            >
              {pokeForms[0].forms[0].map(
                (form: {
                  pokemon: { url: string | undefined; name: string };
                  is_default: boolean;
                }) => (
                  <VarietyLabels
                    key={getIDNo(form.pokemon.url)}
                    onClick={() => handleMonChange(getIDNo(form.pokemon.url))}
                    isCurrentForm={
                      sortedData.pokeName === form.pokemon.name ? true : false
                    }
                    isDarkMode={isDarkMode}
                  >
                    {form.is_default
                      ? "Default Form"
                      : formatString(formatMegas(form.pokemon.name))}
                  </VarietyLabels>
                )
              )}
            </PokeVarieties>
            <DropdownDisplay
              isDarkMode={isDarkMode}
              hasForms={pokeForms[0].forms[0].length > 1 ? true : false}
              onChange={(e) => handleMonChange(e.target.value)}
              value={pokeData.pokeName}
            >
              {pokeForms[0].forms[0].map(
                (form: {
                  pokemon: { url: string | undefined; name: string };
                  is_default: boolean;
                }) => (
                  <DropdownOption
                    key={getIDNo(form.pokemon.url)}
                    value={form.pokemon.name}
                    isDarkMode={isDarkMode}
                  >
                    {form.is_default
                      ? "Default Form"
                      : formatString(form.pokemon.name)}
                  </DropdownOption>
                )
              )}
            </DropdownDisplay>
            <TopInfoStyle>
              <div className="mainPicture">
                {pokeSprites.sprite === null ? (
                  "image not found"
                ) : (
                  <img src={pokeSprites.sprite} alt={pokeName} />
                )}
              </div>
              <div className="pokeName">
                {formatString(formatMegas(sortedData.pokeName))}
              </div>
              <div className="pokeTypes">
                {currentTypes.map((type, index) => (
                  <PokeTypeDisplay key={index} type={type}>
                    {formatString(type)}
                  </PokeTypeDisplay>
                ))}
              </div>
            </TopInfoStyle>
            <TopAreaStyle>
              <AbilitiesStyle
                abilitiesExist={
                  generationList.generation1.includes(gameTitle) ||
                  generationList.generation2.includes(gameTitle)
                    ? false
                    : true
                }
                isDarkMode={isDarkMode}
              >
                {generationList.generation1.includes(gameTitle) ||
                generationList.generation2.includes(gameTitle) ? null : (
                  <div className="pokeAbilities">
                    {pokeAbilities.map((abilities, index) => (
                      <div key={index}>
                        {abilities.is_hidden &&
                        (generationList.generation3.includes(gameTitle) ||
                          generationList.generation4.includes(
                            gameTitle
                          )) ? null : (
                          <span>
                            {abilities.is_hidden ? (
                              <span className="abilityClass">
                                Hidden Ability:{" "}
                              </span>
                            ) : (
                              <span className="abilityClass">
                                Regular Ability:{" "}
                              </span>
                            )}
                            <span>{formatString(abilities.name)}</span> -{" "}
                            {abilityDataArray[index]
                              ? abilityDataArray[index].generation.name ===
                                  "generation-viii" ||
                                abilityDataArray[index].generation.name ===
                                  "generation-ix"
                                ? gen89Abilities[abilities.name]
                                : abilityDataArray[index].generation.name ===
                                  "generation-vii"
                                ? abilityDataArray[index].effect_entries[0]
                                    .short_effect
                                : (
                                    abilityDataArray[index].effect_entries.find(
                                      (entry) => entry.language.name === "en"
                                    ) || {}
                                  ).short_effect || ""
                              : ""}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </AbilitiesStyle>
              <BaseStatStyles isDarkMode={isDarkMode}>
                <div className="baseChart">
                  {baseStatBarChart(pokeData.pokeStats, isDarkMode)}
                  <div className="BST">
                    Total:{" "}
                    {pokeData.pokeStats.reduce(
                      (sum: number, stat: { base_stat: string }) =>
                        sum + parseInt(stat.base_stat),
                      0
                    )}
                  </div>
                </div>
              </BaseStatStyles>
            </TopAreaStyle>
            <div className="smogonLink">
              <a href={smogonLinkGen(pokeName, gameTitle)}>
                Recommended Smogon Movesets
              </a>
            </div>
            <PokeEvoStyle
              isDarkMode={isDarkMode}
              stageNumber={
                evolutionChain?.chain.evolves_to.length === 0
                  ? 1
                  : evolutionChain?.chain.evolves_to[0].evolves_to.length === 0
                  ? 2
                  : 3
              }
            >
              {evolutionChain?.chain.evolves_to.length === 0 ? (
                pokeSprites.sprite === null ? (
                  <>"Image not found" This Pokemon has no evolution line</>
                ) : (
                  <SingleStageOnly>
                    <div className="baseEvoImg">
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDNo(
                          evolutionChain.chain.species.url
                        )}.png`}
                        alt=""
                        onClick={() =>
                          handleMonChange(evolutionChain.chain.species.name)
                        }
                      />
                    </div>
                    This Pokemon has no evolution line
                  </SingleStageOnly>
                )
              ) : (
                <div className="pokeEvoChain">
                  <div
                    className="baseEvo"
                    onClick={() =>
                      evolutionChain?.chain.species.name &&
                      handleMonChange(evolutionChain.chain.species.name)
                    }
                  >
                    <div className="baseEvoImg">
                      {evolutionChain ? (
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDNo(
                            evolutionChain.chain.species.url
                          )}.png`}
                          alt=""
                        />
                      ) : null}
                    </div>
                    <div>
                      {evolutionChain?.chain.species.name !== undefined
                        ? formatString(evolutionChain?.chain.species.name)
                        : ""}
                    </div>
                  </div>
                  <div className="firstStageEvo">
                    {evolutionChain?.chain.evolves_to.map(
                      (evolution, index) => (
                        <EvolutionDisplay
                          key={evolution.species.name}
                          isDarkMode={isDarkMode}
                        >
                          <div className="evoMethod">
                            {evolution.evolution_details.map(
                              (_method, methodIndex) => (
                                <div key={methodIndex}>
                                  {formatEvos(
                                    evolutionChain,
                                    "first",
                                    index,
                                    methodIndex
                                  )}
                                </div>
                              )
                            )}
                          </div>
                          <div className="monInfo">
                            <div>
                              <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDNo(
                                  evolution.species.url
                                )}.png`}
                                alt={evolution.species.name}
                                onClick={() =>
                                  handleMonChange(evolution.species.name)
                                }
                              />
                            </div>
                            {evolution.species.name !== undefined
                              ? formatString(evolution.species.name)
                              : ""}
                          </div>
                        </EvolutionDisplay>
                      )
                    )}
                  </div>
                  <div className="secondStageEvo">
                    {evolutionChain?.chain.evolves_to[0].evolves_to.length === 0
                      ? null
                      : evolutionChain?.chain.evolves_to[0].evolves_to.map(
                          (evolution, index) => (
                            <EvolutionDisplay
                              key={evolution.species.name}
                              isDarkMode={isDarkMode}
                            >
                              <div className="evoMethod" key={index}>
                                {evolution.evolution_details.map(
                                  (_method, methodIndex) => (
                                    <div key={methodIndex}>
                                      {formatEvos(
                                        evolutionChain,
                                        "second",
                                        index,
                                        methodIndex
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                              <div className="monInfo">
                                <div>
                                  <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDNo(
                                      evolution.species.url
                                    )}.png`}
                                    alt={evolution.species.name}
                                    onClick={() =>
                                      handleMonChange(evolution.species.name)
                                    }
                                  />
                                </div>
                                {evolution.species.name !== undefined
                                  ? formatString(evolution.species.name)
                                  : ""}
                              </div>
                            </EvolutionDisplay>
                          )
                        )}
                  </div>
                </div>
              )}
            </PokeEvoStyle>

            <div className="pokeMoves">
              <PokeVarieties hasForms={true} isDarkMode={isDarkMode}>
                {Object.keys(sortedData.pokeMoves).map((title, index) => (
                  <VarietyLabels
                    key={index}
                    isCurrentForm={gameTitle === title ? true : false}
                    className={index.toString()}
                    onClick={() => handleTitle(title)}
                    isDarkMode={isDarkMode}
                  >
                    {formatString(title)}
                  </VarietyLabels>
                ))}
              </PokeVarieties>
              <DropdownDisplay
                isDarkMode={isDarkMode}
                hasForms={true}
                value={gameTitle}
                onChange={(event) => handleTitle(event.target.value)}
              >
                {Object.keys(sortedData.pokeMoves).map((title, index) => (
                  <option key={index} value={title}>
                    {formatString(title)}
                  </option>
                ))}
              </DropdownDisplay>
              <LearnMethodStyle isDarkMode={isDarkMode}>
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
                  {tmLoading ? (
                    <div className="loadingGif">
                      <img src={loadingShake} alt="loading..." />
                    </div>
                  ) : (
                    <>
                      {learnMethod === "machine"
                        ? tmHM.map((move, index) => (
                            <div key={index} className="pokeMove">
                              <div
                                className="moveName"
                                onClick={() => toggleMoveInfoDisplay(move)}
                              >
                                {otherFormatString(move)}{" "}
                                {moveDisplayStates.get(move) && (
                                  <MoveInfoDisplay
                                    moveString={move}
                                    isMachine={true}
                                  />
                                )}
                              </div>
                            </div>
                          ))
                        : moveList.map((move, index) => (
                            <div key={index} className="pokeMove">
                              <div
                                className="moveName"
                                onClick={() => toggleMoveInfoDisplay(move.name)}
                              >
                                {move.level &&
                                  `Level ${
                                    move.level === "0" || move.level === "1"
                                      ? (move.level = "-")
                                      : move.level
                                  } `}
                                {formatString(move.name)}{" "}
                                {moveDisplayStates.get(move.name) && (
                                  <MoveInfoDisplay
                                    moveString={move.name}
                                    isMachine={false}
                                  />
                                )}
                              </div>
                            </div>
                          ))}
                    </>
                  )}
                </div>
              </LearnMethodStyle>
            </div>
          </EntireDetailPage>
        </div>
      </div>
    );
  }
}
