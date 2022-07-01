import { DifficultyLevel } from 'game-logic/types';
import React from 'react';

import './RadioButton.module.scss';

interface Props {
  difficultyLevel: DifficultyLevel;
  checked: boolean;
  onClick: () => void;
}

export default function RadioButton({
  difficultyLevel,
  checked,
  onClick,
}: Props) {
  return (
    <p>
      <input
        type='radio'
        id={difficultyLevel}
        name='radio-group'
        checked={checked}
        onChange={() => onClick()}
      />
      <label htmlFor={difficultyLevel}>{difficultyLevel}</label>
    </p>
  );
}
