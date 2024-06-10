
let deck = [];
const types = ['C', 'D', 'H', 'S']
const specialCards = ['A', 'Q', 'K', 'J']

let playerPoints = 0;
let computerPoints = 0;

// HTML REFERENCE
const askBtn = document.querySelector('#ask-card');
const stopBtn = document.querySelector('#stop-game');
const newGameBtn = document.querySelector('#new-game');
let score = document.querySelectorAll('small');
let playerCards = document.querySelector('#player-cards');
let computerCards = document.querySelector('#pc-cards');

const createDeck = () => {
  for (let i = 2; i <= 10; i++) {
    
    for (const type of types) {
      deck = [...deck, `${i}${type}`]
    }
  }

  for (const type of types) {
      for (const special of specialCards) {
          deck = [...deck, `${special}${type}`]
      }
  }
  return deck = _.shuffle(deck)
}

createDeck()

const askCard = () => {
  if (deck.length === 0) {
    throw 'There is not card in deck'
  }

  const card = deck.pop()
  return card;
}

askCard()

const cardValue = (card) => {
  const value = card.substring(0, card.length - 1)
  if (isNaN(value)) {
   return (value === 'A') ? 11 : 10
  } else {
   return  value * 1
  }
}

cardValue(askCard())

const computerTurn = (minPoints) => {
    do {
      const card = askCard()
      computerPoints = computerPoints + cardValue(card)
      score[1].innerText = computerPoints;

      const newCard = document.createElement('img');
      newCard.src=`assets/cartas/${card}.png`;
      newCard.classList.add('player-card');

      computerCards.append(newCard);

      if (minPoints > 21) {
        break;
      }
      
    } while ((computerPoints < minPoints) && (minPoints <= 21));
    setTimeout(() => {
        computerPoints === minPoints 
        ? alert('Nobody wins :(') 
        : minPoints > 21 ? 
        alert('You lost!') : 
        computerPoints > 21 ? 
        alert('Player wins') 
        : alert('Computer wins!')
    }, 10);
}

askBtn.addEventListener('click', (event)=> {
  const card = askCard()
  playerPoints = playerPoints + cardValue(card)
  score[0].innerText = playerPoints;
  askBtn.disabled = playerPoints > 21;

  const newCard = document.createElement('img');
  newCard.src=`assets/cartas/${card}.png`;
  newCard.classList.add('player-card');

  playerCards.append(newCard);

  if (playerPoints > 21 ) {
    console.warn('Sorry, you lost :(')
    askBtn.disabled = true;
    stopBtn.disabled = true;
    computerTurn(playerPoints)
  } else if (playerPoints === 21) {
    console.warn('21, genial!')
    computerTurn(playerPoints)
    askBtn.disabled = true;
    stopBtn.disabled = true;
  }
  
});


stopBtn.addEventListener('click', ()=> {
  stopBtn.disabled = true;
  askBtn.disabled = true;

  computerTurn(playerPoints)
});

newGameBtn.addEventListener('click', ()=> {
  console.clear()
  deck = []
  deck = createDeck();

  stopBtn.disabled = false;
  askBtn.disabled =  false;

  playerCards = 0; 
  computerPoints = 0;

  score[0].innerText = 0;
  score[1].innerText = 0;

  computerCards.innerHTML = '';
  playerCards.innerHTML = '';
});