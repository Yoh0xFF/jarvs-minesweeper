import { ReactNode } from 'react';

import styles from './Layout.module.scss';

interface Props {
  controls: ReactNode;
  cellsGrid: ReactNode;
}

export default function Layout({ controls, cellsGrid }: Props) {
  return (
    <div className={styles.layout}>
      <section>
        <div className={styles.controls}>{controls}</div>
      </section>

      <section>
        <div className={styles.cellsGrid}>{cellsGrid}</div>
      </section>
    </div>
  );
}
