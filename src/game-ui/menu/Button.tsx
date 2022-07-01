import React from 'react';

import styles from './Button.module.scss';

interface Props {
  label: string;
  onClick: () => void;
}

export default function Button({ label, onClick }: Props) {
  return (
    <div className={styles.button} onClick={() => onClick()}>
      {label}
    </div>
  );
}
