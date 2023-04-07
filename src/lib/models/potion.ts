import type { Effect } from "./effect";

export class Potion {
  id: number;
  title: string;
  description: string;
  effects: Effect[];

  constructor(id: number, title: string, description: string, effects: Effect[]) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.effects = effects;
  }
}
