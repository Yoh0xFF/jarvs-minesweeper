import { GameStatus } from 'game-logic/types';
import Tableau from 'game-ui/controls/Tableau';
import React, { useEffect, useState } from 'react';

interface Props {
  gameStatus: GameStatus;
}

export default function Timer({ gameStatus }: Props) {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    if (gameStatus !== 'Progress') {
      if (gameStatus === 'Pending') {
        setTime(0);
      }
      return;
    }

    const intervalId = setInterval(() => {
      setTime(time + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [gameStatus, time]);

  return <Tableau number={time} />;
}
