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

export enum Phase {
  COMBAT = 'combat',
  REWARD = 'reward',
  END = 'end'
}

export enum EffectAction {
  TAKE_DAMAGE = 'takeDamage',
  GAIN_BLOCK = 'gainBlock',
  UPDATE_HAND_SIZE = 'updateHandSize',
  UPDATE_STRENGTH = 'updateStrength',
  ESCAPE = 'escape',
}