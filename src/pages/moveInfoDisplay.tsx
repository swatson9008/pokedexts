import { MoveClient, Move } from "pokenode-ts";
import { useState, useEffect } from "react";
import { formatString } from "../components/formatString";
import { MoveInfoStyle } from "../styles/displayResultStyles/moveInfoStyling";
import { PokeTypeDisplay } from "../styles/displayResultStyles/pokemonTypeDisplay";
import { gen9Moves } from "../components/gen9Moves";
import physicalIcon from "../assets/physical.png";
import specialIcon from "../assets/special.png";
import statusIcon from "../assets/status.png";

interface MoveInfoDisplayProps {
  moveString: string;
  isMachine: boolean;
}

export default function MoveInfoDisplay({
  moveString,
  isMachine,
}: MoveInfoDisplayProps) {
  const [moveData, setMoveData] = useState<Move | null>(null);

  let modifiedMoveString = moveString;

  if (
    moveString.startsWith("tm") ||
    moveString.startsWith("hm") ||
    (moveString.startsWith("tr") && isMachine === true)
  ) {
    const parts = moveString.split("-");
    if (parts.length > 1) {
      modifiedMoveString = parts.slice(1).join("-");
    }
  }

  const effectChance = (moveDescrip: string | undefined) => {
    const regex = /\$effect_chance%/g;
    return moveDescrip
      ? moveDescrip.replace(
          regex,
          `${moveData?.effect_chance?.toString()}%` || ""
        )
      : "";
  };

  useEffect(() => {
    const fetchMoveData = async () => {
      const api = new MoveClient();
      try {
        const data = await api.getMoveByName(modifiedMoveString);
        setMoveData(data);
      } catch (error) {
        console.error("Error fetching TM data:", error);
      }
    };

    if (modifiedMoveString) {
      fetchMoveData();
    }
  }, [modifiedMoveString]);

  console.log(moveData);

  const moveDescription =
    (moveData?.name && gen9Moves[moveData.name]?.description) ||
    moveData?.flavor_text_entries?.[7]?.flavor_text ||
    "No description available";

  return (
    <MoveInfoStyle>
      <div className="row1">
        {moveData && (
          <div>
            <PokeTypeDisplay type={moveData.type.name}>
              {formatString(moveData.type.name)}
            </PokeTypeDisplay>
          </div>
        )}
        {moveData && (
          <div>
            <img
              src={
                moveData.damage_class?.name === "physical"
                  ? physicalIcon
                  : moveData.damage_class?.name === "special"
                  ? specialIcon
                  : moveData.damage_class?.name === "status"
                  ? statusIcon
                  : undefined
              }
              alt={moveData.damage_class?.name}
            />
          </div>
        )}
      </div>
      <div className="row2">
        {moveData?.power === null ? "" : <div><span>Power:</span> {moveData?.power} BP</div>}
        {moveData?.accuracy === null ? (
          ""
        ) : (
          <div><span>Accuracy:</span> {moveData?.accuracy}%</div>
        )}
      </div>
      <div className="row3">
        <div><span>PP:</span> {moveData?.pp}</div>
        <div><span>Target:</span> {formatString(moveData?.target?.name || "")}</div>
      </div>
      <div className="row4">
        {moveData?.effect_entries[0]?.short_effect === undefined
          ? moveDescription
          : effectChance(moveData?.effect_entries?.[0]?.short_effect)}
      </div>
    </MoveInfoStyle>
  );
}
