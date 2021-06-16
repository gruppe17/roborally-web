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
    <div className={styles.app}>
      <Grommet theme={theme}>
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
      </Grommet>
    </div>
  );
}

export default App;
