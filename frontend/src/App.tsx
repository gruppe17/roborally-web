import React from 'react';
import BoardComponent from "./components/BoardComponent";
import GameContextProvider from "./context/GameContextProvider";

function App() {

    return (
        <div className="App">
            <header className="App-header">
            </header>
            {/*Context provider component below makes sure the context is accessible in any children components*/}
            <GameContextProvider>
                <BoardComponent/>
            </GameContextProvider>
        </div>
    );
}

export default App;
