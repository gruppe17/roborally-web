import React, { FunctionComponent, useContext } from "react";
import { SpaceComponent } from "./SpaceComponent";
import styles from "../styling/BoardComponent.module.scss"; //Import css module
import GameContext from "../context/GameContext";
import { HashLoader } from "react-spinners";
import { Button, Tooltip, Typography, withStyles } from "@material-ui/core";
import { Box } from "grommet";
import { green, red } from "@material-ui/core/colors";
import BoardContext from '../context/BoardContext';
/*
If the board component took any props/arguments they would be declared inside the type below
see the space component for an example.
 */

type BoardComponentProps = {};
const BoardComponent: FunctionComponent<BoardComponentProps> = () => {

  
  


  //{...} context is known as object destructuring
  const { currentGame, startGame } = useContext(GameContext); //Hook form of Context.Consumer, used to access the context
  const { board, loaded } = useContext(BoardContext)

 
  return (
    /*Apply css on div below*/
    <Box gap="small">
          { (loaded && currentGame.started) && (<Typography > Current player: { board.currentPlayerDto?.playerName ? board.currentPlayerDto?.playerName : "No current player"} </Typography>)} 
    <div data-testid="board" className={styles.container}>
      {/*
                The {...} notation is JSX allowing us to blend HTML and JS/TS together
                The first map call returns an array of "divs" which are rendered.
                Keys helps react identify where a change has happend and thus which component to rerender upon changes
                The last map returns an array of space components, note that a prop/argument is passed ("space")
                The result of the code segment below will be something like:
                    <div key="spaceArray0">
                        <SpaceComponent key="space0" space={SOME_SPACE_OBJECT}/>
                        ...
                        <SpaceComponent key="space7" space={SOME_SPACE_OBJECT}/>
                    </div>
                    ....
                    <div key="spaceArray7">
                        <SpaceComponent key="space0" space={SOME_SPACE_OBJECT}/>
                        ...
                        <SpaceComponent key="space7" space={SOME_SPACE_OBJECT}/>
                    </div>

            */}
      {loaded ? (
       
        board.spaceDtos.map((spaceArray, index) => {
            return (
              <div key={"spaceArray" + index}>
                {spaceArray.map((space, index) => (
                  <SpaceComponent key={"space" + index} space={space} />
                ))}
              </div>
            );
          })
        
      ) : (
        <HashLoader color="#4CAF50" />
      )}
    </div>
    { (loaded && !currentGame.started) && <Tooltip title={currentGame.users.length < 2 ? "You need to be between 2 to 6 players to start the game!" : "Press to start the game" }><Box><Button  color="primary" variant="contained" disabled={currentGame.users.length < 2} onClick={() => startGame(currentGame.gameId)} > Start game </Button></Box></Tooltip>} 
    </Box>
  );
};

export default BoardComponent;
