export enum Type {
  ATTACK = 'attack',
  SKILL = 'skill',
  POWER = 'power'
}

export enum Target {
  PLAYER = 'player',
  ENEMY = 'enemy',
  GAME = 'game'
}

export interface Effect {
  action: string; // corresponds to method name
  value: number;
  target: Target;
}

export class Card {
  type: Type;
  title: string;
  description: string;
  effects: Effect[];
  isPlayable: boolean = true;
  isPlayableThisTurn: boolean = false;
  cost: number;

  constructor(type: Type, title: string, description: string, cost: number, effects: Effect[]) {
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
