import React from "react";
import classnames from "classnames";
import question from "./images/question.jpg";
import "./card.scss";

interface CardProps {
  onClick: (index: number) => void;
  card: {
    image: string;
    // Add any other properties of card if needed
  };
  index: number;
  isInactive?: boolean;
  isFlipped?: boolean;
  isDisabled?: boolean;
}

const Card: React.FC<CardProps> = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {
  const handleClick = () => {
    if (!isFlipped && !isDisabled) {
      onClick(index);
    }
  };

  return (
    <div
      className={classnames("card", {
        "is-flipped": isFlipped,
        "is-inactive": isInactive
      })}
      onClick={handleClick}
    >
      <div className="card-face card-font-face">
        <img src={question} alt="pokeball" />
      </div>
      <div className="card-face card-back-face">
        <img src={card.image} alt="pokeball" />
      </div>
    </div>
  );
};

export default Card;
