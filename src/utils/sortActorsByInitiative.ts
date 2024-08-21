import Actor from "../types/Actor";
import rollDice from "./rollDice";

const sortActorsByInitiative = (actors: Actor[]): Actor[] => {
  const tempActors = [...[], ...actors];
  tempActors.sort(
    (a, b) => {
      if (typeof a.initiative === "number" && typeof b.initiative === "number") {
        const aIni = a.initiative ?? 0
        const bIni = b.initiative ?? 0
        if (bIni - aIni < 0) {
          return -1
        }
        if (bIni - aIni > 0) {
          return 1
        } else {
            //determine
          const aMod = a.initiativeModifier ?? 0
          const bMod = b.initiativeModifier ?? 0
          if (bMod - aMod < 0) {
            return -1
          }
          if (bMod - aMod > 0) {
            return 1
          } else {
            const aTie = a.initiativeTiebreaker ?? 0
            const bTie = b.initiativeTiebreaker ?? 0
            if (bTie - aTie < 0) {
              return -1
            }
            if (bTie - aTie > 0) {
              return 1
            } else {
              let resolved = false
              let aDice = rollDice(20)
              let bDice = rollDice(20)
              while (!resolved) {
                resolved = aDice !== bDice
                aDice = rollDice(20)
                bDice = rollDice(20)
              }
              return bDice - aDice
            }
          }
        }
      } else {
        return -1
      }
    }
  )

  return tempActors
}

export default sortActorsByInitiative