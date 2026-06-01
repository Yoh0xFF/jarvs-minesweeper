import { useEffect, useRef, useState } from 'react';
import { GameStatus } from '../../game-logic/types';
import Tableau from './Tableau';

interface Props {
  gameStatus: GameStatus;
}

export default function Timer({ gameStatus }: Props) {
  const [time, setTime] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (gameStatus !== 'Progress') {
      if (gameStatus === 'Pending') {
        startTimeRef.current = null;
      }
      return;
    }

    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
    }

    const intervalId = setInterval(() => {
      setTime(Math.floor((Date.now() - startTimeRef.current!) / 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [gameStatus]);

  return <Tableau number={gameStatus === 'Pending' || startTimeRef.current === null ? 0 : time} />;
}
