import { useState, useEffect } from "react";
import { Animate } from "react-simple-animate";

export default function RandomizedSprites() {
  const slideDuration = 5000;

  const pickARandomSprite = () => {
    const pokeNo = Math.floor(Math.random() * (1010 - 1 + 1) + 1);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeNo}.png`;
  };

  const [image1, setImage1] = useState(pickARandomSprite());
  const [image2, setImage2] = useState(pickARandomSprite());
  const [showImage1, setShowImage1] = useState(true);

  const onAnimationStart = { opacity: 0, transform: "translateX(-100%)" };
  const onAnimationEnd = { opacity: 1, transform: "translateX(0)" };

  useEffect(() => {
    const changeSpriteTimeout = setTimeout(() => {
      if (showImage1) {
        setImage2(pickARandomSprite());
      } else {
        setImage1(pickARandomSprite());
      }
      setShowImage1(!showImage1);
    }, slideDuration);

    return () => clearTimeout(changeSpriteTimeout);
  }, [showImage1]);

  return (
    <div className="sprite-container">
      <Animate
        play={showImage1}
        start={onAnimationStart}
        end={onAnimationEnd}
        duration={slideDuration}
        render={({ style }) => (
          <img style={style} src={showImage1 ? image1 : image2} alt="" />
        )}
      />
    </div>
  );
}
