/* eslint-disable jsx-a11y/anchor-is-valid */

import BoardComponent from "./components/BoardComponent";
import MenuComponent from "./components/MenuComponent";
import GameContextProvider from "./context/GameContextProvider";
import styles from "./styling/App.module.scss"; //Import css module
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Box, Main } from "grommet";
import { red, green, purple } from "@material-ui/core/colors";
import UserContextProvider from "./context/UserContextProvider";
import BoardContextProvider from './context/BoardContextProvider';

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: purple[700],
    },
    secondary: {
      main: green[800],
    },
    warning:{
      main: red[500],
    },
  }
});



function App() {
  return (
    <div className={styles.app}>
      <ThemeProvider theme={muiTheme}>
        <Box background="#121212" height="100%" width="100%" direction="row">
          <UserContextProvider>
            <BoardContextProvider>
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

                  <Box round height="100%" >
                    <MenuComponent />
                  </Box>
                </Main>
              </GameContextProvider>
            </BoardContextProvider>
          </UserContextProvider>
        </Box>
        </ThemeProvider>
    </div>
  );
}

export default App;
