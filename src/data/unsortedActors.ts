import Colors from "../types/Colors";
import rollDice from "../utils/rollDice";

const unsortedActors = [
  {
    id: 0,
    displayName: "Alicia",
    playerName: "Alice",
    color: Colors.Purple,
    moveFt: 25,
    isPlaced: false,
    posX: 700,
    posY: 600,
    highlighted: false,
    isDeleted: false,
    moveRadiusFt: undefined,
    initiative: rollDice(20) + 7, // 7 = initiativeModifier
    initiativeModifier: 7,
    initiativeTiebreaker: 4,
    team: 0,
    hp: 40,
    currentHP: 40,
  },
  {
    id: 1,
    displayName: "Lt. Silbok",
    playerName: "GM",
    color: Colors.Vermilion,
    moveFt: 35,
    isPlaced: true,
    posX: 1608,
    posY: 420,
    highlighted: false,
    isDeleted: false,
    moveRadiusFt: undefined,
    initiative: rollDice(20) + 9, // 9 = initiativeModifier
    initiativeModifier: 9,
    initiativeTiebreaker: 4,
    team: 1,
    hp: 47,
    currentHP: 47,
  },
  {
    id: 2,
    displayName: "Sgt. Bayez",
    playerName: "GM",
    color: Colors.Red,
    moveFt: 35,
    isPlaced: true,
    posX: 1400,
    posY: 280,
    highlighted: false,
    isDeleted: false,
    moveRadiusFt: undefined,
    initiative: rollDice(20) + 5,
    initiativeModifier: 5, // 9 = initiativeModifier
    initiativeTiebreaker: 3,
    team: 1,
    hp: 40,
    currentHP: 40,
  }
]
export default unsortedActors