import { Button } from "@material-ui/core";
import * as React from "react";
import GameApi from "../../api/GameApi";
import { Box } from "grommet";

export interface INewGameTabProps {}

export function NewGameTab(props: INewGameTabProps) {
  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          const gameId = (await GameApi.createGame()).data;
        }}
      >
        New Default Game
      </Button>
    </Box>
  );
}
