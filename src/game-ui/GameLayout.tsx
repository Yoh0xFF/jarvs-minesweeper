import { ReactNode } from 'react';

import styles from './GameLayout.module.scss';

interface Props {
  controls: ReactNode;
  cellsGrid: ReactNode;
}

export default function GameLayout({ controls, cellsGrid }: Props) {
  return (
    <div className={styles.layout}>
      <section>
        <div>{controls}</div>
      </section>

      <section>
        <div>{cellsGrid}</div>
      </section>
    </div>
  );
}
