import classNames from 'classnames';
import React from 'react';

import styles from './GameHeader.module.scss';
import Tableau from './Tableau';

export default function GameHeader() {
  return (
    <div className={styles.gameHeader}>
      <header>
        <div className={classNames(styles.corner, styles.cornerTopLeft)} />
        <div className={classNames(styles.border, styles.borderHorizontal)} />
        <div className={classNames(styles.corner, styles.cornerTopRight)} />
      </header>

      <section>
        <div className={classNames(styles.border, styles.borderVertical)} />

        <div className={styles.controls}>
          <Tableau number={123} />
          <div className='face face-unpressed' />
          <Tableau number={123} />
        </div>

        <div className={classNames(styles.border, styles.borderVertical)} />
      </section>

      <footer>
        <div className={classNames(styles.joint, styles.jointLeft)} />
        <div className={classNames(styles.border, styles.borderHorizontal)} />
        <div className={classNames(styles.joint, styles.jointRight)} />
      </footer>
    </div>
  );
}
