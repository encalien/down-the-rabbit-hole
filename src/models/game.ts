import { Type, Card, Pile } from '../models/card';

export default class Game {
  // default new game setup
  handSize: number = 5;
	round: number = 1;

	deck: Card[] = [];
  hand: Card[] = [];
  drawPile: Card[] = [];
  

	/**
	 * Create a game object from the player's cookie, or initialise a new game
	 */
	constructor(storedCurrentGame: string | undefined = undefined) {
    if (storedCurrentGame) {
      const currentGame = JSON.parse(storedCurrentGame);
      this.round = currentGame.round;
      this.deck = currentGame.deck;
      this.handSize = currentGame.handSize;
    } else {
      this.setStartingDeck();
      this.drawPile = this.deck;
    }
	}

	/**
	 * Set starting deck
	 */
	setStartingDeck(): void {
    for (let i = 0; i < 5; i++) {
      this.deck.push(new Card(Type.ATTACK, "Strike", "Deal 6 damage."));
      this.deck.push(new Card(Type.SKILL, "Defend", "Gain 5 block."));
    }
	}

  /**
	 * Draw new hand
	 */
  drawHand(): void {
    for (let i = 1; i <= this.handSize; i++) {
      this.drawPile[this.drawPile.length - i].pile = Pile.HAND;
    }
    this.hand = this.drawPile.filter(card => card.pile === Pile.HAND);
    this.drawPile = this.drawPile.filter(card => card.pile === Pile.DRAW);
  }
}