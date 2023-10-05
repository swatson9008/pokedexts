import formatString from '../components/formatString';
import { PokemonData } from '../components/pokemonData';

interface DisplayResultsProps {
    pokeData: PokemonData;
  }

export default function DisplayResults({ pokeData }: DisplayResultsProps) {
  return (
    <div className="searchMain">
      <div className="displayResult">
        <div key={pokeData.pokeName}>
          <div className="pokeName">{pokeData.pokeName}</div>
          <div className="pokeMoves">
            {Object.keys(pokeData.pokeMoves).map((versionGroup) => (
              <div key={versionGroup}>
                <div className="versionGroupName">{formatString(versionGroup)}</div>
                <div className="moveLearnMethods">
                  {Object.keys(pokeData.pokeMoves[versionGroup]).map(
                    (moveLearnMethod) => {
                      if (moveLearnMethod === "level-up") {
                        return (
                          <div key={moveLearnMethod}>
                            <div className="moveLearnMethod">
                              {formatString(moveLearnMethod)}
                            </div>
                            <div className="movesList">
                              {pokeData.pokeMoves[versionGroup][moveLearnMethod].map((move) => (
                                <div key={move.name} className="pokeMove">
                                  {formatString(move.name)}
                                  {move.level && ` (Level: ${move.level})`}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    }
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
