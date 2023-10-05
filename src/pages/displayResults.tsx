/* eslint-disable @typescript-eslint/no-unused-vars */
import formatString from '../components/formatString';

export default function DisplayResults(pokeData: any[]) {

  return (
    <div className="searchMain">
      <div className="displayResult">
        {pokeData.map((pokemon) => (
          <div key={pokemon.pokeName}>
            <div className="pokeName">{pokemon.pokeName}</div>
            <div className="pokeMoves">
              {Object.keys(pokemon.pokeMoves).map((versionGroup) => (
                <div key={versionGroup}>
                  <div className="versionGroupName">{formatString(versionGroup)}</div>
                  <div className="moveLearnMethods">
                    {Object.keys(pokemon.pokeMoves[versionGroup]).map(
                      (moveLearnMethod) => {
                        if (moveLearnMethod === "level-up") {
                          return (
                            <div key={moveLearnMethod}>
                              <div className="moveLearnMethod">
                                {formatString(moveLearnMethod)}
                              </div>
                              <div className="movesList">
                                {pokemon.pokeMoves[versionGroup][
                                  moveLearnMethod
                                ].map((move) => (
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
        ))}
      </div>
    </div>
  );
}
