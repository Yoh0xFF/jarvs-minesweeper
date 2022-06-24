import classNames from 'classnames';
import { useGameController } from 'game-logic/game-logic';
import React from 'react';

import CellGrid from './CellGrid';
import Controls from './Controls';
import styles from './GameLayout.module.scss';

export default function GameLayout() {
  const [state] = useGameController();

  return (
    <div className={styles.gameLayout}>
      <section className={styles.gameHeader}>
        <header>
          <div className={classNames(styles.corner, styles.cornerTl)} />
          <div className={classNames(styles.border, styles.borderH)} />
          <div className={classNames(styles.corner, styles.cornerTr)} />
        </header>

        <section>
          <div className={classNames(styles.border, styles.borderV)} />
          <div className={styles.controls}>
            <Controls />
          </div>
          <div className={classNames(styles.border, styles.borderV)} />
        </section>

        <footer>
          <div className={classNames(styles.joint, styles.jointL)} />
          <div className={classNames(styles.border, styles.borderH)} />
          <div className={classNames(styles.joint, styles.jointR)} />
        </footer>
      </section>

      <section className={styles.gameBody}>
        <section>
          <div className={classNames(styles.border, styles.borderV)} />
          <div className={styles.cellGrid}>
            <CellGrid board={state.board} />
          </div>
          <div className={classNames(styles.border, styles.borderV)} />
        </section>

        <footer>
          <div className={classNames(styles.corner, styles.cornerBl)} />
          <div className={classNames(styles.border, styles.borderH)} />
          <div className={classNames(styles.corner, styles.cornerBr)} />
        </footer>
      </section>
    </div>
  );
}
