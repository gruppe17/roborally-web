import { PersonPin } from '@material-ui/icons';
import userEvent from '@testing-library/user-event';
import { Box } from 'grommet';
import * as React from 'react';
import { useContext } from 'react';
import { User } from '../../types/User';
import GameContext from '../../context/GameContext';
import { Typography } from '@material-ui/core';

export interface IUserComponentProps {
  user: User
}



export const UserComponent = (props : IUserComponentProps) => {
  const {user} = props;
  return (
<Box  height="80px" width="100%" gap="medium" justify="start" direction="row">
      <PersonPin/> 
      <Typography>{user.userName} </Typography>
      <Typography> {user.userId} </Typography>
</Box>
  )
}

export function PlayersTab () {
  const {currentGame, currentUser} = useContext(GameContext)

  return (
    <>
      {currentUser && (<UserComponent user={currentUser} />)}
      {currentGame && ( currentGame.users.map((user) => {
        if(user.userId !== currentUser.userId)
        return <UserComponent user={user}/>
        return null
      }))}
    </>
  );
}
