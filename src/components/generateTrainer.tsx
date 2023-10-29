import Red from "../assets/trainersprites/red-gen1rb.png";
import Leaf from "../assets/trainersprites/leaf-gen3.png";
import Ethan from "../assets/trainersprites/ethan-gen2.png";
import Kris from "../assets/trainersprites/kris-gen2.png";
import Lyra from "../assets/trainersprites/lyra.png";
import Brendan from "../assets/trainersprites/brendan-gen3rs.png";
import May from "../assets/trainersprites/may-gen3rs.png";
import Lucas from "../assets/trainersprites/lucas.png";
import Dawn from "../assets/trainersprites/dawn.png";
import Hilbert from "../assets/trainersprites/hilbert.png";
import Hilda from "../assets/trainersprites/hilda.png";
import Nate from "../assets/trainersprites/nate.png";
import Rosa from "../assets/trainersprites/rosa.png";
import Calem from "../assets/trainersprites/calem.png";
import Serena from "../assets/trainersprites/serena.png";
import Elio from "../assets/trainersprites/elio-usum.png";
import Selene from "../assets/trainersprites/selene.png";
import Chase from "../assets/trainersprites/chase.png";
import Elaine from "../assets/trainersprites/elaine.png";
import Victor from "../assets/trainersprites/victor.png";
import Gloria from "../assets/trainersprites/gloria.png";
import Rei from "../assets/trainersprites/rei.png";
import Florian from "../assets/trainersprites/florian-s.png";
import Juliana from "../assets/trainersprites/juliana-s.png";

import { StyledTrainerContainer } from "../styles/trainerSpriteStyle";

const trainerSprites: {[key: string]: string } = {
  Red,
  Leaf,
  Ethan,
  Kris,
  Lyra,
  Brendan,
  May,
  Lucas,
  Dawn,
  Hilbert,
  Hilda,
  Nate,
  Rosa,
  Calem,
  Serena,
  Elio,
  Selene,
  Chase,
  Elaine,
  Victor,
  Gloria,
  Rei,
  Florian,
  Juliana
};

const pickATrainerSprite = () => {
  const spriteNames = Object.keys(trainerSprites);
  const randomSpriteName = spriteNames[Math.floor(Math.random() * spriteNames.length)];
  return trainerSprites[randomSpriteName];
};

export default function GenerateTrainerSprite() {
  const randomSprite = pickATrainerSprite();

  return (
    <StyledTrainerContainer>
      <img src={randomSprite} alt="Trainer Sprite" />
    </StyledTrainerContainer>
  );
}