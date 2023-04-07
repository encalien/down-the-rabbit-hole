import { cardCollection } from '../../server/cards_collection';
import { Card } from './card';
import { Entity } from './entity';
import { enemiesCollection } from '../../server/enemies_collection';
import { randomize } from '../utils';
import { Phase, Target } from './enums';

export class Game {
  // game config
  maxLevel: number = 2;

  // default new game setup
  maxHandSize: number = 10;
  defaultHandSize: number = 5;
  level: number = 0;
  inProgress: boolean;
  defaultActionPoints: number = 3;

  // card piles
  deck: Card[] = [];
  hand: Card[] = [];
  drawPile: Card[] = [];
  discardPile: Card[] = [];

  // set per combat
  turn: number;
  handSize: number;

  // set per turn
  currentMaxActionPoints: number;
  availableActionPoints: number;

  // entities
  player: Entity = new Entity("Alice", 70);
  enemy: Entity;

  phase: Phase;

  /**
   * Create a game object from the player's cookie, or initialise a new game
   */
  constructor(storedCurrentGame?: string) {
    if (storedCurrentGame) {
      const currentGame = JSON.parse(storedCurrentGame);
      this.level = currentGame.round;
      this.deck = currentGame.deck;
      this.handSize = currentGame.handSize;
    } else {
      this.setStartingDeck();
      this.startLevel();
      this.inProgress = true;
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
    console.log(".....Starting new level");
    const nextEnemy = enemiesCollection[this.level];
    this.enemy = new Entity(nextEnemy.name, nextEnemy.maxHealth, nextEnemy.actions);
    this.level++;
    this.phase = Phase.COMBAT;
    this.resetPiles();
    this.turn = 0;
    this.handSize = this.defaultHandSize;
    this.currentMaxActionPoints = this.defaultActionPoints;
    this.availableActionPoints = this.currentMaxActionPoints;
    this.startTurn();
  }

  /**
   * End current level
   */
  endLevel(): void {
    if (this.level === this.maxLevel) {
      this.inProgress = false;
      this.phase = Phase.END;
    } else {
      console.log("Level complete!");
      this.phase = Phase.REWARD;
    }
  }

  /**
   * Start turn
   */
  startTurn(): void {
    this.turn++;
    this.availableActionPoints = this.currentMaxActionPoints;
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
    const strike = cardCollection.find(card => card.title === "Strike");
    const defend = cardCollection.find(card => card.title === "Defend");
    for (let i = 0; i < 5; i++) {
      this.addCardToDeck(strike);
      this.addCardToDeck(defend)
    }
  }

  /**
   * Shuffle discard pile into draw pile
   */
  shuffleDeck(): void {
    const discardPile: Card[] = randomize(this.discardPile);
    const drawPile: Card[] = this.drawPile;
    this.drawPile = discardPile.concat(drawPile);
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
    card.determinePlayableThisTurn(this.availableActionPoints);
  }

  /**
   * Discard card
   * @param {Card} card card to discard
   */
  discardCard(card: Card): void {
    card.isPlayableThisTurn = false;
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
    this.availableActionPoints -= card.cost;
    for (const effect of card.effects) {
      const target = effect.target === Target.GAME ? this : this[effect.target];
      target[effect.action](effect.value);
      if (this.checkIfLevelComplete()) return this.endTurn();
    }
    this.discardCard(card);
    this.hand.forEach(c => c.determinePlayableThisTurn(this.availableActionPoints));
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
      if (this.checkIfGameLost()) {
        this.inProgress = false;
        this.phase = Phase.END;
        return;
      }
    }
  }

  /**
   * Add new card to deck
   * @param {Card} card card to add
   */
  addCardToDeck(card: Card): void {
    this.deck.push(
      new Card(this.deck.length, card.type, card.title, card.description, card.cost, card.effects)
    );
  }

  /**
   * Remove a card from deck
   * @param {Card} card card to remove
   */
  removeCardFromDeck(card: Card): void {
    const cardInd = this.deck.findIndex(c => c === card);
    this.deck.splice(cardInd, 1);
  }
}
