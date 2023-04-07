import type { Effect } from "./effect";
import type { Type } from "./enums";

export class Card {
  id: number;
  type: Type;
  title: string;
  description: string;
  effects: Effect[];
  isPlayable: boolean = true;
  isPlayableThisTurn: boolean = false;
  cost: number;

  constructor(id: number, type: Type, title: string, description: string, cost: number, effects: Effect[]) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.description = description;
    this.effects = effects;
    this.cost = cost;
  }

  /**
   * Determine if this card can be played this turn
   * @param {number} availableActionPoints number of available action points this turn
   */
  determinePlayableThisTurn(availableActionPoints): void {
    this.isPlayableThisTurn = this.isPlayable && availableActionPoints >= this.cost;
  }
}
