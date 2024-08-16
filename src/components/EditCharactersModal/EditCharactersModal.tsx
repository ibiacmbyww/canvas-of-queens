import React, { useRef, useState } from 'react';
import "./EditCharactersModal.scss"
import Actor from '../../types/Actor';
import Colors from '../../types/Colors';

type Props = {
    // Define your prop types here
    data: Actor[];
    dataSetter: React.Dispatch<React.SetStateAction<Actor[]>>;
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
const EditCharactersModal: React.FC<Props> = ({data, dataSetter, open, map}) => {
    const [tempActors, setTempActors] = useState<Actor[]>(data)
    const [isInScene, setIsInScene] = useState<boolean[]>(
      () => {
        return data.map((v) => {return v.isPlaced})
      }
    )
    const subFormRefs = useRef<HTMLFormElement[]>([])
    const formRefs = useRef(data.map(() => React.createRef<HTMLFormElement>()));
    debugger;
    return open
      ? (
          <div className='EditCharactersModal' id="something">
            <div className="blocker">
            </div>
            <div className="inner">
              <div className="actors-list-section">
                <ul>
                  {tempActors.length
                    ? tempActors.map(
                        (tempActor, index) => {
                          return (
                            <li key={tempActor.id}>
                              <form
                                name={`actor-form-${index}`}
                                id={`actor-form-${index}`}
                                ref={formRefs.current[index]}
                                onSubmit={(e) => {
                                  e.preventDefault()
                                  if (formRefs.current) {
                                    const formsData = formRefs.current.map(
                                      (subForm, subFormIndex) => {
                                        debugger;
                                        if (subForm.current) {
                                          const fd = new FormData(subForm.current)
                                          const formsJSON = Object.fromEntries(fd.entries())
                                          //trust me, this is easier than the alternatives
                                          let san = {}
                                          Object.entries(formsJSON).forEach(
                                            ([k, v], i) => {
                                              const keyChunks = k.split("-")
                                              const newKey = keyChunks.slice(0, keyChunks.length - 1).join("-")
                                              debugger;
                                              san = {
                                                ...san,
                                                [newKey]: v
                                              }
                                            }
                                          )
                                          debugger;
                                          return {
                                            id: subFormIndex,
                                            //@ts-ignore-next-line
                                            displayName: san["actor-display-name"],
                                            //@ts-ignore-next-line
                                            playerName: san["actor-player-name"],
                                            //@ts-ignore-next-line
                                            color: san["actor-color"],
                                            //@ts-ignore-next-line
                                            moveFt: san["actor-movement"],
                                            //@ts-ignore-next-line
                                            isPlaced: san["actor-placed"] === "on",
                                            //@ts-ignore-next-line
                                            posX: san["actor-posx"],
                                            //@ts-ignore-next-line
                                            posY: san["actor-posy"],
                                            highlighted: false
                                          }
                                        } else {
                                          return [] //can never be reached?
                                        }
                                      }
                                    )
                                    debugger;
                                    //@ts-ignore-next-line
                                    dataSetter(formsData)

                                  }
                                  // const formData = new FormData(e.currentTarget);
                                  // const formJSON = Object.fromEntries(formData.entries());
                                  debugger;
                                }}
                              >
                                <span className='blob' style={{background: tempActor.color}}></span>
                                <div className="attributes-list">
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
                                    onClick={
                                      () => {
                                        setTempActors(
                                          (prevTempActors) => {
                                            debugger;
                                            prevTempActors.splice(index, 1)
                                            return prevTempActors
                                          }
                                        )
                                      }
                                    }>❌</button>
                                </div>
                              </form>
                            </li>
                          )
                        }
                      )
                    : <li className="empty">None</li>
                  }
                </ul>
                <button
                  className="add-character"
                  onClick={(e) => {
                    formRefs.current.push(React.createRef<HTMLFormElement>())
                    setIsInScene([...isInScene, false])
                    setTempActors(
                      (prevTempActors) => {
                        const x = [
                          ...prevTempActors,
                          {
                            id: prevTempActors.length,
                            displayName: "New Character",
                            playerName: "GM",
                            color: Colors.White,
                            moveFt: 25,
                            isPlaced: false,
                            posX: 0,
                            posY: 0,
                            highlighted: false
                          }
                        ]
                        debugger;
                        return x
                      }
                    )
                  }}>➕ Add Character</button>
              </div>
              <div className="confirm-or-cancel">
              <button
                type="submit"
                form="actor-form-0"
                className="confirm-button"
              > ✔️ Confirm</button>
              <button
                className="cancel-button"
                onClick={(e) => {
                  setTempActors(
                    (prevTempActors) => {
                      return [
                        ...prevTempActors,
                        {
                          id: 1,
                          displayName: "Sgt. Bayez",
                          playerName: "GM",
                          color: Colors.Blue,
                          moveFt: 20,
                          isPlaced: false,
                          posX: 0,
                          posY: 0,
                          highlighted: false
                        }
                      ]
                    }
                  )
                }}>❌ Cancel</button>
              </div>
            </div>
          </div>
        )
      : <></>
};

export default EditCharactersModal;
