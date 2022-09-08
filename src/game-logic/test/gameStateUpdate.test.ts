import { markCell, openCell } from 'game-logic/gameStateUpdate';
import * as clickMarkedCellTestCase from 'game-logic/test/board-test-cases/clickMarkedCell';
import * as clickOpenCellTryToExpandFailTestCase from 'game-logic/test/board-test-cases/clickOpenCellTryToExpandFail';
import * as clickOpenCellTryToExpandSuccessTestCase from 'game-logic/test/board-test-cases/clickOpenCellTryToExpandSuccess';
import * as discoverAllMinesTestCase from 'game-logic/test/board-test-cases/discoverAllMines';
import * as markCellTestCase from 'game-logic/test/board-test-cases/markCell';
import * as openCellWithHintTestCase from 'game-logic/test/board-test-cases/openCellWithHint';
import * as openCellWithMineTestCase from 'game-logic/test/board-test-cases/openCellWithMine';
import * as openEmptyCellTestCase from 'game-logic/test/board-test-cases/openEmptyCell';
import * as unmarkCellTestCase from 'game-logic/test/board-test-cases/unmarkCell';
import {
  Board,
  CellType,
  DifficultyLevel,
  GameStatus,
  MaskType,
} from 'game-logic/types';
import { boardConfigs } from 'game-logic/utils';

function initTestBoard(
  diffiultyLevel: DifficultyLevel,
  inputGrid: CellType[][],
  inputMask: MaskType[][]
): Board {
  const [rows, cols, mineCount] = boardConfigs.get(diffiultyLevel) ?? [0, 0, 0];

  const board: Board = {
    rows,
    cols,
    mineCount,
    grid: inputGrid,
    mask: inputMask,
  };

  return board;
}

function checkOpenCellTestCase(
  difficultyLevel: DifficultyLevel,
  inputMask: MaskType[][],
  inputGrid: CellType[][],
  inputX: number,
  inputY: number,
  expectedStatus: GameStatus,
  expectedMask: MaskType[][],
  expectedGrid?: CellType[][]
) {
  const board = initTestBoard(difficultyLevel, inputGrid, inputMask);

  const [newBoard, status] = openCell(inputX, inputY, board);

  expect(status).toBe(expectedStatus);
  expect(newBoard.mask).toEqual(expectedMask);
  expectedGrid && expect(newBoard.grid).toEqual(expectedGrid);
}

function checkMarkCellTestCase(
  difficultyLevel: DifficultyLevel,
  inputMask: MaskType[][],
  inputGrid: CellType[][],
  inputX: number,
  inputY: number,
  expectedMask: MaskType[][]
) {
  const board = initTestBoard(difficultyLevel, inputGrid, inputMask);

  const newBoard = markCell(inputX, inputY, board);

  expect(newBoard.mask).toEqual(expectedMask);
}

test('Open cell with hint', () => {
  const {
    difficultyLevel,
    inputGrid,
    inputMask,
    inputX,
    inputY,
    expectedStatus,
    expectedMask,
  } = openCellWithHintTestCase;

  checkOpenCellTestCase(
    difficultyLevel,
    inputMask,
    inputGrid,
    inputX,
    inputY,
    expectedStatus,
    expectedMask
  );
});

test('Open cell with mine', () => {
  const {
    difficultyLevel,
    inputGrid,
    inputMask,
    inputX,
    inputY,
    expectedStatus,
    expectedGrid,
    expectedMask,
  } = openCellWithMineTestCase;

  checkOpenCellTestCase(
    difficultyLevel,
    inputMask,
    inputGrid,
    inputX,
    inputY,
    expectedStatus,
    expectedMask,
    expectedGrid
  );
});

test('Open empy cell', () => {
  const {
    difficultyLevel,
    inputGrid,
    inputMask,
    inputX,
    inputY,
    expectedStatus,
    expectedMask,
  } = openEmptyCellTestCase;

  checkOpenCellTestCase(
    difficultyLevel,
    inputMask,
    inputGrid,
    inputX,
    inputY,
    expectedStatus,
    expectedMask
  );
});

test('Click open cell, try to expand with success', () => {
  const {
    difficultyLevel,
    inputGrid,
    inputMask,
    inputX,
    inputY,
    expectedStatus,
    expectedMask,
  } = clickOpenCellTryToExpandSuccessTestCase;

  checkOpenCellTestCase(
    difficultyLevel,
    inputMask,
    inputGrid,
    inputX,
    inputY,
    expectedStatus,
    expectedMask
  );
});

test('Click open cell, try to expand with fail', () => {
  const {
    difficultyLevel,
    inputGrid,
    inputMask,
    inputX,
    inputY,
    expectedStatus,
    expectedGrid,
    expectedMask,
  } = clickOpenCellTryToExpandFailTestCase;

  checkOpenCellTestCase(
    difficultyLevel,
    inputMask,
    inputGrid,
    inputX,
    inputY,
    expectedStatus,
    expectedMask,
    expectedGrid
  );
});

test('Discover all mines', () => {
  const {
    difficultyLevel,
    inputGrid,
    inputMask,
    inputX,
    inputY,
    expectedStatus,
    expectedMask,
  } = discoverAllMinesTestCase;

  checkOpenCellTestCase(
    difficultyLevel,
    inputMask,
    inputGrid,
    inputX,
    inputY,
    expectedStatus,
    expectedMask
  );
});

test('Click marked cell', () => {
  const {
    difficultyLevel,
    inputGrid,
    inputMask,
    inputX,
    inputY,
    expectedStatus,
    expectedMask,
  } = clickMarkedCellTestCase;

  checkOpenCellTestCase(
    difficultyLevel,
    inputMask,
    inputGrid,
    inputX,
    inputY,
    expectedStatus,
    expectedMask
  );
});

test('Mark cell', () => {
  const {
    difficultyLevel,
    inputGrid,
    inputMask,
    inputX,
    inputY,
    expectedMask,
  } = markCellTestCase;

  checkMarkCellTestCase(
    difficultyLevel,
    inputMask,
    inputGrid,
    inputX,
    inputY,
    expectedMask
  );
});

test('Unmark cell', () => {
  const {
    difficultyLevel,
    inputGrid,
    inputMask,
    inputX,
    inputY,
    expectedMask,
  } = unmarkCellTestCase;

  checkMarkCellTestCase(
    difficultyLevel,
    inputMask,
    inputGrid,
    inputX,
    inputY,
    expectedMask
  );
});
