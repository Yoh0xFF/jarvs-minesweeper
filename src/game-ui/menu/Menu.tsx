import styles from './Menu.module.scss';

import { DifficultyLevel, DifficultyLevels } from '@app/game-logic/types';
import RadioButton from '@app/game-ui/menu/RadioButton';

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
          difficultyLevel={x}
          checked={difficultyLevel === x}
          onClick={() => onNewGame(x)}
        />
      ))}
    </div>
  );
}
