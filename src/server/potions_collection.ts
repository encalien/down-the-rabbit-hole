import { EffectAction, Target } from "../lib/models/enums";
import { Potion } from "../lib/models/potion";

export const potionCollection: Potion[] = [
  new Potion(
    null,
    "Eat me", 
    "Make yourself grow. Gain 2 strength.",
    [
      { action: EffectAction.UPDATE_STRENGTH, value: 2, target: Target.PLAYER }
    ]
  ),
  new Potion(
    null,
    "Drink me",
    "Shrink yourself. Escape this fight. Collect no rewards.",
    [
      { action: EffectAction.ESCAPE, value: 1, target: Target.GAME }
    ]
  )
]