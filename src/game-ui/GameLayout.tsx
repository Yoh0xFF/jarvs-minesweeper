import classNames from 'classnames';
import { GameStatus } from 'game-logic/types';
import { ReactNode } from 'react';

import styles from './GameLayout.module.scss';

interface Props {
  gameStatus: GameStatus;
  controls: ReactNode;
  cellsGrid: ReactNode;
}

export default function GameLayout({ gameStatus, controls, cellsGrid }: Props) {
  return (
    <div
      className={classNames(styles.layout, {
        [styles.shake]: gameStatus === 'Fail',
      })}
    >
      <section>
        <div>{controls}</div>
      </section>

      <section>
        <div>{cellsGrid}</div>
      </section>
    </div>
  );
}
