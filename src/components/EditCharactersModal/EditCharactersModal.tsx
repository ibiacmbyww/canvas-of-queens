import React, { useEffect, useState } from "react";
import "./EditCharactersModal.scss"
import Actor from "../../types/Actor";
import Colors from "../../types/Colors";
import { FaCheck, FaDice, FaX } from "react-icons/fa6";
import sortActorsByInitiative from "../../utils/sortActorsByInitiative";
import rollDice from "../../utils/rollDice";
import teams from "../../data/teams";
import { TeamNames } from "../../types/Team";

type Props = {
    // Define your prop types here
    data: Actor[];
    dataSetter: React.Dispatch<React.SetStateAction<Actor[]>>;
    openSetter: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
    map: React.RefObject<HTMLImageElement>;
};


// setActors(
//   (prevActors) => {
//     const newActor = {
//       id: newID(),
//       displayName: "",
//       playerName: "",
//       posX: 1800,
//       posY: 600,
//       color: Colors.Black,
//       moveFt: 25,
//       isPlaced: false,
//       renaming: false,
//       highlighted: false
//     }
//     return [...prevActors, newActor]
//   }
// )
const EditCharactersModal: React.FC<Props> = ({data, dataSetter, open, map, openSetter}) => {
    const [tempActors, setTempActors] = useState<Actor[]>(data)
    const [newCharacterDisplayName, setNewCharacterDisplayName] = useState<string>("New Character")
    //this feels wrong
    useEffect(
      () => {
        setTempActors(data)
      },
      [data]
    )
    return open
      ? (
          <div className="EditCharactersModal">
            <div className="blocker">
            </div>
            <div className="inner">
              <form
                className="actors-list-section"
                name="actor-form-0"
                id="actor-form-0"
                // ref={formRef}
                onSubmit={(e) => {
                  e.preventDefault()
                  const fd = new FormData(e.currentTarget)
                  const formsJSON = Object.fromEntries(fd.entries())
                  //trust me, this is easier than the alternatives
                  let index = 0
                  let outerSan: unknown[] = []
                  Object.entries(formsJSON).forEach(
                    ([k, v], i) => {
                      const keyChunks = k.split("-")
                      const newIndex = keyChunks.splice(keyChunks.length - 1)[0]
                      let newKey = keyChunks.join("-")
                      index = parseInt(newIndex)
                      switch (newKey) {
                        //@ts-ignore-next-line
                        case "actor-id": newKey = "id"; v = parseInt(v); break;
                        //@ts-ignore-next-line
                        case "actor-display-name": newKey = "displayName"; break;
                        //@ts-ignore-next-line
                        case "actor-player-name": newKey = "playerName"; break;
                        //@ts-ignore-next-line
                        case "actor-color": newKey = "color"; break;
                        //@ts-ignore-next-line
                        case "actor-movement": newKey = "moveFt"; v = parseInt(v); break;
                        //@ts-ignore-next-line
                        case "actor-placed": newKey = "isPlaced"; v = v.toString() === "on"; break;
                        //@ts-ignore-next-line
                        case "actor-posx": newKey = "posX"; v = parseInt(v); break;
                        //@ts-ignore-next-line
                        case "actor-posy": newKey = "posY"; v = parseInt(v); break;
                        //@ts-ignore-next-line
                        case "actor-deleted": newKey = "isDeleted"; v = v.toString() === "on"; break;
                        case "actor-radius":
                          newKey = "moveRadiusFt";
                          //@ts-ignore-next-line
                          v = typeof v === "number"
                            ? parseInt(v)
                            : undefined;
                        break;
                        //@ts-ignore-next-line
                        case "actor-ini": newKey = "initiative"; v = parseInt(v); break;
                        //@ts-ignore-next-line
                        case "actor-ini-mod": newKey = "initiativeModifier"; v = parseInt(v); break;
                        //@ts-ignore-next-line
                        case "actor-ini-tie": newKey = "initiativeTiebreaker"; v = parseInt(v); break;
                        //@ts-ignore-next-line
                        case "actor-team": v = Object.keys(TeamNames)[parseInt(v)]; break;
                        //@ts-ignore-next-line
                        case "actor-current-hp": newKey = "currentHP"; v = parseInt(v); break;
                        //@ts-ignore-next-line
                        case "actor-hp": newKey = "hp"; debugger;v = parseInt(v); break;
                      // const num: number = parseInt(keyChunks.at(-1)?? "0")
                      }
                      outerSan[index] = {
                        //@ts-ignore-next-line
                        ...outerSan[index],
                        [newKey]: v
                      }
                    }
                  )
                  outerSan = outerSan.filter(
                    (v) => {
                      //@ts-ignore-next-line
                      return !v.isDeleted
                    }
                  )
                  outerSan = outerSan.map(
                    (v) => {
                      let t: Partial<Actor> = v as Partial<Actor>
                      if (!("posX" in t)) {
                        t["posX"] = 0
                      }
                      if (!("posY" in t)) {
                        t["posY"] = 0
                      }
                      if (!("isPlaced" in t)) {
                        t["isPlaced"] = false
                      }
                      return t
                    }
                  )
                  openSetter(false)
                  dataSetter(sortActorsByInitiative(outerSan as Actor[]))
                  setTempActors(outerSan as Actor[])
                }}
              >
                <ul>
                  {tempActors.length
                    ? tempActors.map(
                        (tempActor, index) => {
                          return (
                            <li key={tempActor.id} className={`${tempActor.isDeleted ? "is-deleted" : ""}`}>
                              <span className="blob" style={{background: tempActor.color, borderColor: teams[tempActor.team].color}}></span>
                              <div className="attributes-list">
                                <input type="hidden" value={tempActor.id} name={`actor-id-${index}`} />
                                <input type="hidden" value={"" + tempActor.isDeleted} name={`actor-deleted-${index}`} />
                                <input type="hidden" value={"" + tempActor.moveRadiusFt} name={`actor-radius-${index}`} />
                                <label htmlFor={`actor-display-name-${index}`}>
                                  Display name:
                                </label>
                                <input name={`actor-display-name-${index}`} id={`actor-display-name-${index}`} type="text" defaultValue={tempActor.displayName} />

                                <label htmlFor={`actor-player-name-${index}`}>
                                  Player name:
                                </label>
                                <input name={`actor-player-name-${index}`} id={`actor-player-name-${index}`} type="text" defaultValue={tempActor.playerName} />

                                <label htmlFor={`team-${index}`}>
                                  Team:
                                </label>
                                <select id={`team-${index}`} name={`team-${index}`} value={tempActor.team} onChange={(e) => {
                                  setTempActors(
                                    (prevTempActors) => {
                                      return prevTempActors.map(
                                        (prevTempActor, i) => {
                                          return {
                                            ...prevTempActor,
                                            team: i === index
                                              ? parseInt(e.target.value)
                                              : prevTempActor.team
                                          }
                                        }
                                      )
                                    }
                                  )
                                }}>
                                  {Object.values(TeamNames).map(
                                    (teamNameValue, i2) => {
                                      return <option key={`team-option-${index}-${i2}`} value={i2}>{teamNameValue}</option>
                                    }
                                  )}
                                </select>
                                <label htmlFor={`actor-color-${index}`}>
                                  Color:
                                </label>
                                <select name={`actor-color-${index}`} id={`actor-color-${index}`}>

                                  {Object.values(Colors).map((v) => {
                                    return <option selected={tempActor.color === v}>{v}</option>
                                  })}
                                </select>
                                <label htmlFor={`actor-movement-${index}`}>
                                  Movement (ft):
                                </label>
                                <input name={`actor-movement-${index}`} id={`actor-movement-${index}`} type="number" min="0" max="1000" step="2.5" defaultValue={tempActor.moveFt} />
                              </div>
                              <div className="attributes-list">
                                <label htmlFor={`actor-placed-${index}`}>
                                  Is in scene:
                                </label>
                                <input name={`actor-placed-${index}`} id={`actor-placed-${index}`} type="checkbox" defaultChecked={tempActor.isPlaced} onChange={(e) => {
                                  setTempActors(
                                    (prevActors) => {
                                      return prevActors.map(
                                        (v, i) => {
                                          return index === i
                                            ? {
                                                ...v,
                                                isPlaced: e.target.checked
                                              }
                                            : v
                                        }
                                      )
                                    }
                                  )
                                }} />
                                <label htmlFor={`actor-posx-${index}`}>
                                  X position:
                                </label>
                                <input name={`actor-posx-${index}`} id={`actor-posx-${index}`} type="number" disabled={!tempActor.isPlaced} defaultValue={tempActor.posX} min="0" max={map.current?.naturalWidth ?? 0 - 100} />
                                <label htmlFor={`actor-posy-${index}`}>
                                  Y position:
                                </label>
                                <input name={`actor-posy-${index}`} id={`actor-posy-${index}`} type="number" disabled={!tempActor.isPlaced} defaultValue={tempActor.posY} min="0" max={map.current?.naturalHeight ?? 0 - 100} />
                                <label htmlFor={`actor-current-hp-${index}`}>
                                  Current HP:
                                </label>
                                <input name={`actor-current-hp-${index}`} id={`actor-current-hp-${index}`} type="number" defaultValue={tempActor.currentHP} min="-1" max={999} />
                                <label htmlFor={`actor-hp-${index}`}>
                                  Base max. HP:
                                </label>
                                <input name={`actor-hp-${index}`} id={`actor-hp-${index}`} type="number" defaultValue={tempActor.hp} min="-1" max={999} />
                              </div>
                              <div className="attributes-list">
                                <label htmlFor={`actor-ini-${index}`}>
                                  Initiative:
                                </label>
                                <div className="roller">
                                  <input name={`actor-ini-${index}`} id={`actor-ini-${index}`} type="number" min={0} max={99} value={tempActor.initiative} />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setTempActors(
                                        (tempActors) => {
                                          return tempActors.map(
                                            (tempActor, i) => {
                                              return i === index
                                                ? {
                                                    ...tempActor,
                                                    initiative: rollDice(20) + tempActor.initiativeModifier
                                                  }
                                                : tempActor
                                            }
                                          )
                                        }
                                      )
                                    }}><FaDice /></button>
                                </div>
                                <label htmlFor={`actor-ini-mod-${index}`}>
                                  Initiative modifier:
                                </label>
                                <input
                                  type="number"
                                  min={0} max={99}
                                  defaultValue={tempActor.initiativeModifier}
                                  name={`actor-ini-mod-${index}`}
                                  id={`actor-ini-mod-${index}`}
                                  onChange={(e) => {
                                    setTempActors(
                                      (tempActors) => {
                                        return tempActors.map(
                                          (tempActor, i) => {
                                            return i === index
                                              ? {
                                                  ...tempActor,
                                                  initiativeModifier: parseInt(e.target.value)
                                                }
                                              : tempActor
                                          }
                                        )
                                      }
                                    )
                                  }}
                                />
                                <label htmlFor={`actor-ini-tie-${index}`}>
                                  Initiative tiebreaker:
                                </label>
                                <input name={`actor-ini-tie-${index}`} id={`actor-ini-tie-${index}`} type="number" min={0} max={99} defaultValue={tempActor.initiativeTiebreaker} />
                              </div>
                              <div className="remove-character">
                                <button
                                  type="button"
                                  onClick={
                                    (e) => {
                                      e.stopPropagation();
                                      setTempActors(
                                        (prevTempActors) => {
                                          return prevTempActors.map(
                                            (prevTempActors, i) => {
                                              return index === i
                                                ? {
                                                    ...prevTempActors,
                                                    isPlaced: true
                                                  }
                                                : prevTempActors
                                            }
                                          )
                                        }
                                      )
                                    }
                                  }>❌</button>
                              </div>
                            </li>
                          )
                        }
                      )
                    : <li className="empty">None</li>
                  }
                </ul>
                <div className="add-character-strip">
                  <button
                    className="add-character"
                    type="button"
                    onClick={(e) => {
                      setTempActors(
                        (prevTempActors) => {
                          const hp = (rollDice(5) + 2) * rollDice(12)
                          const x = [
                            ...prevTempActors,
                            {
                              id: Math.round(Math.random() * Number.MAX_SAFE_INTEGER),
                              displayName: newCharacterDisplayName,
                              playerName: "GM",
                              color: Colors.White,
                              moveFt: 25,
                              isPlaced: false,
                              posX: 0,
                              posY: 0,
                              highlighted: false,
                              isDeleted: false,
                              moveRadiusFt: undefined,
                              initiative: rollDice(20) + 5, // 5 = initiativeModifier 
                              initiativeModifier: 5,
                              initiativeTiebreaker: 4,
                              team: 0,
                              hp: hp,
                              currentHP: hp
                            }
                          ]
                          return x
                        }
                      )
                    }}>
                      ➕ Add Character
                  </button>
                  <label htmlFor="add-new-character-name">
                    <span>New character name: </span>
                    <input type="text" id="add-new-character-name" defaultValue={"New Character"} onChange={(e) => {
                      setNewCharacterDisplayName(e.currentTarget.value)
                    }}/>
                  </label>
                </div>
              </form>
              <div className="confirm-or-cancel">
                <button
                  type="submit"
                  form="actor-form-0"
                  className="confirm-button"
                ><FaCheck /> Confirm</button>
                <button
                  className="cancel-button"
                  type="button"
                  onClick={(e) => {
                    openSetter(false)
                }}>
                  <FaX /> Cancel
                </button>
              </div>
            </div>
          </div>
        )
      : <></>
};

export default EditCharactersModal;
