import { Button, IconButton, Typography, Box } from "@material-ui/core";
import { Edit, RemoveCircle, ExitToApp } from "@material-ui/icons";
import { TextInput } from "grommet";
import * as React from "react";
import { useContext, useState } from "react";
import GameApi from "../api/GameApi";
import { Game } from "../types/Game";
import GameContext from "../context/GameContext";

export function GameComponent(props: { game: Game; }) {
  const [isEditing, setIsEditing] = useState(false);
  const {selectGame, unselectGame, deleteGame, forceViewUpdate } = useContext(GameContext);
  return (
    <Box
      height="64px"
      justifyContent="start"
      alignItems="center"
      bgcolor="#404040"
      display="flex"
      flexDirection="row"
      width="100%"
    >
      {isEditing ? (
        <TextInput
          defaultValue={props.game.name}
          onChange={(value) => GameApi.editGameName(props.game.gameId, value.target.value)}
        ></TextInput>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            selectGame(props.game.gameId);
          }}>
          <Box flexDirection="row">
            <Typography>{props.game.name}</Typography>
            <Typography>
              {props.game.users && props.game.users.length}
            </Typography>
          </Box>
        </Button>
      )}
      <IconButton color={"secondary"} onClick={() => setIsEditing(!isEditing)}>
        <Edit />
      </IconButton>
      <IconButton color={"secondary"} onClick={() => {deleteGame(props.game.gameId)}}>
        <RemoveCircle />
      </IconButton>
      <IconButton color={"secondary"} onClick={() => unselectGame()}>
        <ExitToApp />
      </IconButton>
    </Box>
  );
}
