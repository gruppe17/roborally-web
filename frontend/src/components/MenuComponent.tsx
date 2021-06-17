import React, { useState, ReactElement, useContext } from "react";
import { IconButton } from "@material-ui/core/";
import { Gamepad, Add, People , Games} from "@material-ui/icons";

import { GamesListTab } from "./menu-tabs/GamesListTabComponent";
import { PlayersTab } from "./menu-tabs/PlayersTabComponent";
import { Box } from "grommet";
import GameContext from "../context/GameContext";
import GameApi from "../api/GameApi";


function TabButton(props: {
  setCurrentTab: Function;
  tabName: string;
  label: string;
  badge?: number;
  icon?: JSX.Element;
}) : JSX.Element {
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
    useState<"games" | "players">("games");

  const { currentGame, currentUser, createGame, forceViewUpdate } = useContext(GameContext);

  const tabContent = () => {
    switch (currentTab) {
      case "games":
        return <GamesListTab />;
      case "players":
        return <PlayersTab />;
    }
  };
  return (
    <Box
      pad="small"
      gap="small"
      color="white"
      width="medium"
      height="100%"
      background="#181818"
    >
      <Box justify="evenly" direction="row">
        <Box direction="row">
          <People /> {currentUser.userName}
        </Box>
        <Box direction="row">
          <Games /> {currentGame.name}
        </Box>
      </Box>

      <Box
        pad={"small"}
        gap="medium"
        justify="evenly"
        alignContent="between"
        flex
        direction="row"
      >
        <IconButton
          color={"primary"}
          size={"medium"}
          onClick={ () => {
            createGame()
            if(currentTab !== "games") setCurrentTab("games")
          }}
        >
          <Add/>
        </IconButton>
        <TabButton
          setCurrentTab={setCurrentTab}
          tabName="games"
          label="Games"
          icon={<Gamepad />}
        />
        <TabButton
          setCurrentTab={setCurrentTab}
          tabName="players"
          label="Players"
          icon={<People />}
        />
      </Box>
      <Box height="85%">{tabContent()}</Box>
    </Box>
  );
}

export default MenuComponent;
