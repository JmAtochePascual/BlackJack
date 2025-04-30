class Game {

  constructor() {
    this.deck = [];
    this.playerCards = [];
    this.computerCards = [];
    this.playerPoints = 0;
    this.computerPoints = 0;
    this.maxPoint = 21;
    this.winnerMessage = '';
    this.computerShift = false;

    this.loadDeck();
  };

  loadDeck() {
    this.createDeck();
    this.shuffleDeck();
  };

  createDeck() {
    const types = ['C', 'D', 'H', 'S'];
    const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'Q', 'K'];

    for (const card of cards) {
      for (const type of types) {
        this.deck.push(card + type);
      };
    };
  };

  shuffleDeck() {
    this.deck = this.deck.sort(() => 0.5 - Math.random());
  };

  addCard() {
    const card = this.deck.pop();
    this.computerShift
      ? this.computerCards = [...this.computerCards, card]
      : this.playerCards = [...this.playerCards, card];

    this.increasePoint(card);
  };

  increasePoint(card) {
    this.computerShift
      ? this.computerPoints += +card.slice(0, -1) ? Number(card.slice(0, -1)) : 10
      : this.playerPoints += +card.slice(0, -1) ? Number(card.slice(0, -1)) : 10;
  };

  validateWinner() {
    if (this.playerPoints === this.computerPoints) {
      this.winnerMessage = 'Empate';
      return;
    };

    (this.playerPoints > this.maxPoint || (this.computerPoints > this.playerPoints && this.computerPoints <= this.maxPoint))
      ? this.winnerMessage = `Computer Winner`
      : this.winnerMessage = `Player Winner`;
  };

  newGame() {
    this.deck = [];
    this.playerCards = [];
    this.computerCards = [];
    this.playerPoints = 0;
    this.computerPoints = 0;
    this.computerShift = false;

    this.loadDeck();
  };
};

export default Game;