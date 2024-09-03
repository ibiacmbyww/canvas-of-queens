import {Actor} from "../../types/Actor"
import { FaBan, FaRegEdit } from "react-icons/fa"
import { FaArrowRight, FaArrowRightToBracket, FaExplosion, FaGun, FaPlus } from "react-icons/fa6"
import "./Controls.scss";
import teams from "../../data/teams"
import { useMemo, useState } from "react"
import ActorButtons from "../ActorButtons/ActorButtons"
import action from "./../../img/action.svg"
import MenuPositions from "../../types/MenuPositions";
import MissionData from "../../types/MissionData";
import { EffectRadius } from "../../types/EffectRadius";
import Colors from "../../types/Colors";

type ControlProps =   {
  showControls: boolean,
  controlsPosition: MenuPositions,
  zoomLevel: number,
  setMapIndex: React.Dispatch<React.SetStateAction<number>>,
  missionIndex: number,
  setMissionIndex: React.Dispatch<React.SetStateAction<number>>,
  allMissionsData: MissionData[],
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
  setBattleModeTurnIndex: React.Dispatch<React.SetStateAction<number | undefined>>,
  setEffectRadiuses: React.Dispatch<React.SetStateAction<EffectRadius[]>>
}

const Controls = (
  {
    showControls,
    controlsPosition,
    zoomLevel,
    setMapIndex,
    missionIndex,
    setMissionIndex,
    allMissionsData,
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
    setBattleModeTurnIndex,
    setEffectRadiuses
  }: ControlProps
) => {
  const [addEffectsModalOpen, setAddEffectsModalOpen] = useState<boolean>(false)
  const [addEffectsModalDescription, ] = useState<string>("")
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
        <h1>{allMissionsData[missionIndex].displayName}</h1>
        <select
          onChange={(e) => {
            const newMapIndex = parseInt(e.target.value)
            setMapIndex(newMapIndex)
          }}
        >
          
          {allMissionsData[missionIndex].maps.map(
            (v, i) => {
              return <option key={`eff-display-name=${i}`} value={i}>{v.map.displayName}</option>
            }
          )}
        </select>
        <div className="actors-list-section">
          {/* <h1>Characters</h1> */}
          <ul>
            {actors.length
              ? actors.map(
                  (actor, index, arr) => {
                    const li = (
                      <li
                        className={`${actor.isPlaced ? "" : "not-placed"} ${battleModeActive && typeof battleModeTurnIndex === "number" && battleModeTurnIndex === index ? "is-current-turn" : ""}`}
                        key={`actors-list-${actor.id}`}
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
                          <span>{actor.displayName}</span>
                          <span>{actor.playerName}</span>
                        </span>
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
          <div className="end-controls">
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
                : <><FaGun /> Start Combat</>
              }
            </button>
            {battleModeActive && (
              <button
                onClick={() => {
                  if (typeof battleModeTurnIndex === "number") {
                    findFirstActorInScene(battleModeTurnIndex + 1)
                  }
                }}
              ><FaArrowRightToBracket /> End Turn</button>
            )}
          </div>
          <div className="effects-wrapper">
            <button
              disabled={!hasPlaced || typeof moveModeActorIndex === "number" || typeof placeModeActorIndex === "number"}
              onClick={() => {
                setAddEffectsModalOpen((v) => {return !v})
              }}
            >
              <><FaExplosion /> Add effect <FaArrowRight /></>
            </button>
            <form
              className={`effects-menu${controlsPosition === MenuPositions.Left ? " left" : " right"}`}
              name="effects-0"
              id="effects-0"
              onSubmit={
                (e) => {
                  e.preventDefault()
                  debugger;
                  
                  const fd = new FormData(e.currentTarget)
                  const formsJSON = Object.fromEntries(fd.entries())
                  setEffectRadiuses(
                    (oldEffectRadiuses) => {
                      const newEffect: EffectRadius = {
                        name: formsJSON["eff-name"] as string,
                        description: formsJSON["eff-desc"] as string,
                        posX: parseInt(formsJSON["eff-posx"] as string),
                        posY: parseInt(formsJSON["eff-posy"] as string),
                        radiusFt: parseInt(formsJSON["eff-rad"] as string),
                        color: formsJSON["eff-color"] as string
                      }
                      return [
                        ...oldEffectRadiuses,
                        newEffect
                      ]
                    }
                  )
                }
              }
            >
              <label htmlFor="eff-name">Name: </label><input type="text" id="eff-name" name="eff-name" />
              <label htmlFor="eff-desc">Description: </label><textarea id="eff-desc" name="eff-desc" />
              <label htmlFor="eff-posx">X position: </label><input type="number" min={5} max={600} defaultValue={10} step={5} id="eff-posx" name="eff-posx" />
              <label htmlFor="eff-posy">Y position: </label><input type="number" min={5} max={600} defaultValue={10} step={5} id="eff-posy" name="eff-posy" />
              <label htmlFor="eff-rad">Radius (ft): </label><input type="number" min={5} max={600} defaultValue={10} step={5} id="eff-rad" name="eff-rad" />
              <label htmlFor="eff-color">Color: </label>
              <select id="eff-color" name="eff-color">
                {Object.values(Colors).map((v) => {
                  return <option>{v}</option>
                })}
              </select>
              <button
                type="submit"
                form="effects-0"
              >
                Add <FaPlus />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Controls