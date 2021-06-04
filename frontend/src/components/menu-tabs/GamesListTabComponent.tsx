import * as React from 'react';
import { useEffect, useState } from 'react';
import GameApi from '../../api/GameApi';
import { Board } from '../../types/Board';

export interface IGamesListProps {
}

export function GamesListTab (props: IGamesListProps) {
  
  const [boards, setBoards] = useState<Board[]>()
  

  useEffect(() => {
    async function fetchBoard() {
    let fetchedBoards = await GameApi.getBoards();
      setBoards(fetchedBoards.data);
    }

    fetchBoard()
  }, [])

  return (
    <div>
    {
      boards != null ?  boards?.map
      (
        (board, index) => 
        (
          <h1 key={index}> { board.boardName } </h1>
        )
      ) : (<p> No games found!</p>)
    }
    </div>
  );
}
