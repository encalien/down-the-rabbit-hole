import { cardCollection } from '../server/cards_collection';
import type { Card } from '../models/card';
import { Entity } from './entity';

export class Game {
  // default new game setup
  maxHandSize: number = 10;
  gameHandSize: number = 5;
  level: number = 0;

  // deck piles
  deck: Card[] = [];
  hand: Card[] = [];
  drawPile: Card[] = [];
  discardPile: Card[] = [];

  // set per combat
  turn: number;
  handSize: number;

  // entities
  player: Entity = new Entity("Alice", 70);
  enemy: Entity;

  /**
   * Create a game object from the player's cookie, or initialise a new game
   */
  constructor(storedCurrentGame: string | undefined = undefined) {
    if (storedCurrentGame) {
      const currentGame = JSON.parse(storedCurrentGame);
      this.level = currentGame.round;
      this.deck = currentGame.deck;
      this.handSize = currentGame.handSize;
    } else {
      this.setStartingDeck();
      this.drawPile = Object.assign(this.drawPile, this.deck);
      this.startLevel();
    }
  }

  /**
   * Start new level
   */
  startLevel(): void {
    this.level++;
    this.enemy = new Entity("Queen of Hearts", 20);
    this.turn = 0;
    this.handSize = this.gameHandSize;
    this.startTurn();
  }

  /**
   * Start turn
   */
  startTurn(): void {
    this.turn++;
    this.drawHand();
  }

  /**
   * End turn
   */
  endTurn(): void {
    this.clearHand();
    this.startTurn();
  }

  /**
   * Set starting deck
   */
  setStartingDeck(): void {
    for (let i = 0; i < 5; i++) {
      const strike = cardCollection.find(card => card.title === "Strike");
      const defend = cardCollection.find(card => card.title === "Defend");
      this.deck.push(strike, defend);
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
  
  /**
   * Update hand size
   * @param quantity number of cards by which to adjust hand size
   */
  updateHandSize(quantity: number): void {
    this.handSize += quantity;
    if (this.handSize > this.maxHandSize) this.handSize = this.maxHandSize;
  }
}
