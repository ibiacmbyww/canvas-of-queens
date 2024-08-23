import {Actor} from "../../types/Actor"
import { FaBan, FaRegEdit } from "react-icons/fa"
import { FaArrowRight, FaExplosion } from "react-icons/fa6"
import "./Controls.scss";
import teams from "../../data/teams"
import { useMemo } from "react"
import ActorButtons from "../ActorButtons/ActorButtons"
import action from "./../../img/action.svg"
import MenuPositions from "../../types/MenuPositions";

type ControlProps =   {
  showControls: boolean,
  controlsPosition: MenuPositions,
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
    controlsPosition,
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

  const findFirstActorInScene = (upperListStartsAtIndex: number) => {
    if (typeof battleModeTurnIndex === "number" && battleModeTurnIndex < actors.length) {
      const lowerLoop = actors.slice(0, upperListStartsAtIndex)
      const upperLoop = actors.slice(upperListStartsAtIndex)
      const nextPlacedActorIndex = upperLoop.findIndex(
        (actor, i) => {
          return ((i + upperListStartsAtIndex) >= battleModeTurnIndex) && actor.isPlaced
        }
      )
      if (nextPlacedActorIndex !== -1) {
        setActors(actors.toSpliced(nextPlacedActorIndex, 1, {
          ...actors[nextPlacedActorIndex],
          moveRemaining: actors[nextPlacedActorIndex].moveFt
        }))
        setBattleModeTurnIndex(upperListStartsAtIndex + nextPlacedActorIndex)
        setMoveModeActorIndex(undefined)
      } else {
        //loop round and check sub-section
        const nextPlacedActorIndex = lowerLoop.findIndex(
          (actor, i) => {
            return i <= battleModeTurnIndex && actor.isPlaced
          }
        )
        if (nextPlacedActorIndex !== -1) {
          setActors(actors.toSpliced(nextPlacedActorIndex, 1, {
            ...actors[nextPlacedActorIndex],
            moveRemaining: actors[nextPlacedActorIndex].moveFt
          }))
          setBattleModeTurnIndex(nextPlacedActorIndex)
          setMoveModeActorIndex(undefined)
        } else {
          //combat has ended
          setBattleModeTurnIndex(0)
          setBattleModeActive(false)
          setMoveModeActorIndex(undefined)
        }
      }

    } else {
      //loop
      setBattleModeTurnIndex(0)
      setMoveModeActorIndex(undefined)
    }
  }

  return (
    <div className={`Controls${controlsPosition === MenuPositions.Left ? " left" : " right"}`} style={{display: showControls ? "block" : "none"}}>
      <div className="wrapper">
        {/* {customMessage} */}
        <h3>Map Zoom: {zoomLevel.toFixed(2)}</h3>
        <div className="actors-list-section">
          {/* <h1>Characters</h1> */}
          <ul>
            {actors.length
              ? actors.map(
                  (actor, index, arr) => {
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
                        <div className="actions">
                        <img src={action} />
                        <img src={action} />
                        <img src={action} />
                        </div>
                        <ActorButtons
                          actor={actor}
                          setActors={setActors}
                          battleModeActive={battleModeActive}
                          battleModeTurnIndex={battleModeTurnIndex}
                          placeModeActorIndex={placeModeActorIndex}
                          moveModeActorIndex={moveModeActorIndex}
                          setInfoLayerHover={setInfoLayerHover}
                          setInfoLayerMode={setInfoLayerMode}
                          setPlaceModeActorIndex={setPlaceModeActorIndex}
                          setPlaceMoveActive={setPlaceMoveActive}
                          setMoveModeActorIndex={setMoveModeActorIndex}
                          setMoveModeMoveTooFar={setMoveModeMoveTooFar}
                          index={index}
                        />
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
              // const sortedActors = sortActorsByInitiative(actors)
              if (newBattleModeActive && typeof battleModeTurnIndex === "number") {
                findFirstActorInScene(battleModeTurnIndex)
                // setActors(sortedActors)
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
        </div>
        {battleModeActive && (
          <div>
            <button
              onClick={() => {
                if (typeof battleModeTurnIndex === "number") {
                  findFirstActorInScene(battleModeTurnIndex + 1)
                }
              }}
            ><FaArrowRight /> End Turn</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Controls