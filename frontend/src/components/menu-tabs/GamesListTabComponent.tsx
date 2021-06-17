import { Box } from "@material-ui/core";
import * as React from "react";
import { useContext, useEffect } from "react";
import { Board } from "../../types/Board";
import GameContext from "../../context/GameContext";
import { GameComponent } from "../GameComponent";

export interface IGamesListProps {}

export function GamesListTab(props: IGamesListProps) {
  const { games } = useContext(GameContext);

  return (
    <Box display="flex" bgcolor="transparent" flexDirection="column">
      {games != null ? (
        games?.map((game, index) => (
          <GameComponent key={game.gameId} game={game}></GameComponent>
        ))
      ) : (
        <p> No games found!</p>
      )}
    </Box>
  );
}
