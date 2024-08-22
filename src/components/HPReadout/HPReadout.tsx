import React, { useMemo } from 'react';
import "./HPReadout.scss"
import Actor from '../../types/Actor';

type HPReadoutProps = {
  hp: number,
  currentHP: number,
  setActors: React.Dispatch<React.SetStateAction<Actor[]>>,
  index: number
}

const HPReadout: React.FC<HPReadoutProps> = ({hp, currentHP, setActors, index}) => {
  const cls = useMemo(
    () => {
      const pc = Math.round(100 * (currentHP / hp))
      if (pc > 66) {
        return "green"
      } else {
        if (pc > 33) {
          return "yellow"
        } else {
          return "red"
        }
      }
    },
    [hp, currentHP]
  )
  return (
    <div className="HPReadout">
      <div>
        <div style={{width: `${100 * (currentHP / hp)}%`}} className={cls}></div>
      </div>
      <label>
        <input
          type="number"
          min="-1"
          max="999"
          defaultValue={hp}
          onChange={
            (e)=>{
              setActors(
                (prevActors) => {
                  return prevActors.map(
                    (prevActor, i) => {
                      return i === index
                      ? {
                          ...prevActor,
                          currentHP: parseInt(e.currentTarget.value)
                        }
                      : prevActor
                    }
                  )
                }
              )
            }
          }
        ></input>/{hp}</label>
    </div>
  )
};

export default HPReadout;
