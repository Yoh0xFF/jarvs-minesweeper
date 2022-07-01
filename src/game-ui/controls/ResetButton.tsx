import classNames from 'classnames';
import { GameStatus } from 'game-logic/types';
import React, { useState } from 'react';

import styles from './ResetButton.module.scss';

const faceTypeMap = new Map<GameStatus, string>([
  ['Pending', 'faceUnpressed'],
  ['Progress', 'faceUnpressed'],
  ['Success', 'faceWin'],
  ['Fail', 'faceBoom'],
]);

interface Props {
  gameStatus: GameStatus;
  onReset: () => void;
}

export default function ResetButton({ gameStatus, onReset }: Props) {
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  const faceType = faceTypeMap.get(gameStatus) ?? 'faceUnpressed';

  return (
    <div
      onClick={() => onReset()}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      onMouseLeave={() => setMouseDown(false)}
      className={classNames(
        styles.face,
        { [styles[faceType]]: !mouseDown },
        { [styles.facePressed]: mouseDown }
      )}
    />
  );
}
