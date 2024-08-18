import React, { useEffect, useRef, useState } from 'react';
import "./EditCharactersModal.scss"
import Actor from '../../types/Actor';
import Colors from '../../types/Colors';

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
    const [isInScene, setIsInScene] = useState<boolean[]>(
      () => {
        return data.map((v) => {return v.isPlaced})
      }
    )
    //this feels wrong
    useEffect(
      () => {
        setTempActors(data)
        setIsInScene(data.map((v) => {return v.isPlaced}))
      },
      [data]
    )
    return open
      ? (
          <div className='EditCharactersModal' id="something">
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
                      const newIndex = keyChunks.splice(keyChunks.length - 1, 1)[0]
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
                  dataSetter(outerSan as Actor[])
                  setTempActors(outerSan as Actor[])
                }}
              >
                <ul>
                  {tempActors.length
                    ? tempActors.map(
                        (tempActor, index) => {
                          return (
                            <li key={tempActor.id} className={`${tempActor.isDeleted ? "is-deleted" : ""}`}>
                                <span className='blob' style={{background: tempActor.color}}></span>
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
                                    Character is in scene:
                                  </label>
                                  <input name={`actor-placed-${index}`} id={`actor-placed-${index}`} type="checkbox" defaultChecked={tempActor.isPlaced} onChange={(e) => {
                                    setIsInScene(
                                      (prevIsInScene) => {
                                        if (e.target.checked) {
                                          return prevIsInScene.map(
                                            (v, i) => {
                                              return index === i
                                                ? true
                                                : v
                                            }
                                          )
                                        } else {
                                          return prevIsInScene.map(
                                            (v, i) => {
                                              return index === i
                                                ? false
                                                : v
                                            }
                                          )
                                        }
                                      }
                                    )
                                  }} />
                                  <label htmlFor={`actor-posx-${index}`}>
                                    X position:
                                  </label>
                                  <input name={`actor-posx-${index}`} id={`actor-posx-${index}`} type="number" disabled={!isInScene[index]} defaultValue={tempActor.posX} min="0" max={map.current?.naturalWidth ?? 0 - 100} />
                                  <label htmlFor={`actor-posy-${index}`}>
                                    Y position:
                                  </label>
                                  <input name={`actor-posy-${index}`} id={`actor-posy-${index}`} type="number" disabled={!isInScene[index]} defaultValue={tempActor.posY} min="0" max={map.current?.naturalHeight ?? 0 - 100} />
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
                                              (pta, i) => {
                                                if (i === index) {
                                                  return {
                                                    ...pta,
                                                    isDeleted: !pta.isDeleted
                                                  }
                                                }
                                                return pta
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
                      setIsInScene([...isInScene, false])
                      setTempActors(
                        (prevTempActors) => {
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
                              moveRadiusFt: undefined
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
                >✔️ Confirm</button>
                <button
                  className="cancel-button"
                  type="button"
                  onClick={(e) => {
                    openSetter(false)
                }}>
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        )
      : <></>
};

export default EditCharactersModal;
