/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import BoardComponent from "./components/BoardComponent";
import MenuComponent from "./components/MenuComponent";
import GameContextProvider from "./context/GameContextProvider";
import styles from "./styling/App.module.scss"; //Import css module
import { withStyles } from "@material-ui/core/styles";
import { Box, Grommet, Main, ThemeType } from "grommet";

const theme: ThemeType = {
  global: {
    colors: {
      "light-2": "#f5f5f5",
      text: {
        light: "rgba(0, 0, 0, 0.87)",
      },
    },
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px",
    },
  },
};

function App() {
  return (
    <Grommet theme={theme}>
      <Box fill background="#121212" height="100vh" className="App">
        {/*Context provider component below makes sure the context is accessible in any children components*/}
        <GameContextProvider>
          <Box fill flex direction="row">
            <Main pad="large" flex="grow" justify="center" align="center">
              <BoardComponent />
            </Main>
            <Box>
              <MenuComponent />
            </Box>
          </Box>
        </GameContextProvider>
      </Box>
    </Grommet>
  );
}

export default App;
