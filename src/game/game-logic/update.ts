import { Board } from './types';

function _boom() {}

function _expand() {}

function _open() {}

export default function updateGame(board: Board, x: number, y: number): Board {
  const value = board[x][y];

  switch (value) {
    case -1:
      _boom();
      break;
    case 0:
      _expand();
      break;
    default:
      _open();
      break;
  }

  return board;
}
