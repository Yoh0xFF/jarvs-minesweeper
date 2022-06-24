import { useGameController } from 'game-logic/game-logic';
import React from 'react';

import CellGrid from './CellGrid';
import Controls from './Controls';
import Layout from './Layout';

export default function Game() {
  const [state, dispatch] = useGameController();

  const onCellClick = (x: number, y: number) => {
    dispatch({
      type: 'click',
      x,
      y,
    });
  };

  return (
    <Layout
      controls={<Controls />}
      cellGrid={<CellGrid board={state.board} onCellClick={onCellClick} />}
    />
  );
}
