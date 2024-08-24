import { MdPinDrop } from "react-icons/md";
import { IoMdMove } from "react-icons/io";
import {Actor} from "../../types/Actor";
import HPReadout from "../HPReadout/HPReadout";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";
import "./ActorButtons.scss"
import {ReactComponent as SprintIcon} from "./../../img/sprint.svg"
type ActorButtonsProps = {
  actor: Actor,
  setActors: React.Dispatch<React.SetStateAction<Actor[]>>,
  battleModeActive: boolean,
  battleModeTurnIndex: number | undefined,
  placeModeActorIndex: number | undefined,
  moveModeActorIndex: number | undefined,
  setInfoLayerHover: React.Dispatch<React.SetStateAction<JSX.Element | undefined>>,
  setInfoLayerMode: React.Dispatch<React.SetStateAction<JSX.Element | undefined>>,
  setPlaceModeActorIndex: React.Dispatch<React.SetStateAction<number | undefined>>,
  setPlaceMoveActive: React.Dispatch<React.SetStateAction<boolean>>,
  setMoveModeActorIndex: React.Dispatch<React.SetStateAction<number | undefined>>,
  setMoveModeMoveTooFar: React.Dispatch<React.SetStateAction<boolean>>,
  index: number
}

const ActorButtons = (
  {
    actor,
    setActors,
    battleModeActive,
    battleModeTurnIndex,
    placeModeActorIndex,
    moveModeActorIndex,
    setInfoLayerHover,
    setInfoLayerMode,
    setPlaceModeActorIndex,
    setPlaceMoveActive,
    setMoveModeActorIndex,
    setMoveModeMoveTooFar,
    index
  }: ActorButtonsProps
) => {
  return (
    <table className="ActorButtons">
      <tbody>
        <tr className="small-row">
          <td>HP</td>
          <td>*</td>
          <td>**</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <HPReadout
              hp={actor.hp}
              currentHP={actor.currentHP}
              setActors={setActors}
              index={index}
              isPlaced={actor.isPlaced} />
          </td>
          <td>
            {/***********************************MOVE BUTTON***********************************/}
            <button
              disabled={!actor.isPlaced
                || (typeof moveModeActorIndex   === "number" && moveModeActorIndex !== index)
                || (typeof placeModeActorIndex  === "number")
                || (battleModeActive && typeof battleModeTurnIndex === "number" && battleModeTurnIndex !== index)}
              onMouseEnter={()=> {
                if (typeof placeModeActorIndex !== "number" && typeof moveModeActorIndex !== "number") {
                  setInfoLayerHover(<>Move {actor.displayName} (max. {actor.moveFt}ft)</>)
                } else {
                  if (moveModeActorIndex === index) {
                    setInfoLayerMode(<>End Move mode</>)
                  }
                }
              }}
              onMouseLeave={()=> {
                if (!placeModeActorIndex && !moveModeActorIndex) {
                  setInfoLayerHover(undefined)
                } else {
                  if (moveModeActorIndex === index) {
                    setInfoLayerMode(<>Move {actor.displayName} (max. {actor.moveFt}ft)</>)
                  }
                }
              }}
              onClick={(e) => {
                e.nativeEvent.stopImmediatePropagation() //DO NOT REMOVE
                setPlaceMoveActive(false)
                if (moveModeActorIndex !== index) {
                  setMoveModeActorIndex(index)
                  //swap focus
                  setActors(
                    (prevActors) => {
                      return prevActors.map(
                        (prevActor, i) => {
                          return i === index
                            ? {
                              ...prevActor,
                              moveRadiusFt: battleModeActive
                                ? prevActor.moveRemaining
                                : prevActor.moveFt
                            }
                            : {
                              ...prevActor,
                              moveRadiusFt: undefined
                            }
                        }
                      )
                    }
                  )
                } else {
                  //end mode
                  setMoveModeActorIndex(undefined)
                  setInfoLayerHover(undefined)
                  setMoveModeMoveTooFar(false) //resets cursor
                  setActors(
                    (prevActors) => {
                      return prevActors.map(
                        (prevActor, i) => {
                          return {
                            ...prevActor,
                              moveRadiusFt: undefined
                          }
                        }
                      )
                    }
                  )
                }
              }}
            >
              <FaPersonWalkingArrowRight />
            </button>
          </td>
          <td>
            <button><SprintIcon /></button>
          </td>
          <td>
            {/***********************************PLACE BUTTON***********************************/}
            <button
              className={`place${typeof placeModeActorIndex === "number" && placeModeActorIndex === index ? " active" : ""}`}
              disabled={(typeof placeModeActorIndex === "number" && placeModeActorIndex !== index) || typeof moveModeActorIndex === "number"}
              onMouseEnter={()=> {
                if (typeof placeModeActorIndex !== "number" && typeof moveModeActorIndex !== "number") {
                  setInfoLayerHover(<>Place {actor.displayName}</>)
                } else {
                  if (placeModeActorIndex === index) {
                    setInfoLayerHover(<>End Place mode</>)
                  }
                }
              }}
              onMouseLeave={()=> {
                if (placeModeActorIndex !== index) {
                  if (typeof placeModeActorIndex !== "number" && typeof moveModeActorIndex !== "number") {
                    setInfoLayerHover(undefined)
                  }
                } else {
                  if (placeModeActorIndex === index) {
                    setInfoLayerHover(<>Placing {actor.displayName}</>)
                  } else {
                    if (moveModeActorIndex === index) {
                      setInfoLayerHover(<>Moving {actor.displayName}</>)
                    } else {
                      setInfoLayerHover(undefined)
                    }
                  }
                }
              }}
              onClick={(e) => {
                e.nativeEvent.stopImmediatePropagation() //DO NOT REMOVE
                if (placeModeActorIndex !== index) {
                  //swap focus to this actor
                  setInfoLayerMode(<>End Place mode</>)
                  setPlaceModeActorIndex(index)
                  setActors(
                    (prevActors) => {
                      return prevActors.map(
                        (prevActor, i) => {
                          return {
                            ...prevActor,
                            moveRadiusFt: placeModeActorIndex === index
                              ? prevActor.moveRadiusFt
                              : undefined
                          }
                        }
                      )
                    }
                  )
                } else {
                  //end mode
                  setPlaceModeActorIndex(undefined)
                  setInfoLayerHover(<>Place {actor.displayName}</>)
                  setActors(
                    (prevActors) => {
                      return prevActors.map(
                        (prevActor, i) => {
                          return {
                            ...prevActor,
                            moveRadiusFt: undefined
                          }
                        }
                      )
                    }
                  )
                }
              }}
            ><MdPinDrop /></button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default ActorButtons