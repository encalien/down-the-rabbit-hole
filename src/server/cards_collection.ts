import { Card } from "../lib/models/card";
import { EffectAction, Target, Type } from "../lib/models/enums";

export const cardCollection: Card[] = [
  new Card(
    null,
    Type.ATTACK, 
    "Strike", 
    "Deal 6 damage.",
    1,
    [
      { action: EffectAction.TAKE_DAMAGE, value: 6, target: Target.ENEMY }
    ]
  ),
  new Card(
    null,
    Type.SKILL,
    "Defend",
    "Gain 5 block.",
    2,
    [
      { action: EffectAction.GAIN_BLOCK, value: 5, target: Target.PLAYER }
    ]
  ),
  new Card(
    null,
    Type.POWER,
    "Deep pockets",
    "Until end of combat draw one more card at the start of turn.",
    3,
    [
      { action: EffectAction.UPDATE_HAND_SIZE, value: 1, target: Target.GAME }
    ]
  )
]