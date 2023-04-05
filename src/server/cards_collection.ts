import { Card } from "../lib/models/card";
import { Target, Type } from "../lib/models/enums";

export const cardCollection: Card[] = [
  new Card(
    Type.ATTACK, 
    "Strike", 
    "Deal 6 damage.",
    1,
    [
      { action: "takeDamage", value: 6, target: Target.ENEMY }
    ]
  ),
  new Card(
    Type.SKILL,
    "Defend",
    "Gain 5 block.",
    2,
    [
      { action: "gainBlock", value: 5, target: Target.PLAYER }
    ]
  ),
  new Card(
    Type.POWER,
    "Deep pockets",
    "Until end of combat draw one more card at the start of turn.",
    3,
    [
      { action: "updateHandSize", value: 1, target: Target.GAME }
    ]
  )
]