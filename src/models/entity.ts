import type { Effect } from "./card";

class Entity {
  name: string;
  maxHealth: number;
  currentHealth: number;
  block: number = 0;
  actions: Effect[][] = [];

  constructor(name: string, maxHealth: number, actions?: Effect[][]) {
    this.name = name;
    this.maxHealth = maxHealth;
    this.currentHealth = this.maxHealth;
    this.actions = actions;
  }

  endTurn(): void {
    this.resetBlock();
  }

  gainBlock(block: number): void {
    this.block += block;
  }

  resetBlock(): void {
    this.block = 0;
  }

  takeDamage(damage: number): void {
    const unblockedDamage = damage - this.block;
    if (unblockedDamage <= 0) {
      this.block -= damage;
    } else {
      this.block = 0;
      this.currentHealth -= unblockedDamage;
    }
  }

  heal(hp: number) {
    this.currentHealth += hp;
    if (this.currentHealth > this.maxHealth) this.currentHealth = this.maxHealth;
  }

  resetHealth() {
    this.currentHealth = this.maxHealth;
  }

  updateMaxHealth(hp: number) {
    this.maxHealth += hp;
  }
}

export { Entity }