import { generateNewBoard } from "../../game-logic/gameStateInit";
import { DifficultyLevel, GameStatus } from "../../game-logic/types";
import Grid from "../grid/Grid";
import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

test("Check grid rendered correctly", async () => {
  const difficultyLevel: DifficultyLevel = "Beginner";
  const gameStatus: GameStatus = "Pending";
  const board = generateNewBoard(difficultyLevel);

  render(
    <Grid
      difficultyLevel={difficultyLevel}
      gameStatus={gameStatus}
      board={board}
      onCellOpen={vi.fn()}
      onCellMark={vi.fn()}
    />
  );

  const grid = screen.getByTestId("grid");
  expect(grid.className).includes("grid");
  expect(grid.className).includes(difficultyLevel.toLowerCase());

  const buttons = await screen.findAllByRole("button");
  expect(buttons).toHaveLength(board.grid.length * board.grid[0].length);
});
