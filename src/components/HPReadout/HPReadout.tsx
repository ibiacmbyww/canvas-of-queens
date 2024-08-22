import React, { useEffect, useState } from 'react';
import "./EditCharactersModal.scss"
import Actor from '../../types/Actor';
import Colors from '../../types/Colors';
import { FaCheck, FaDice, FaX } from 'react-icons/fa6';
import sortActorsByInitiative from '../../utils/sortActorsByInitiative';
import rollDice from '../../utils/rollDice';
import teams from '../../data/teams';
import { TeamNames } from '../../types/Team';

type Props = {
    // Define your prop types here
    hp: number,
    currentHP: number
}

const HPReadout: React.FC<Props> = ({hp, currentHP}) => {
    return (
      <div className="HPReadout">
        <span>{currentHP}</span>/<span>{hp}</span>
        <div>
          <div style={{width: `${100 * (currentHP / hp)}%`}}></div>
        </div>
      </div>
    )
};

export default HPReadout;
