import { Type, Card, Pile } from '../models/card';

export class Game {
  // default new game setup
  handSize: number = 5;
  round: number = 1;

  // deck piles
  deck: Card[] = [];
  hand: Card[] = [];
  drawPile: Card[] = [];
  discardPile: Card[] = [];


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
      this.drawPile = Object.assign([], this.deck);
    }
  }

  /**
   * End turn
   */
  endTurn(): void {
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
    const drawPile = this.getDrawPileCards(this.deck);
    const discardPile: Card[] = this.getDiscardPileCards(this.deck)
      .sort(() => Math.random() - 0.5)
      .map(c => c.setPile(Pile.DRAW));

    this.drawPile = Object.assign(discardPile, drawPile);
    this.discardPile = [];
  }

  /**
   * Draw new hand
   */
  drawHand(): void {
    if (this.drawPile.length < this.handSize) this.shuffleDeck();

    for (let i = 0; i < this.handSize; i++) {
      const card = this.drawPile.pop();
      this.drawCard(card);
    }
  }

  /**
   * Clear hand
   */
  clearHand(): void {
    const handCount = this.hand.length
    for (let i = 0; i < handCount; i++) {
      const card = this.hand.pop();
      this.discardCard(card);
    }
  }

  /**
   * Draw card
   */
  drawCard(card): void {
    card.setPile(Pile.HAND);
    this.hand.push(card);
  }

  /**
   * Discard card
   */
  discardCard(card): void {
    card.setPile(Pile.DISCARD);
    this.discardPile.push(card);
  }

  /**
   * Update current draw pile
   * @param pile pile from which to filter new selection
   */
  getDrawPileCards(pile): Card[] {
    return pile.filter(card => card.pile === Pile.DRAW);
  }

  /**
   * Update current hand
   * @param pile pile from which to filter new selection
   */
  getHandCards(pile): Card[] {
    return pile.filter(card => card.pile === Pile.HAND);
  }

  /**
   * Update current discard pile
   * @param pile pile from which to filter new selection
   */
  getDiscardPileCards(pile): Card[] {
    return pile.filter(card => card.pile === Pile.DISCARD);
  }
}
