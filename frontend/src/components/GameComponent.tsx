import { Button, IconButton, Box, Tooltip, useTheme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Edit, RemoveCircle, ExitToApp } from "@material-ui/icons";
import { TextInput } from "grommet";
import { useContext, useState } from "react";
import { Game, NO_GAME_GAMEID } from "../types/Game";
import GameContext from "../context/GameContext";

export function GameComponent(props: { game: Game }) {
  const [isEditing, setIsEditing] = useState(false);
  const { selectGame, unselectGame, deleteGame, changeGameName, currentGame } =
    useContext(GameContext);

  const theme = useTheme();
  const inGame: boolean = currentGame.gameId !== NO_GAME_GAMEID;
  return (
    <Box
      height="small"
      justifyContent="space-between"
      alignItems="center"
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
          <Tooltip
            title={
              props.game.users && props.game.users.length + " players in game"
            }
          >
            <Typography style={{ fontSize: "20px" }} noWrap>
              {props.game.users && props.game.users.length}p
            </Typography>
          </Tooltip>
        </Box>
        {isEditing ? (
          <TextInput
            defaultValue={props.game.name}
            onChange={async (value) => {
              await changeGameName(props.game.gameId, value.target.value);
            }}
          ></TextInput>
        ) : (
          <Tooltip
            title={
              inGame
                ? "You are already in a game you cannot join another"
                : "Join " + props.game.name
            }
          >
            <Box width="100%">
              <Button
                fullWidth
                size="small"
                disabled={inGame}
                variant="contained"
                color="primary"
                onClick={
                  inGame
                    ? async () => {}
                    : async () => {
                        await selectGame(props.game.gameId);
                      }
                }
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
            </Box>
          </Tooltip>
        )}
      </Box>
      <Box
        alignContent="end"
        flexWrap="nowrap"
        flexGrow
        alignItems="center"
        justifyContent="center"
        justifyItems="center"
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
            onClick={async () => {
              await deleteGame(props.game.gameId);
            }}
          >
            <RemoveCircle />
          </IconButton>
        </Tooltip>
        {currentGame.gameId === props.game.gameId && !currentGame.started && (
          <Tooltip title={"Leave " + props.game.name}>
            <IconButton
              onClick={async () => await unselectGame()}
            >
             
              <ExitToApp color="action" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
}
