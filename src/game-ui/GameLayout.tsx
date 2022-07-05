import classNames from 'classnames';
import { ReactNode } from 'react';

import styles from './GameLayout.module.scss';

import { GameStatus } from '@app/game-logic/types';

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
