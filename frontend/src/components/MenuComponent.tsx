import React, { useState, ReactElement } from "react";
import styles from "../styling/MenuComponent.module.scss";
import { NewGameTab } from "./menu-tabs/NewGameTabComponent";
import { GamesListTab } from "./menu-tabs/GamesListTabComponent";
import { PlayersTab } from "./menu-tabs/PlayersTabComponent";
import { Box, Button } from "grommet";

function TabButton(props : {setCurrentTab: Function, tabName: string, label: string }) {
  return (
    <Button
      size="medium"
      primary    
      label={props.label}  
      onClick={() => props.setCurrentTab(props.tabName)}
    >
     
    </Button>
  );
}

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
    <Box gap="small" color="white" width="medium" fill background="#181818">
      <Box gap="medium" flex direction="row" height="small" width="100%">
        <TabButton setCurrentTab={setCurrentTab} tabName="new-game" label="New game" />
        <TabButton setCurrentTab={setCurrentTab} tabName="games" label="Games" />
        <TabButton setCurrentTab={setCurrentTab} tabName="players" label="Players" />
      </Box>
      <Box height="90%">{tabContent()}</Box>
    </Box>
  );
}

export default MenuComponent;
