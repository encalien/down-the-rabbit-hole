import { Entity } from "../lib/models/entity";
import { EffectAction, Target } from "../lib/models/enums";

export const enemiesCollection: Entity[] = [
  new Entity(
    "The Cat",
    20,
    [
      [ { action: EffectAction.TAKE_DAMAGE, value: 6, target: Target.PLAYER } ],
      [ { action: EffectAction.GAIN_BLOCK, value: 5, target: Target.ENEMY } ]
    ]
  ),
  new Entity(
    "Queen of Hearts",
    30,
    [
      [ { action: EffectAction.TAKE_DAMAGE, value: 10, target: Target.PLAYER } ],
      [
        { action: EffectAction.TAKE_DAMAGE, value: 6, target: Target.PLAYER },
        { action: EffectAction.TAKE_DAMAGE, value: 6, target: Target.PLAYER }
      ],
      [ { action: EffectAction.GAIN_BLOCK, value: 8, target: Target.ENEMY } ]
    ]
  )
]