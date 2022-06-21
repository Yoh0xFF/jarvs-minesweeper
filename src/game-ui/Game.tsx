import { useGameController } from 'game-logic/game-logic';

import './Game.scss';
import GameBoard from './GameBoard';
import GameHeader from './GameHeader';

export default function Game() {
  const [state, dispatch] = useGameController();

  return (
    <div className='game-container'>
      <GameHeader />
      <GameBoard board={state.board} />
    </div>
  );
}
