import React from 'react';

import Button from './Button';
import styles from './Menu.module.scss';

export default function Menu() {
  return (
    <div className={styles.menu}>
      <Button label='Beginner' onClick={() => {}} />
      <Button label='Intermediate' onClick={() => {}} />
      <Button label='Expert' onClick={() => {}} />
    </div>
  );
}
