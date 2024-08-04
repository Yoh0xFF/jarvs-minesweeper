import { GameStatus } from "../game-logic/types";
import styles from "./GameLayout.module.scss";
import confetti from "canvas-confetti";
import classNames from "classnames";
import { ReactNode, useEffect } from "react";

interface Props {
  gameStatus: GameStatus;
  controls: ReactNode;
  grid: ReactNode;
}

function fire(particleRatio: number, opts: confetti.Options) {
  confetti({
    ...opts,
    origin: { y: 0.7 },
    particleCount: Math.floor(200 * particleRatio),
  });
}

function runConfettiAnimation() {
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

export default function GameLayout({ gameStatus, controls, grid }: Props) {
  useEffect(() => {
    if (gameStatus !== "Success") return;

    runConfettiAnimation();
  }, [gameStatus]);

  return (
    <div
      className={classNames(styles.layout, {
        [styles.shake]: gameStatus === "Fail",
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
