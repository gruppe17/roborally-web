import { Box, Button, Typography } from "@material-ui/core";
import * as React from "react";
import { useEffect, useState } from "react";
import GameApi from "../../api/GameApi";
import { Board } from '../../types/Board';

export interface IGamesListProps {}

function GameComponent(props : {game: Board}) {
  
  return (
    <Box height="64px" justifyContent="start"
     alignItems="center" bgcolor="#404040" display="flex" flexDirection="row" width="100%">
      <Button variant="contained" color="primary" onClick={() => {}}>
        Game: "{props.game.boardName }" Players: { props.game.playerDtos && props.game.playerDtos.length}
      </Button>
    </Box>
  );
}

export function GamesListTab(props: IGamesListProps) {
  const [boards, setBoards] = useState<Board[]>();

  useEffect(() => {
    async function fetchBoard() {
      let fetchedBoards = await GameApi.getBoards();
      setBoards(fetchedBoards.data);
    }

    fetchBoard();
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      {boards != null ? (
        boards?.map((board, index) => (
          <GameComponent
            key={index}
            game={board}
          ></GameComponent>
        ))
      ) : (
        <p> No games found!</p>
      )}
    </Box>
  );
}
