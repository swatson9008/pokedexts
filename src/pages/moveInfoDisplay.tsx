import { MoveClient, Move } from "pokenode-ts";
import { useState, useEffect } from "react";
import { formatString } from "../components/formatString";

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
    return moveDescrip ? moveDescrip.replace(regex, `${moveData?.effect_chance?.toString()}%` || "") : "";
  }
  

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

  return (
    <>
      {moveData && <div>{formatString(moveData.damage_class?.name || "")}</div>}
      {moveData?.power === null ? "" : <div>Power: {moveData?.power}</div>}
      {moveData?.accuracy === null ? (
        ""
      ) : (
        <div>Accuracy: {moveData?.accuracy}%</div>
      )}
      <div>PP: {moveData?.pp}</div>
      <div>Target: {formatString(moveData?.target?.name || "")}</div>
      <div>{effectChance(moveData?.effect_entries?.[0]?.short_effect)}</div>
    </>
  );
}
