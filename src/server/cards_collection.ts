import { Type, Card } from "../models/card";

export const cardCollection: Card[] = [
  new Card(
    Type.ATTACK,
    "Strike",
    "Deal 6 damage."
    ),
  new Card(
    Type.SKILL,
    "Defend",
    "Gain 5 block."
  ),
  new Card(
    Type.POWER,
    "Deep pockets",
    "Draw one more card."
  )
]