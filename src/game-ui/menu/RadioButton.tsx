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
      <label>
        <input
          type='radio'
          name='radio-group'
          checked={checked}
          onChange={() => onClick()}
        />
        <span>{difficultyLevel}</span>
      </label>
    </p>
  );
}
