import { cardCollection } from '../server/cards_collection';
import type { Card } from '../models/card';
import { Entity } from './entity';
import { enemiesCollection } from '../server/enemies_collection';

export class Game {
  // game config
  maxLevel: number = 2;

  // default new game setup
  maxHandSize: number = 10;
  gameHandSize: number = 5;
  level: number = 0;

  // card piles
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
      this.startLevel();
    }
  }

  /**
   * Reset draw pile
   */
  resetPiles(): void {
    this.drawPile = Object.assign([], this.deck);
    this.hand = [];
    this.discardPile = [];
  }

  /**
   * Start new level
   */
  startLevel(): void {
    this.enemy = enemiesCollection[this.level];
    this.level++;
    this.resetPiles();
    this.turn = 0;
    this.handSize = this.gameHandSize;
    this.startTurn();
  }

  /**
   * End current level
   */
  endLevel(): void {
    if (this.level === this.maxLevel) {
      console.log("Victory!")
    } else {
      console.log("Level complete!\n.....Starting new level");
      this.startLevel();
    }
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
    if (this.checkIfLevelComplete()) {
      this.endLevel();
    } else {
      this.enemy.endTurn();
      this.processEnemyTurn();
      if (!this.checkIfGameLost()) {
        this.player.endTurn();
        this.startTurn();
      }
    }
  }

  /**
   * Check win conditions of current level
   * @returns {boolean} true if level ended in a win, false if level in progress
   */
  checkIfLevelComplete(): boolean {
    if (this.enemy.currentHealth <= 0) return true;
    return false;
  }

  /**
   * Check game lose conditions
   * @returns {boolean} true if game is lost, false if game in progress
   */
  checkIfGameLost(): boolean {
    if (this.player.currentHealth <= 0) return true;
    return false;
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
    const handCount: number = this.hand.length;
    for (let i = 0; i < handCount; i++) {
      const card: Card = this.hand.pop();
      this.discardPile.push(card);
    }
  }

  /**
   * Draw card
   */
  drawCard(): void {
    const card:Card = this.drawPile.pop();
    this.hand.push(card);
  }

  /**
   * Discard card
   * @param {Card} card card to discard
   */
  discardCard(card: Card): void {
    const cardIndex: number = this.hand.indexOf(card);
    this.discardPile.push(card);
    this.hand.splice(cardIndex, 1);
  }
  
  /**
   * Update hand size
   * @param {number} quantity number of cards by which to adjust hand size
   */
  updateHandSize(quantity: number): void {
    this.handSize += quantity;
    if (this.handSize > this.maxHandSize) this.handSize = this.maxHandSize;
  }
    
  /**
   * Play card
   * @param {Card} card card to play
   */
  playCard(card: Card): void {
    for (const effect of card.effects) {
      this[effect.target][effect.action](effect.value);
      if (this.checkIfLevelComplete()) return this.endTurn();
    }
    this.discardCard(card);
  }
  
  /**
   * Process enemy turn
   */
  processEnemyTurn(): void {
    const actionIndex = (this.turn - 1) % this.enemy.actions.length;
    const nextAction = this.enemy.actions[actionIndex];
    console.log(nextAction)
    for (const effect of nextAction) {
      this[effect.target][effect.action](effect.value);
      if (this.checkIfGameLost()) return console.log("Game Over");
    }
  }
}
