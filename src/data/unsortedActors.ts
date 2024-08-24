import {Actor, ActorMin} from "../types/Actor";
import Colors from "../types/Colors";
import rollDice from "../utils/rollDice";

const unsortedActorsNoInGameData: ActorMin[] = [
  {
    id: 0,
    displayName: "Alicia",
    playerName: "Alice",
    color: Colors.Purple,
    moveFt: 25,
    isPlaced: false,
    posX: 2800,
    posY: 600,
    initiativeModifier: 7,
    initiativeTiebreaker: 4,
    team: 0,
    hp: 40,
  },
  {
    id: 3,
    displayName: "Goblin Inventor",
    playerName: "Eowyn",
    color: Colors.Blue,
    moveFt: 25,
    isPlaced: true,
    posX: 2800,
    posY: 800,
    initiativeModifier: 7,
    initiativeTiebreaker: 4,
    team: 0,
    hp: 40,
  },
  {
    id: 4,
    displayName: "Malian",
    playerName: "Ash",
    color: Colors.Green,
    moveFt: 25,
    isPlaced: true,
    posX: 2800,
    posY: 1700,
    initiativeModifier: 7,
    initiativeTiebreaker: 4,
    team: 0,
    hp: 40,
  },
  {
    id: 5,
    displayName: "Mama Paws",
    playerName: "Mozelle",
    color: Colors.Magenta,
    moveFt: 25,
    isPlaced: true,
    posX: 2900,
    posY: 600,
    initiativeModifier: 7,
    initiativeTiebreaker: 4,
    team: 0,
    hp: 40,
  },
  {
    id: 1,
    displayName: "Lt. Silbok",
    playerName: "GM",
    color: Colors.Vermilion,
    moveFt: 35,
    isPlaced: true,
    posX: 4200,
    posY: 800,
    initiativeModifier: 9,
    initiativeTiebreaker: 4,
    team: 1,
    hp: 47,
  },
  {
    id: 2,
    displayName: "Sgt. Bayez",
    playerName: "GM",
    color: Colors.Red,
    moveFt: 20,
    isPlaced: true,
    posX: 3500,
    posY: 1200,
    initiativeModifier: 5, // 9 = initiativeModifier
    initiativeTiebreaker: 3,
    team: 1,
    hp: 40,
  }
]

const unsortedActors: Actor[] = unsortedActorsNoInGameData.map(
  (actor) => {
    return {
      ...actor,
      moveRemaining: actor.moveFt,
      currentHP: actor.hp,
      initiative: rollDice(20) + actor.initiativeModifier,
      moveRadiusFt: undefined,
      highlighted: false,
      isDeleted: false,
    }
  }
)

export default unsortedActors