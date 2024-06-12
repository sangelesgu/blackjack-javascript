const blackJack = (() => {
  "use strict";

  let deck = [];
  const types = ["C", "D", "H", "S"];
  const specialCards = ["A", "Q", "K", "J"];

  let playersPoints = [];

  // HTML REFERENCES
  const askBtn = document.querySelector("#ask-card");
  const stopBtn = document.querySelector("#stop-game");
  const newGameBtn = document.querySelector("#new-game");
  const score = document.querySelectorAll("small");
  const divCardsPlayers = document.querySelectorAll(".cardDiv");

  const startGame = (numPlayers = 2) => {
    deck = createDeck();
    playersPoints = [];
    for (let i = 0; i < numPlayers; i++) {
      playersPoints.push(0);
      score[i].innerText = 0;
      divCardsPlayers[i].innerHTML = "";
    }

    score.forEach((element) => (element.innerText = 0));
    divCardsPlayers.forEach((element) => (element.innerHTML = ""));

    stopBtn.disabled = false;
    askBtn.disabled = false;
  };

  const createDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (const type of types) {
        deck.push(`${i}${type}`);
      }
    }

    for (const type of types) {
      for (const special of specialCards) {
        deck.push(`${special}${type}`);
      }
    }
    return _.shuffle(deck);
  };

  const askCard = () => {
    if (deck.length === 0) {
      throw "There is no card in the deck";
    }
    return deck.pop();
  };

  const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    return isNaN(value) ? (value === "A" ? 11 : 10) : parseInt(value, 10);
  };

  const accumulatePoints = (card, turn) => {
    playersPoints[turn] += cardValue(card);
    score[turn].innerText = playersPoints[turn];
    return playersPoints[turn];
  };

  const createCard = (card, turn) => {
    const newCard = document.createElement("img");
    newCard.src = `assets/cartas/${card}.png`;
    newCard.classList.add("player-card");
    divCardsPlayers[turn].append(newCard);
  };

  const determineWinner = () => {
    const [minPoints, computerPoints] = playersPoints;
    setTimeout(() => {
      if (computerPoints === minPoints) {
        alert("Nobody wins :(");
      } else if (
        minPoints > 21 ||
        (computerPoints <= 21 && computerPoints > minPoints)
      ) {
        alert("Computer wins!");
      } else {
        alert("Player wins!");
      }
    }, 400);
  };

  const computerTurn = (minPoints) => {
    let computerPoints = 0;
    do {
      const card = askCard();
      computerPoints = accumulatePoints(card, playersPoints.length - 1);
      createCard(card, playersPoints.length - 1);
    } while (computerPoints < minPoints && minPoints <= 21);

    determineWinner();
  };

  askBtn.addEventListener("click", () => {
    const card = askCard();
    const playerPoints = accumulatePoints(card, 0);

    createCard(card, 0);

    if (playerPoints > 21) {
      askBtn.disabled = true;
      stopBtn.disabled = true;
      computerTurn(playerPoints);
    } else if (playerPoints === 21) {
      askBtn.disabled = true;
      stopBtn.disabled = true;
      computerTurn(playerPoints);
    }
  });

  stopBtn.addEventListener("click", () => {
    askBtn.disabled = true;
    stopBtn.disabled = true;
    computerTurn(playersPoints[0]);
  });

  newGameBtn.addEventListener("click", () => {
    startGame();
  });

  return {
    newGame: startGame,
  };
})();
