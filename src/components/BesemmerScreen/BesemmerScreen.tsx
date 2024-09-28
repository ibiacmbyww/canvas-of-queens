import { useEffect, useMemo, useRef, useState } from "react"; //@ts-ignore
// import {conditions as allConditions, socialConditions as allSocialConditions} from "../../data/conditions";
import { AbilityTreeNode, BessemerTree, bessemerTree } from "../../data/bessemerTree";
import "./BesemmerScreen.scss"
import { StraightLine } from "@unchainedsky/react-drawline";

type BesemmerScreenProps = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

enum TAB {
  ABILITIES = "Abilities",
  WEAPONS = "Weapons",
  ARMOUR = "Armour"
}

const BesemmerScreen = ({open, setOpen}: BesemmerScreenProps) => {
  const [tab, setTab] = useState(TAB.ABILITIES)
  const [abilitiesTree, setAbilitiesTree] = useState<BessemerTree>(bessemerTree)
  const [selectedAbility, setSelectedAbility] = useState<number | null>(null)
  // const [socialConditions, setSocialConditions] = useState(allSocialConditions)
  const abilityRefs = useRef(
    abilitiesTree.abilities.map(
      (ability, i) => {
        return (
          <li
            key={`ability-${tab.toString() + i}`}
            style={{"gridRowStart": ability.gridX, "gridColumnStart": ability.gridY}}
          >
            <button onClick={(e) => {
              setSelectedAbility(i)
            }}>
              {ability.visibleName}
            </button>
            {/* {ability.text} */}
          </li>
        )
      }
    )
  )

  const iHopeThisWorks = useMemo(
    () => {
      return (
        <>
          {!!abilityRefs?.current
            ? abilitiesTree.abilities.map(
                (v: AbilityTreeNode, i) => {
                  debugger;
                  if (Object.hasOwn(v, "preRequisite") && v.preRequisite !== undefined) {
                    return <StraightLine 
                      startingElement={{
                        //@ts-ignore next line
                        ref: abilityRefs.current[v.preRequisite],
                        x: "center",
                        y: "mid",
                        zIndex: 999999999999999
                      }}
                      endingElement={{
                        //@ts-ignore next line
                        ref: abilityRefs.current[v.id],
                        x: "center",
                        y: "mid",
                        zIndex: 999999999999999
                      }}
                    />
                  } else {
                    return <></>
                  }
                }
              )
            : <></>
            }
        </>
      )
    },
    [abilityRefs]
  )


  return (
    <div className={`BesemmerScreen${open ? " open" : ""}`}>
      <div className="bg-layer"></div>
      <div className="menu">
        <div className="controls">
          <div className="form">
            <ul className="tabs">
              {Object.entries(TAB).map(
                ([k, v], i) => {
                  return (
                    <li
                      key={`${k}-${i}`}
                      className={tab === v ? "selected" : ""}
                    >
                      <button onClick={() => {setTab(v)}}>{v}</button>
                    </li>
                  )
                }
              )}
            </ul>
          </div>
          <button onClick={() => {setOpen(false)}}>X</button>
        </div>
        {tab === TAB.ABILITIES && abilityRefs.current && Array.isArray(abilityRefs.current) && (
            <ul 
              className={`list`}
              onClick={(e) => {
                setSelectedAbility(null)
              }}
            >
              {abilityRefs.current}
            </ul>
          )
        }
        {iHopeThisWorks}
      </div>
    </div>
  );
};

export default BesemmerScreen;