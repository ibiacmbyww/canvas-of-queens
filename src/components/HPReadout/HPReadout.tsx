import React, { useMemo } from 'react';
import "./HPReadout.scss"
import {Actor} from '../../types/Actor';

type HPReadoutProps = {
  hp: number,
  currentHP: number,
  setActors: React.Dispatch<React.SetStateAction<Actor[]>>,
  index: number,
  isPlaced: boolean
}

const HPReadout: React.FC<HPReadoutProps> = ({hp, currentHP, setActors, index, isPlaced}) => {
  const cls = useMemo(
    () => {
      let color = "color "
      const pc = Math.round(100 * (currentHP / hp))
      if (pc > 66) {
          color += "green"
      } else {
        if (pc > 33) {
          color += "yellow"
        } else {
          color += "red"
        }
      }
      return color
    },
    [hp, currentHP]
  )
  return (
    <div className="HPReadout">
      <div>
        <div className="backdrop">
          <div style={{width: `calc((100% + 1rem) * (${currentHP / hp}))`}} className={cls}></div>
        </div>
        <label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            min="-1"
            max="999"
            disabled={!isPlaced}
            value={currentHP}
            onChange={
              (e)=>{
                setActors(
                  (prevActors) => {
                    return prevActors.map(
                      (prevActor, i) => {
                        return i === index
                        ? {
                            ...prevActor,
                            currentHP: parseInt(e.target.value)
                          }
                        : prevActor
                      }
                    )
                  }
                )
              }
            }
          ></input><span>/{hp}</span></label>
      </div>
    </div>
  )
};

export default HPReadout;
