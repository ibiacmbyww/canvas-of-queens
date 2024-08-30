import { ActorMin } from "../types/Actor"
import rollDice from "./rollDice"

const hydrateActorsInterator = (actor: ActorMin) => {
  return {
    ...actor,
    id: Math.round(Math.random() * Number.MAX_SAFE_INTEGER),
    moveRemaining: actor.moveFt,
    currentHP: actor.hp,
    initiative: rollDice(20) + actor.initiativeModifier,
    moveRadiusFt: undefined,
    highlighted: false,
    isDeleted: false,
  }
}

export default hydrateActorsInterator