import type { Target } from "./enums";

export interface Effect {
  action: string; // corresponds to method name
  value: number;
  target: Target;
}