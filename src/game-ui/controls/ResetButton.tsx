import classNames from 'classnames';
import { useState } from 'react';
import { GameStatus } from '../../game-logic/types';
import styles from './ResetButton.module.scss';

const gameStatusToClassNameMap = new Map<GameStatus, string>([
  ['Pending', 'unpressed'],
  ['Progress', 'unpressed'],
  ['Success', 'success'],
  ['Fail', 'fail'],
]);

interface Props {
  gameStatus: GameStatus;
  onReset: () => void;
}

export default function ResetButton({ gameStatus, onReset }: Props) {
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  const className = gameStatusToClassNameMap.get(gameStatus) ?? 'unpressed';

  return (
    <div
      role='button'
      onClick={() => onReset()}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      onMouseLeave={() => setMouseDown(false)}
      className={classNames(
        styles.face,
        { [styles[className]]: !mouseDown },
        { [styles.pressed]: mouseDown },
      )}
    />
  );
}
