import { Button } from '@material-ui/core';
import * as React from 'react';
import GameApi from '../../api/GameApi';

export interface INewGameTabProps {
}

export function NewGameTab (props: INewGameTabProps) {
  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => GameApi.createBoard("Noice game", 8, 8)}>
        New Default Game
      </Button>
    </div>
  );
}
