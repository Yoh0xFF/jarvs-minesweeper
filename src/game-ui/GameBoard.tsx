import { Board } from 'game-logic/types';

import './GameBoard.scss';
import Tile from './Tile';

interface Props {
  board: Board;
}

export default function GameBoard({ board }: Props) {
  const { n, boardMap, boardMask } = board;

  return (
    <div className='game-board'>
      <div className='content'>
        <div className='border border-vertical' />

        <div className='tiles'>
          {boardMap.map((value, i) => (
            <Tile
              x={Math.floor(i / n)}
              y={i % n}
              value={value}
              hidden={boardMask[i]}
            />
          ))}
        </div>

        <div className='border border-vertical' />
      </div>

      <div className='footer'>
        <div className='corner corner-bottom-left' />
        <div className='border border-horizontal' />
        <div className='corner corner-bottom-right' />
      </div>
    </div>
  );
}
