import React, { useState, ReactElement } from "react";
import {IconButton } from '@material-ui/core/';
import { Gamepad, Add, People } from '@material-ui/icons';

import styles from "../styling/MenuComponent.module.scss";
import { NewGameTab } from "./menu-tabs/NewGameTabComponent";
import { GamesListTab } from "./menu-tabs/GamesListTabComponent";
import { PlayersTab } from "./menu-tabs/PlayersTabComponent";
import { Box } from "grommet";

function TabButton(props: {
  setCurrentTab: Function;
  tabName: string;
  label: string;
  badge?: number
  icon?: JSX.Element
}) {
  return (
    <IconButton
    
    color={"primary"}
    size={"medium"}
      onClick={() => props.setCurrentTab(props.tabName)}
    >
      {props.icon}
    </IconButton>
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
    <Box pad="small" gap="small" color="white" width="medium" height="100%" background="#181818">
      <Box pad={"small"} gap="medium" justify="evenly" alignContent="between" flex direction="row"  >
        <TabButton
          setCurrentTab={setCurrentTab}
          tabName="new-game"
          label="New game" 
          icon={<Add />}
        />
        <TabButton
          setCurrentTab={setCurrentTab}
          tabName="games"
          label="Games"
          icon={<Gamepad/>}
        />
        <TabButton
          setCurrentTab={setCurrentTab}
          tabName="players"
          label="Players"
          icon={<People/>}

        />
      </Box>
      <Box height="85%">{tabContent()}</Box>
    </Box>
  );
}

export default MenuComponent;
