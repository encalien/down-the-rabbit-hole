export enum Type {
  ATTACK = 'attack',
  SKILL = 'skill',
  POWER = 'power'
}

export enum Pile {
  DRAW = 'draw',
  HAND = 'hand',
  DISCARD = 'discard'
}

export class Card {
  type: Type;
  title: string;
  description: string;
  imgSrc: string = "";
  pile: Pile = Pile.DRAW;

  constructor(type: Type, title: string, description: string) {
    this.type = type;
    this.title = title;
    this.description = description;
  }
}
