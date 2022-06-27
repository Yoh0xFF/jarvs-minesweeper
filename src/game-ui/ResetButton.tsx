import classNames from 'classnames';
import React, { useState } from 'react';

import styles from './ResetButton.module.scss';

interface Props {
  onReset: () => void;
}

export default function ResetButton({ onReset }: Props) {
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  return (
    <div
      onClick={() => onReset()}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      onMouseLeave={() => setMouseDown(false)}
      className={classNames(styles.face, styles.faceUnpressed, {
        [styles.facePressed]: mouseDown,
      })}
    />
  );
}
