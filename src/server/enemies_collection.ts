import { Target, type Effect } from "../lib/models/card";
import { Entity } from "../lib/models/entity";

export const enemiesCollection: Entity[] = [
  new Entity(
    "The Cat",
    20,
    [
      [ { action: "takeDamage", value: 6, target: Target.PLAYER } ],
      [ { action: "gainBlock", value: 5, target: Target.ENEMY } ]
    ]
  ),
  new Entity(
    "Queen of Hearts",
    30,
    [
      [ { action: "takeDamage", value: 10, target: Target.PLAYER } ],
      [
        { action: "takeDamage", value: 6, target: Target.PLAYER },
        { action: "takeDamage", value: 6, target: Target.PLAYER }
      ],
      [ { action: "gainBlock", value: 8, target: Target.ENEMY } ]
    ]
  )
]