import classNames from 'classnames';
import { Board } from 'game-logic/types';

import styles from './GameBoard.module.scss';
import Tile from './Tile';

interface Props {
  board: Board;
}

export default function GameBoard({ board }: Props) {
  const { n, boardMap, boardMask } = board;

  return (
    <div className={styles.gameBoard}>
      <section>
        <div className={classNames(styles.border, styles.borderVertical)} />

        <div className={styles.tiles}>
          {boardMap.map((value, i) => (
            <Tile
              x={Math.floor(i / n)}
              y={i % n}
              value={value}
              hidden={boardMask[i]}
            />
          ))}
        </div>

        <div className={classNames(styles.border, styles.borderVertical)} />
      </section>

      <footer>
        <div className={classNames(styles.corner, styles.cornerBottomLeft)} />
        <div className={classNames(styles.border, styles.borderHorizontal)} />
        <div className={classNames(styles.corner, styles.cornerBottomRight)} />
      </footer>
    </div>
  );
}
