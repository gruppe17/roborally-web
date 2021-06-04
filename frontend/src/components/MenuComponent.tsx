import React, { useState, ReactElement } from "react";
import styles from "../styling/MenuComponent.module.scss";
import { NewGameTab } from "./menu-tabs/NewGameTabComponent";
import { GamesListTab } from "./menu-tabs/GamesListTabComponent";
import { PlayersTab } from "./menu-tabs/PlayersTabComponent";
import { Button } from "@material-ui/core";

function MenuComponent(): ReactElement {
  const [currentTab, setCurrentTab] =
    useState<"new-game" | "games" | "players">("new-game");

  const tabContent = () => {
    switch (currentTab) {
      case "new-game":
        return <NewGameTab />;
      case "games":
        return <GamesListTab />;
      case "players":
        return <PlayersTab />;
    }
  };
  return (
    <div className={styles["menu"]}>
      <div className={styles["button-row"]}>
        <Button
         variant="contained" color="primary" 
          onClick={() => setCurrentTab("new-game")}
        >
          New game
        </Button>
        <Button
         variant="contained" color="primary" 

          onClick={() => setCurrentTab("games")}
        >
          Games
        </Button>
        <Button
         variant="contained" color="primary" 

          onClick={() => setCurrentTab("players")}
        >
          Players
        </Button>
      </div>

      <div className={styles["menu-content"]}>{tabContent()}</div>
    </div>
  );
}

export default MenuComponent;
