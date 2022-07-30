import { openCell } from 'game-logic/gameStateUpdate';
import * as clickOpenCellTryToExpandFailTestCase from 'game-logic/test/board-test-cases/clickOpenCellTryToExpandFail';
import * as clickOpenCellTryToExpandSuccessTestCase from 'game-logic/test/board-test-cases/clickOpenCellTryToExpandSuccess';
import * as openCellWithHintTestCase from 'game-logic/test/board-test-cases/openCellWithHint';
import * as openCellWithMineTestCase from 'game-logic/test/board-test-cases/openCellWithMine';
import * as openEmptyCellTestCase from 'game-logic/test/board-test-cases/openEmptyCell';
import { Board, CellType, DifficultyLevel, MaskType } from 'game-logic/types';
import { boardConfigs } from 'game-logic/utils';

function _initTestBoard(
  diffiultyLevel: DifficultyLevel,
  inputGrid: Array<Array<CellType>>,
  inputMask: Array<Array<MaskType>>
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

  const board = _initTestBoard(difficultyLevel, inputGrid, inputMask);

  const [newBoard, status] = openCell(inputX, inputY, board);

  expect(status).toBe(expectedStatus);
  expect(newBoard.mask).toEqual(expectedMask);
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

  const board = _initTestBoard(difficultyLevel, inputGrid, inputMask);

  const [newBoard, status] = openCell(inputX, inputY, board);

  expect(status).toBe(expectedStatus);
  expect(newBoard.grid).toEqual(expectedGrid);
  expect(newBoard.mask).toEqual(expectedMask);
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

  const board = _initTestBoard(difficultyLevel, inputGrid, inputMask);

  const [newBoard, status] = openCell(inputX, inputY, board);

  expect(status).toBe(expectedStatus);
  expect(newBoard.mask).toEqual(expectedMask);
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

  const board = _initTestBoard(difficultyLevel, inputGrid, inputMask);

  const [newBoard, status] = openCell(inputX, inputY, board);

  expect(status).toBe(expectedStatus);
  expect(newBoard.mask).toEqual(expectedMask);
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

  const board = _initTestBoard(difficultyLevel, inputGrid, inputMask);

  const [newBoard, status] = openCell(inputX, inputY, board);

  expect(status).toBe(expectedStatus);
  expect(newBoard.grid).toEqual(expectedGrid);
  expect(newBoard.mask).toEqual(expectedMask);
});
