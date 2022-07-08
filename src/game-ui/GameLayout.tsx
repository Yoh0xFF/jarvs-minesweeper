import confetti from 'canvas-confetti';
import classNames from 'classnames';
import { GameStatus } from 'game-logic/types';
import { ReactNode, useEffect } from 'react';

import styles from './GameLayout.module.scss';

interface Props {
  gameStatus: GameStatus;
  controls: ReactNode;
  grid: ReactNode;
}

function _fire(particleRatio: number, opts: confetti.Options) {
  confetti({
    ...opts,
    origin: { y: 0.7 },
    particleCount: Math.floor(200 * particleRatio),
  });
}

function _runConfettiAnimation() {
  _fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  _fire(0.2, {
    spread: 60,
  });
  _fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  _fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  _fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

export default function GameLayout({ gameStatus, controls, grid }: Props) {
  useEffect(() => {
    if (gameStatus !== 'Success') return;

    _runConfettiAnimation();
  }, [gameStatus]);

  return (
    <div
      className={classNames(styles.layout, {
        [styles.shake]: gameStatus === 'Fail',
      })}
    >
      <section>
        <div>{controls}</div>
      </section>

      <section>
        <div>{grid}</div>
      </section>
    </div>
  );
}
