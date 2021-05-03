import React, { useState, ReactElement } from "react";
import styles from "../styling/MenuComponent.module.scss";
import { NewGameTab } from "./menu-tabs/NewGameTabComponent";
import { GamesListTab } from "./menu-tabs/GamesListTabComponent";
import { PlayersTab } from "./menu-tabs/PlayersTabComponent";

function MenuComponent(): ReactElement {
  const [currentTab, setCurrentTab] = useState<
    "new-game" | "games" | "players"
  >("new-game");

  const tabContent = () => {
    switch (currentTab) {
      case "new-game":
        return <NewGameTab />;
      case "games":
        return <GamesListTab/>;
      case "players":
        return <PlayersTab/>;
    }
  };
  return (
    <div className={styles["menu"]}>
      <div className={styles["button-row"]}>
        <button
          onClick={() => setCurrentTab("new-game")}
          className={styles["btn"]}
        >
          New game
        </button>
        <button
          onClick={() => setCurrentTab("games")}
          className={styles["btn"]}
        >
          Games
        </button>
        <button
          onClick={() => setCurrentTab("players")}
          className={styles["btn"]}
        >
          Players
        </button>
      </div>

      <div className={styles["menu-content"]}>
       {tabContent()}
      </div>
    </div>
  );
}

export default MenuComponent;
