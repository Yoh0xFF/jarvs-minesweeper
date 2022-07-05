import classNames from 'classnames';
import { GameStatus } from 'game-logic/types';
import React, { useState } from 'react';

import styles from './ResetButton.module.scss';

const _gameStatusToClassNameMap = new Map<GameStatus, string>([
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

  const className = _gameStatusToClassNameMap.get(gameStatus) ?? 'unpressed';

  return (
    <div
      onClick={() => onReset()}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      onMouseLeave={() => setMouseDown(false)}
      className={classNames(
        styles.face,
        { [styles[className]]: !mouseDown },
        { [styles.pressed]: mouseDown }
      )}
    />
  );
}
