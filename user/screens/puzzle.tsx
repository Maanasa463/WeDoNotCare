import React, { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle
} from "@material-ui/core";
import Card from "./card";
import "./puzzle.scss";

interface CardType {
  type: string;
  image: string;
}

const uniqueElementsArray: CardType[] = [
  {
    type: "Apple",
    image: require(`./images/apple.jpeg`).default
  },
  {
    type: "Banana",
    image: require(`./images/banana.jpg`).default
  },
  {
    type: "Guava",
    image: require(`./images/guava.jpeg`).default
  },
  {
    type: "Mango",
    image: require(`./images/mango.jpeg`).default
  },
  {
    type: "Orange",
    image: require(`./images/orange.jpeg`).default
  },
  {
    type: "Watermelon",
    image: require(`./images/watermelon.jpeg`).default
  }
];

function shuffleCards(array: CardType[]): CardType[] {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

const Puzzles: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>(
    shuffleCards.bind(null, uniqueElementsArray.concat(uniqueElementsArray))
  );
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [clearedCards, setClearedCards] = useState<Record<string, boolean>>({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState<boolean>(false);
  const [moves, setMoves] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [bestScore, setBestScore] = useState<number>(
    JSON.parse(localStorage.getItem("bestScore") || 'Infinity')
  );
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === uniqueElementsArray.length) {
      setShowModal(true);
      const highScore = Math.min(moves, bestScore);
      setBestScore(highScore);
      localStorage.setItem("bestScore", JSON.stringify(highScore));
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      setOpenCards([]);
      return;
    }
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  const handleCardClick = (index: number) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      if (timeout.current) clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timeoutHandle: NodeJS.Timeout | null = null;
    if (openCards.length === 2) {
      timeoutHandle = setTimeout(evaluate, 300);
    }
    return () => {
      if (timeoutHandle) clearTimeout(timeoutHandle);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);

  const checkIsFlipped = (index: number): boolean => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card: CardType): boolean => {
    return Boolean(clearedCards[card.type]);
  };

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);
    setCards(shuffleCards(uniqueElementsArray.concat(uniqueElementsArray)));
  };

  return (
    <div className="Puzzles">
      <header>
        <h3>Play the Flip card game</h3>
        <div>
          Select two cards with the same content consecutively to make them vanish
        </div>
      </header>
      <div className="container">
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            index={index}
            isDisabled={shouldDisableAllCards}
            isInactive={checkIsInactive(card)}
            isFlipped={checkIsFlipped(index)}
            onClick={handleCardClick}
          />
        ))}
      </div>
      <footer>
        <div className="score">
          <div className="moves">
            <span className="bold">Moves:</span> {moves}
          </div>
          {localStorage.getItem("bestScore") && (
            <div className="high-score">
              <span className="bold">Best Score:</span> {bestScore}
            </div>
          )}
        </div>
        <div className="restart">
          <Button onClick={handleRestart} color="primary" variant="contained">
            Restart
          </Button>
        </div>
      </footer>
      <Dialog
        open={showModal}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Hurray!!! You completed the challenge
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You completed the game in {moves} moves. Your best score is {bestScore} moves.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRestart} color="primary">
            Restart
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Puzzles;
