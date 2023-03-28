import { Type, Card } from '../models/card';
import { Entity } from './entity';

export class Game {
  // default new game setup
  handSize: number = 5;
  round: number = 1;

  // deck piles
  deck: Card[] = [];
  hand: Card[] = [];
  drawPile: Card[] = [];
  discardPile: Card[] = [];

  // counters
  turn: number = 1;

  // entities
  player: Entity = new Entity("Alice", 70);
  enemy: Entity = new Entity("Queen of Hearts", 20);

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
      this.drawPile = Object.assign(this.drawPile, this.deck);
    }
  }

  /**
   * End turn
   */
  endTurn(): void {
    this.turn++;
    this.clearHand();
    this.drawHand();
  }

  /**
   * Set starting deck
   */
  setStartingDeck(): void {
    for (let i = 0; i < 5; i++) {
      this.deck.push(new Card(Type.ATTACK, `Strike ${i}`, "Deal 6 damage."));
      this.deck.push(new Card(Type.SKILL, `Defend ${i}`, "Gain 5 block."));
    }
  }

  /**
   * Shuffle discard pile into draw pile
   */
  shuffleDeck(): void {
    const discardPile: Card[] = this.discardPile.sort(() => Math.random() - 0.5);
    this.drawPile = Object.assign(discardPile, this.drawPile);
    this.discardPile = [];
  }

  /**
   * Draw new hand
   */
  drawHand(): void {
    if (this.drawPile.length < this.handSize) this.shuffleDeck();

    for (let i = 0; i < this.handSize; i++) {
      this.drawCard();
    }
  }

  /**
   * Clear hand
   */
  clearHand(): void {
    const handCount = this.hand.length;
    for (let i = 0; i < handCount; i++) {
      this.discardCard();
    }
  }

  /**
   * Draw card
   */
  drawCard(): void {
    const card = this.drawPile.pop();
    this.hand.push(card);
  }

  /**
   * Discard card
   */
  discardCard(): void {
    const card = this.hand.pop();
    this.discardPile.push(card);
  }
}
