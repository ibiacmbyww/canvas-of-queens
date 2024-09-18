import { useEffect, useState } from "react";
import {conditions as allConditions, socialConditions as allSocialConditions} from "../../data/conditions";
import "./ConditionScreen.scss"

type ConditionScreenProps = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

enum TAB {
  CONDITIONS = "Conditions",
  SOCIAL_CONDITIONS = "Social Conditions"
}

const ConditionScreen = ({open, setOpen}: ConditionScreenProps) => {
  const [searchString, setSearchString] = useState("")
  const [tab, setTab] = useState(TAB.CONDITIONS)
  const [conditions, setConditions] = useState(allConditions)
  const [socialConditions, setSocialConditions] = useState(allSocialConditions)

  useEffect(
    () => {
      setConditions(
        allConditions.filter(
          (condition) => {
            return condition.title.toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1
          }
        )
      )
      setSocialConditions(
        allSocialConditions.filter(
          (condition) => {
            return condition.title.toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1
          }
        )
      )
    },
    [searchString]
  )

  return (
    <div className={`ConditionScreen${open ? " open" : ""}`}>
      <div className="controls">
        <div className="form">
          <label htmlFor="condition-search">
            <span>Search: </span>
            <input id="condition-search" type="text" onChange={(e) => {setSearchString(e.currentTarget.value)}} value={searchString} />
          </label>
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
      {tab === TAB.CONDITIONS && <ul className={`list`}>
        {conditions.map(
          (condition) => {
            return <li key={`condition-${condition.title}`}>
              <h3>{condition.title}</h3>
              <ul>
                {condition.strs.map(
                  (str, i) => {
                    return <li key={`condition-${condition.title}-${i}`}>{str}</li>
                  }
                )}
              </ul>
            </li>
          }
        )}
      </ul>}
      {tab === TAB.SOCIAL_CONDITIONS && <ul className={`list`}>
        {socialConditions.map(
          (condition) => {
            return <li key={`social-condition-${condition.title}`}>
              <h3>{condition.title}</h3>
              <ul>
                {condition.strs.map(
                  (str, i) => {
                    return <li key={`social-condition-${condition.title}-${i}`}>{str}</li>
                  }
                )}
              </ul>
            </li>
          }
        )}
      </ul>}
    </div>
  );
};

export default ConditionScreen;