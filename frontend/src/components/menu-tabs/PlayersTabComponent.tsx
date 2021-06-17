import { PersonPin } from '@material-ui/icons';
import userEvent from '@testing-library/user-event';
import { Box } from 'grommet';
import * as React from 'react';
import { useContext } from 'react';
import { Typography } from '@material-ui/core';
import { Player } from '../../types/Player';
import BoardContext from '../../context/BoardContext';

export interface IUserComponentProps {
  player: Player
}



export const UserComponent = (props : IUserComponentProps) => {
  const {player} = props;
  return (
<Box  height="80px" width="100%" gap="medium" justify="start" direction="row">
      <PersonPin/> 
      <Typography>{player.playerName} </Typography>
</Box>
  )
}

export function PlayersTab () {
  const {board} = useContext(BoardContext)

  return (
    <>
      {board && ( board.playerDtos.map((player) => {
        return <UserComponent key={player.playerId} player={player}/>
      }))}
    </>
  );
}
