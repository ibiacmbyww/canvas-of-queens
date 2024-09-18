import {Actor, ActorMin} from "../../types/Actor";
import Colors from "../../types/Colors";
import hydrateActorsInterator from "../../utils/hydrateActorsInterator";
import rollDice from "../../utils/rollDice";

const unsortedPlayerActorData: ActorMin[] = [
  {
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
    displayName: "Kiinda",
    playerName: "Eowyn",
    color: Colors.Green,
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
    displayName: "Malina",
    playerName: "Ash",
    color: Colors.Blue,
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
    displayName: "Numbers",
    playerName: "Dean",
    color: Colors.Black,
    moveFt: 25,
    isPlaced: true,
    posX: 1500,
    posY: 600,
    initiativeModifier: 7,
    initiativeTiebreaker: 4,
    team: 0,
    hp: 40,
  },
  {
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
    displayName: "Sgt. Bayez",
    playerName: "GM",
    color: Colors.Red,
    moveFt: 20,
    isPlaced: true,
    posX: 3500,
    posY: 1200,
    initiativeModifier: 5,
    initiativeTiebreaker: 3,
    team: 1,
    hp: 40,
  }
]

const unsortedPlayers: Actor[] = unsortedPlayerActorData.map(hydrateActorsInterator)

export default unsortedPlayers