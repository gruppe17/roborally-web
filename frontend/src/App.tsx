/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import BoardComponent from "./components/BoardComponent";
import NavBarComponent from "./components/NavBarComponent";
import GameContextProvider from "./context/GameContextProvider";
import styles from "./styling/App.module.scss"; //Import css module

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>

      {/*Context provider component below makes sure the context is accessible in any children components*/}
      <GameContextProvider>
        <div className={styles.container}>
        <NavBarComponent/>
          <div className={styles["game"]}>
            <BoardComponent />
          </div>
          <div className={styles["menu"]}>
            <div className={styles["button-row"]}>
              <button className={styles["btn"]}>New game</button>
              <button className={styles["btn"]}>Games</button>
              <button className={styles["btn"]}>Players</button>
            </div>

            <div className={styles["menu-content"]}>
              Each button will have different content here. The white button is
              the active menu. <br /> When the game is active this might show
              your program register and cards
            </div>
          </div>
        </div>
      </GameContextProvider>
    </div>
  );
}

export default App;
