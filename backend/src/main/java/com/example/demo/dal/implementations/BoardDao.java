package com.example.demo.dal.implementations;

import com.example.demo.dal.interfaces.IBoardDao;
import com.example.demo.model.Board;
import org.springframework.stereotype.Repository;

import java.util.HashMap;

/**
 * Primitive implementation of a board dao, using a HashMap.
 */
@Repository
public class BoardDao implements IBoardDao {
    //BoardId, Board
    static final HashMap<Integer, Board> boards = new HashMap<>();
    static private int boardIdCounter = 0;

    @Override
    public Board getBoard(int boardId) {
        return boards.get(boardId);
    }

    @Override
    public int createBoard(Board board) {
        boardIdCounter++;
        board.setGameId(boardIdCounter);
        boards.put(board.getGameId(), board);
        return boardIdCounter;
    }

    @Override
    public void updateBoard(Board board, int boardId) {
        boards.replace(boardId, board);
    }

    @Override
    public void deleteBoard(int boardId) {
        boards.remove(boardId);
    }
}
