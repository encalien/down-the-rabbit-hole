export enum Type {
  ATTACK = 'attack',
  SKILL = 'skill',
  POWER = 'power'
}

export class Card {
  type: Type;
  title: string;
  description: string;

  constructor(type: Type, title: string, description: string) {
    this.type = type;
    this.title = title;
    this.description = description;
  }
}
