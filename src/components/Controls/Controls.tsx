import { MdPinDrop } from "react-icons/md"
import Actor from "../../types/Actor"
import { IoMdMove } from "react-icons/io"
import sortActorsByInitiative from "../../utils/sortActorsByInitiative"
import { FaBan, FaRegEdit } from "react-icons/fa"
import { FaArrowRight, FaExplosion } from "react-icons/fa6"
import "./Controls.scss";
import teams from "../../data/teams"
import { useMemo } from "react"

type ControlProps =   {
  showControls: boolean,
  zoomLevel: number,
  actors: Actor[],
  setActors: React.Dispatch<React.SetStateAction<Actor[]>>,
  placeModeActorIndex: number | undefined,
  setPlaceModeActorIndex: React.Dispatch<React.SetStateAction<number | undefined>>,
  setPlaceMoveActive: React.Dispatch<React.SetStateAction<boolean>>,
  moveModeActorIndex: number | undefined,
  setMoveModeActorIndex: React.Dispatch<React.SetStateAction<number | undefined>>,
  setMoveModeMoveTooFar: React.Dispatch<React.SetStateAction<boolean>>,
  battleModeActive: boolean,
  setBattleModeActive: React.Dispatch<React.SetStateAction<boolean>>,
  setEditCharactersMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  setInfoLayerHover: React.Dispatch<React.SetStateAction<JSX.Element | undefined>>
  setInfoLayerMode: React.Dispatch<React.SetStateAction<JSX.Element | undefined>>
  battleModeTurnIndex: number | undefined,
  setBattleModeTurnIndex: React.Dispatch<React.SetStateAction<number | undefined>>
}

const Controls = (
  {
    showControls,
    zoomLevel,
    actors,
    setActors,
    placeModeActorIndex,
    setPlaceModeActorIndex,
    setPlaceMoveActive,
    moveModeActorIndex,
    setMoveModeActorIndex,
    setMoveModeMoveTooFar,
    battleModeActive,
    setBattleModeActive,
    setEditCharactersMenuOpen,
    setInfoLayerHover,
    setInfoLayerMode,
    battleModeTurnIndex,
    setBattleModeTurnIndex
  }: ControlProps
) => {
  const hasPlaced = useMemo(
    () => {
      return actors.findIndex(
        (actor) => {
          return actor.isPlaced
        }
      ) !== -1
    },
    [actors]
  )

  return (
    <div className="Controls" style={{display: showControls ? "block" : "none"}}>
      <div className="wrapper">
        {/* {customMessage} */}
        <h3>Map Zoom: {zoomLevel.toFixed(2)}</h3>
        <div className="actors-list-section">
          {/* <h1>Characters</h1> */}
          <ul>
            {actors.length
              ? actors.map(
                  (actor, index, arr) => {
                    debugger;
                    const li = (
                      <li
                        className={`${actor.isPlaced ? "" : "not-placed"} ${battleModeActive && typeof battleModeTurnIndex === "number" && battleModeTurnIndex === index ? "is-current-turn" : ""}`}
                        key={actor.id}
                        onMouseEnter={()=> {
                          if (actor.isPlaced) {
                            setActors((prevActors) => {
                              return prevActors.map((prevActor, i) => {
                                if (i === index) {
                                  return {
                                    ...prevActor,
                                    highlighted: true
                                  }
                                }
                                return prevActor;
                              });
                            })
                          }
                        }}
                        onMouseLeave={()=> {
                          if (actor.isPlaced) {
                            setActors((prevActors) => {
                              return prevActors.map((prevActor, i) => {
                                if (i === index) {
                                  return {
                                    ...prevActor,
                                    highlighted: false
                                  }
                                }
                                return prevActor;
                              });
                            })
                          }
                        }}
                      >
                        <span
                          className="blob"
                          style={
                            {
                              background: actor.color,
                              borderColor: (teams[actor.team].color ?? "grey") as string}}
                          ></span>
                        <span className="name">
                          {actor.displayName}
                        </span>
                        <small>{actor.playerName}</small>
                        <div className="actor-buttons">
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
                                            moveRadiusFt: prevActor.moveFt
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
                            <IoMdMove />
                          </button>
                          {/* <button
                            disabled={!actor.isPlaced}
                            onClick={()=> {
                              setBattleModeActive(!battleModeActive)
                            }}
                            >🗡️</button> */}
                        </div>
                      </li>
                    )
                    const breaker = (
                      <li className="init-breaker">
                        <span>
                          {arr[index].initiative}
                        </span>
                      </li>
                    )
                    return battleModeActive
                      ? index === 0
                        ? (
                            <>
                              {breaker}
                              {li}
                            </>
                          )
                        : arr[index].initiative < arr[index - 1].initiative
                          ? (
                              <>
                                {breaker}
                                {li}
                              </>
                            )
                          : li
                      : li
                      
                  }
                )
              : <li className="empty">None</li>
            }
          </ul>
          <button
            disabled={typeof moveModeActorIndex === "number" || typeof placeModeActorIndex === "number"}
            onClick={() => {
              setEditCharactersMenuOpen(true)
            }}
          >
            <FaRegEdit /> Edit Characters
          </button>
          <button
            disabled={!hasPlaced || typeof moveModeActorIndex === "number" || typeof placeModeActorIndex === "number"}
            onClick={() => {
              const newBattleModeActive = !battleModeActive
              setBattleModeActive(newBattleModeActive)
              const sortedActors = sortActorsByInitiative(actors)
              if (newBattleModeActive) {
                //turning on
                setActors(sortedActors)
              } else {
                //turning off
              }
            }}
          >
            {battleModeActive
              ? <><FaBan /> End Combat</>
              : <><FaExplosion /> Start Combat</>
            }
          </button>
          {battleModeActive && (
            <div>
              <button
                onClick={() => {
                  if (typeof battleModeTurnIndex === "number" && battleModeTurnIndex < actors.length) {
                    const nextPlacedActorIndex = actors.findIndex(
                      (actor, i) => {
                        return i > battleModeTurnIndex && actor.isPlaced
                      }
                    )
                    if (nextPlacedActorIndex !== -1) {
                      setBattleModeTurnIndex(nextPlacedActorIndex)
                    } else {
                      const nextPlacedActorIndex = actors.findIndex(
                        (actor, i) => {
                          return i <= battleModeTurnIndex && actor.isPlaced
                        }
                      )
                      if (nextPlacedActorIndex !== -1) {
                        setBattleModeTurnIndex(nextPlacedActorIndex)
                      } else {
                        setBattleModeTurnIndex(0)
                        setBattleModeActive(false)
                      }
                    }

                  } else {
                    setBattleModeTurnIndex(0)
                  }
                }}
              ><FaArrowRight /> End Turn</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Controls