/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import BoardComponent from "./components/BoardComponent";
import MenuComponent from "./components/MenuComponent";
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
          <NavBarComponent />
          <div className={styles["game"]}>
            <BoardComponent />
          </div>
          <MenuComponent/>
        </div>
      </GameContextProvider>
    </div>
  );
}

export default App;
