import { DifficultyLevel } from 'game-logic/types';
import React from 'react';

import Button from './Button';
import styles from './Menu.module.scss';

interface Props {
  onNewGame: (difficultyLevel: DifficultyLevel) => void;
}

export default function Menu({ onNewGame }: Props) {
  return (
    <div className={styles.menu}>
      <Button label='Beginner' onClick={() => onNewGame('Beginner')} />
      <Button label='Intermediate' onClick={() => onNewGame('Intermediate')} />
      <Button label='Expert' onClick={() => onNewGame('Expert')} />
    </div>
  );
}
