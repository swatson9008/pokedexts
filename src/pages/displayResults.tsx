import formatString from '../components/formatString';
import { PokemonData } from '../components/pokemonData';
import sortMoves from '../components/sortMove';

interface DisplayResultsProps {
    pokeData: PokemonData;
  }

export default function DisplayResults({ pokeData }: DisplayResultsProps) {
  const sortedData = sortMoves(pokeData)
  return (
    <div className="searchMain">
      <div className="displayResult">
        <div key={sortedData.pokeName}>
          <div className="pokeName">{sortedData.pokeName}</div>
          <div className="pokeMoves">
            {Object.keys(sortedData.pokeMoves).map((versionGroup) => (
              <div key={versionGroup}>
                <div className="versionGroupName">{formatString(versionGroup)}</div>
                <div className="moveLearnMethods">
                  {Object.keys(sortedData.pokeMoves[versionGroup]).map(
                    (moveLearnMethod) => {
                      if (moveLearnMethod === "level-up") {
                        return (
                          <div key={moveLearnMethod}>
                            <div className="moveLearnMethod">
                              {formatString(moveLearnMethod)}
                            </div>
                            <div className="movesList">
                              {sortedData.pokeMoves[versionGroup][moveLearnMethod].map((move) => (
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
