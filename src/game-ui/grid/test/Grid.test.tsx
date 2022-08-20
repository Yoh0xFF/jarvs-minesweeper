import { render, screen } from '@testing-library/react';
import { generateNewBoard } from 'game-logic/gameStateInit';
import { DifficultyLevel, GameStatus } from 'game-logic/types';
import Grid from 'game-ui/grid/Grid';

test('Check grid rendered correctly', async () => {
  const difficultyLevel: DifficultyLevel = 'Beginner';
  const gameStatus: GameStatus = 'Pending';
  const board = generateNewBoard(difficultyLevel);

  render(
    <Grid
      difficultyLevel={difficultyLevel}
      gameStatus={gameStatus}
      board={board}
      onCellOpen={jest.fn()}
      onCellMark={jest.fn()}
    />
  );

  const grid = screen.getByTestId('grid');
  expect(grid.classList).toContain('grid');
  expect(grid.classList).toContain(difficultyLevel.toLowerCase());

  const buttons = await screen.findAllByRole('button');
  expect(buttons).toHaveLength(board.grid.length * board.grid[0].length);
});
