import { DifficultyLevel, DifficultyLevels } from 'game-logic/types';

import styles from './Menu.module.scss';
import RadioButton from './RadioButton';

interface Props {
  difficultyLevel: DifficultyLevel;
  onNewGame: (difficultyLevel: DifficultyLevel) => void;
}

export default function Menu({ difficultyLevel, onNewGame }: Props) {
  return (
    <div className={styles.menu}>
      {DifficultyLevels.map((x) => (
        <RadioButton
          key={x}
          difficultyLevel={x as DifficultyLevel}
          checked={difficultyLevel === x}
          onClick={() => onNewGame(x as DifficultyLevel)}
        />
      ))}
    </div>
  );
}
