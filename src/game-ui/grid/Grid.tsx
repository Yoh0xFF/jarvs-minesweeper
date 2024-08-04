import { Board, DifficultyLevel, GameStatus } from "../../game-logic/types";
import Cell from "../grid/Cell";
import styles from "./Grid.module.scss";
import classNames from "classnames";

interface Props {
  difficultyLevel: DifficultyLevel;
  gameStatus: GameStatus;
  board: Board;
  onCellOpen: (x: number, y: number) => void;
  onCellMark: (x: number, y: number) => void;
}

export default function Grid({
  difficultyLevel,
  gameStatus,
  board,
  onCellOpen,
  onCellMark,
}: Props) {
  const { grid, mask } = board;

  return (
    <div
      data-testid="grid"
      className={classNames(styles.grid, styles[difficultyLevel.toLowerCase()])}
    >
      {grid.map((row, x) =>
        row.map((_, y) => (
          <Cell
            key={`cell-${x}-${y}`}
            x={x}
            y={y}
            gameStatus={gameStatus}
            cellType={grid[x][y]}
            maskType={mask[x][y]}
            onCellOpen={onCellOpen}
            onCellMark={onCellMark}
          />
        ))
      )}
    </div>
  );
}
