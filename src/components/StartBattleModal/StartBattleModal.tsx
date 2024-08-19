import React, { useEffect, useRef, useState } from 'react';
import "./StartBattleModal.scss"
import Actor from '../../types/Actor';
import Colors from '../../types/Colors';
import { FaCheck, FaDiceD20, FaX } from 'react-icons/fa6';
import rollDice from '../../utils/rollDice';

type Props = {
    // Define your prop types here
    actors: Actor[];
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
const StartBattleModal: React.FC<Props> = ({actors, dataSetter, open, map, openSetter}) => {
  const [tempActors, setTempActors] = useState<Actor[]>(actors)
  const [initiativeSet, setInitiativeSet] = useState<boolean>(false)
  //this feels wrong
  useEffect(
    () => {
      setTempActors(actors)
    },
    [actors]
  )
  return open
    ? (
        <div className='StartBattleModal' id="something">
          <div className="blocker">
          </div>
          <div className="inner">
            <div className="actors-list-section">
              <table>
                <thead>
                  <tr>
                    <th colSpan={2}>
                      Character
                    </th>
                    <th>Player</th>
                    <th>Ini.<br />modifier</th>
                    <th>Ini.<br />tiebreaker</th>
                    <th>Ini.</th>
                  </tr>
                </thead>
                <tbody>
                  {tempActors.length
                    ? tempActors.map(
                        (tempActor, index) => {
                          return (
                            <tr key={tempActor.id}>
                              <td>
                                <span className='blob' style={{background: tempActor.color}}></span>
                              </td>
                              <td>
                                {tempActor.displayName}
                              </td>
                              <td>
                                {tempActor.playerName}
                              </td>
                              <td>
                                {tempActor.initiativeModifier}
                              </td>
                              <td>
                                {tempActor.initiativeTiebreaker}
                              </td>
                              <td>
                                <input disabled type="number" value={tempActor.initiative}  />
                              </td>
                            </tr>
                          )
                        }
                      )
                    : <tr><td className="empty">None</td></tr>
                  }
                </tbody>
              </table>
              <button
                type="button"
                disabled={initiativeSet}
                onClick={() => {
                  setTempActors(
                    (prevActors) => {
                      setInitiativeSet(true)
                      return prevActors.map(
                        (prevActor) => {
                          return {
                            ...prevActor,
                            initiative: rollDice(20) + prevActor.initiativeModifier
                          }
                        }
                      )
                    }
                  )
                }}
              ><FaDiceD20 /> Roll initiative</button>
            </div>
            <div className="confirm-or-cancel">
              <button
                type="button"
                disabled={!initiativeSet}
                form="actor-form-1"
                className="confirm-button"
              ><FaCheck /> Confirm</button>
              <button
                type="button"
                className="cancel-button"
                disabled={initiativeSet}
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

export default StartBattleModal;
