import { PersonPin } from '@material-ui/icons';
import userEvent from '@testing-library/user-event';
import { Box } from 'grommet';
import * as React from 'react';
import { useContext } from 'react';
import { User } from '../../types/User';
import GameContext from '../../context/GameContext';
import { Typography } from '@material-ui/core';
import { Player } from '../../types/Player';

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
  const {board} = useContext(GameContext)

  return (
    <>
      {board && ( board.playerDtos.map((player) => {
        return <UserComponent key={player.playerId} player={player}/>
      }))}
    </>
  );
}
