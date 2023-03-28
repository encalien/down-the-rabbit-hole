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
  playable: boolean = true;

  constructor(type: Type, title: string, description: string, effects: Effect[]) {
    this.type = type;
    this.title = title;
    this.description = description;
    this.effects = effects;
  }
}
