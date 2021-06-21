import { Button, IconButton, Box, Tooltip } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Edit, RemoveCircle, ExitToApp } from "@material-ui/icons";
import { TextInput } from "grommet";
import { useContext, useState } from "react";
import { Game } from "../types/Game";
import GameContext from "../context/GameContext";

export function GameComponent(props: { game: Game }) {
  const [isEditing, setIsEditing] = useState(false);
  const { selectGame, unselectGame, deleteGame, changeGameName, currentGame } =
    useContext(GameContext);
  return (
    <Box
      height="small"
      justifyContent="space-between"
      alignItems="start"
      display="flex"
      flexDirection="row"
      width="100%"
      justifyItems="space-between"
    >
      <Box
        minWidth="50%"
        maxWidth="50%"
        flexWrap="nowrap"
        flexGrow
        display="flex"
        flexDirection="row"
      >
        <Box marginRight="8px">
        <Tooltip title={props.game.users && props.game.users.length + " players in game"} >
          <Typography style={{ fontSize: "20px" }} noWrap>
            {props.game.users && props.game.users.length}p
          </Typography>
          </Tooltip>
        </Box>
        {isEditing ? (
          <TextInput
            defaultValue={props.game.name}
            onChange={(value) => {
              changeGameName(props.game.gameId, value.target.value);
            }}
          ></TextInput>
        ) : (
          <Tooltip title={"Join " + props.game.name}>
            <Button
              fullWidth
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                selectGame(props.game.gameId);
              }}
            >
              <Box
                textOverflow="ellipsis"
                display="block"
                overflow="hidden"
                flexDirection="row"
              >
                <Typography style={{ fontSize: "12px" }} noWrap>
                  {props.game.name}
                </Typography>
              </Box>
            </Button>
          </Tooltip>
        )}
      </Box>
      <Box
        alignContent="end"
        flexWrap="nowrap"
        flexGrow
        display="flex"
        flexDirection="row"
      >
        <Tooltip title={"Edit " + props.game.name}>
          <IconButton
            color={"secondary"}
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Delete " + props.game.name}>
          <IconButton
            color={"secondary"}
            onClick={() => {
              deleteGame(props.game.gameId);
            }}
          >
            <RemoveCircle />
          </IconButton>
        </Tooltip>
        {currentGame.gameId === props.game.gameId && !currentGame.started && (
          <Tooltip title={"Leave " + props.game.name}>
            <IconButton color={"secondary"} onClick={() => unselectGame()}>
              <ExitToApp />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
}
