import { DifficultyLevel } from '../../game-logic/types';
import styles from './RadioButton.module.scss';

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
    <label className={styles.radioButton}>
      <input
        type='radio'
        name='radio-group'
        checked={checked}
        onChange={() => onClick()}
      />
      <span>{difficultyLevel}</span>
    </label>
  );
}
