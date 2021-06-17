import React, { useState, ReactElement, useContext } from "react";
import {
  IconButton,
  Box as MBox,
  Tooltip,
  Typography,
} from "@material-ui/core/";
import { Gamepad, Add, People, Games } from "@material-ui/icons";
import { Text } from "grommet";
import { GamesListTab } from "./menu-tabs/GamesListTabComponent";
import { PlayersTab } from "./menu-tabs/PlayersTabComponent";
import { Box } from "grommet";
import GameContext from "../context/GameContext";
import UserContext from '../context/UserContext';

function TabButton(props: {
  setCurrentTab: Function;
  tabName: string;
  label: string;
  badge?: number;
  tooltip: string;
  icon?: JSX.Element;
}): JSX.Element {
  return (
    <Tooltip title={props.tooltip}>
      <IconButton
        color={"primary"}
        size={"medium"}
        onClick={() => props.setCurrentTab(props.tabName)}
      >
        {props.icon}
      </IconButton>
    </Tooltip>
  );
}

function MenuComponent(): ReactElement {
  const [currentTab, setCurrentTab] = useState<"games" | "players">("games");

  const { currentGame, createGame, changeGameName } = useContext(GameContext);
  const { currentUser } = useContext(UserContext)

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
      round={{ size: "small" }}
      pad="small"
      gap="medium"
      color="white"
      width="medium"
      height="100%"
      elevation="medium"
      justify="end"
    >
      <Text size="large">Roborally</Text>
      <Box pad="small" elevation="medium" overflow="hidden" round={{ size: "small" }} background="#E6E6E6" width="100%">
        <Box gap="small" justify="center" direction="row">
          <Tooltip title="Current user. The user is randomly made for you and saved in a cookie for your convenience">
            <Box
              height="xsmall"
              width="small"
              align="center"
              gap="xsmall"
              direction="column"
            >
              <People />{" "}
              <Typography>{currentUser && currentUser.userName}</Typography>
            </Box>
          </Tooltip>

          <Tooltip title="The current game you are playing in">
            <Box
              height="xsmall"
              width="small"
              overflow="hidden"
              align="center"
              gap="xsmall"
              direction="column"
            >
              <Games />{" "}
              <Text wordBreak="break-all">
                {currentGame && currentGame.name}
              </Text>
            </Box>
          </Tooltip>
        </Box>
      </Box>
      <Box
        pad={"small"}
        gap="medium"
        justify="center"
        margin={{ bottom: "small" }}
        alignContent="between"
        flex
        direction="row"
      >
        <Tooltip title="Create new game">
          <IconButton
            color={"primary"}
            size={"medium"}
            onClick={() => {
              if (currentTab !== "games") setCurrentTab("games");
              createGame().then((gameId) =>
                changeGameName(gameId, currentUser.userName + "'s game")
              );
            }}
          >
            <Add />
          </IconButton>
        </Tooltip>
        <TabButton
          tooltip="See all games"
          setCurrentTab={setCurrentTab}
          tabName="games"
          label="Games"
          icon={<Gamepad />}
        />
        <TabButton
          tooltip="See players in current game"
          setCurrentTab={setCurrentTab}
          tabName="players"
          label="Players"
          icon={<People />}
        />
      </Box>
      <Box
        overflow={{ horizontal: "hidden", vertical: "scroll" }}
        width="100%"
        height="85%"
      >
        {tabContent()}
      </Box>
    </Box>
  );
}

export default MenuComponent;
