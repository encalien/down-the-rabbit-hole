import { Type, Card, Target } from "../models/card";

export const cardCollection: Card[] = [
  new Card(
    Type.ATTACK, 
    "Strike", 
    "Deal 6 damage.",
    [
      { action: "takeDamage", value: 6, target: Target.ENEMY }
    ]
  ),
  new Card(
    Type.SKILL,
    "Defend",
    "Gain 5 block.",
    [
      { action: "gainBlock", value: 5, target: Target.PLAYER }
    ]
  ),
  new Card(
    Type.SKILL,
    "Deep pockets",
    "Until end of combat draw one more card at the start of turn.",
    [
      { action: "updateHandSize", value: 1, target: Target.GAME }
    ]
  )
]