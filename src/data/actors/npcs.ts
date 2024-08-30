import {Actor, ActorMin} from "../../types/Actor";
import Colors from "../../types/Colors";
import hydrateActorsInterator from "../../utils/hydrateActorsInterator";

const unsortedNPCsActorData: ActorMin[] = [
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

const unsortedNPCs: Actor[] = unsortedNPCsActorData.map(hydrateActorsInterator)

export default unsortedNPCs