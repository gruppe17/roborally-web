/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import BoardComponent from "./components/BoardComponent";
import MenuComponent from "./components/MenuComponent";
import GameContextProvider from "./context/GameContextProvider";
import styles from "./styling/App.module.scss"; //Import css module
import { createMuiTheme, ThemeProvider, withStyles } from "@material-ui/core/styles";
import { Box, Grommet, Main, ThemeType } from "grommet";
import { red, blue, green, purple } from "@material-ui/core/colors";

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

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      light: purple[500],
      main: purple[700],
      dark: purple[800],
    },
    secondary: {
      light: green[600],
      main: green[800],
      dark: '#b9f6ca',
    },
    warning:{
      main: red[500],
    }
  },
});

function App() {
  return (
    <div className={styles.app}>
      <Grommet theme={theme}>
      <ThemeProvider theme={muiTheme}>
        <Box background="#121212" height="100%" width="100%" direction="row">
          <GameContextProvider>
            <Main
              pad="large"
              width="100vw"
              flex="grow"
              justify="center"
              align="center"
              direction="row"
            >
              <Box flex="grow" justify="center" align="center">
                <BoardComponent />
              </Box>

              <Box height="100%" >
                <MenuComponent />
              </Box>
            </Main>
          </GameContextProvider>
        </Box>
        </ThemeProvider>
      </Grommet>
    </div>
  );
}

export default App;
