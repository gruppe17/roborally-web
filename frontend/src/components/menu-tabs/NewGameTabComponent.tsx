import { Button } from '@material-ui/core';
import * as React from 'react';
import GameApi from '../../api/GameApi';
import { Box } from "grommet";

export interface INewGameTabProps {
}

export function NewGameTab (props: INewGameTabProps) {
  return (
    <Box>
      <Button variant="contained" color="primary" onClick={() => GameApi.createBoard("Noice game", 8, 8)}>
        New Default Game
      </Button>
    </Box>
  );
}
