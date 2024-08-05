import styles from './App.module.scss';
import Game from './game-ui/Game';

function App() {
  return (
    <div className={styles.page}>
      <Game />
    </div>
  );
}

export default App;
