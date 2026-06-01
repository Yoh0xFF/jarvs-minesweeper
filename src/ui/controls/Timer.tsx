import { useEffect, useState } from 'react';
import { GameStatus } from '../../logic/types';
import Tableau from './Tableau';

interface Props {
  gameStatus: GameStatus;
}

export default function Timer({ gameStatus }: Props) {
  const [time, setTime] = useState<number>(0);
  const [prevStatus, setPrevStatus] = useState<GameStatus>(gameStatus);

  if (prevStatus !== gameStatus) {
    setPrevStatus(gameStatus);
    if (gameStatus === 'Pending') {
      setTime(0);
    }
  }

  useEffect(() => {
    if (gameStatus !== 'Progress') {
      return;
    }

    const startTime = Date.now();

    const intervalId = setInterval(() => {
      setTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [gameStatus]);

  return <Tableau number={time} />;
}
