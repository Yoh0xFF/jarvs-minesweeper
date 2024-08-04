import { DifficultyLevel, DifficultyLevels } from "../../game-logic/types";
import RadioButton from "../menu/RadioButton";
import styles from "./Menu.module.scss";

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
