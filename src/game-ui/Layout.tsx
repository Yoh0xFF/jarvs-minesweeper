import classNames from 'classnames';
import { ReactNode } from 'react';

import styles from './Layout.module.scss';

interface Props {
  controls: ReactNode;
  cellsGrid: ReactNode;
}

export default function Layout({ controls, cellsGrid }: Props) {
  return (
    <div className={styles.layout}>
      <section className={styles.header}>
        <header>
          <div className={classNames(styles.corner, styles.cornerTl)} />
          <div className={classNames(styles.border, styles.borderH)} />
          <div className={classNames(styles.corner, styles.cornerTr)} />
        </header>

        <section>
          <div className={classNames(styles.border, styles.borderV)} />
          <div className={styles.controls}>{controls}</div>
          <div className={classNames(styles.border, styles.borderV)} />
        </section>

        <footer>
          <div className={classNames(styles.joint, styles.jointL)} />
          <div className={classNames(styles.border, styles.borderH)} />
          <div className={classNames(styles.joint, styles.jointR)} />
        </footer>
      </section>

      <section className={styles.body}>
        <section>
          <div className={classNames(styles.border, styles.borderV)} />
          <div className={styles.cellsGrid}>{cellsGrid}</div>
          <div className={classNames(styles.border, styles.borderV)} />
        </section>

        <footer>
          <div className={classNames(styles.corner, styles.cornerBl)} />
          <div className={classNames(styles.border, styles.borderH)} />
          <div className={classNames(styles.corner, styles.cornerBr)} />
        </footer>
      </section>
    </div>
  );
}
