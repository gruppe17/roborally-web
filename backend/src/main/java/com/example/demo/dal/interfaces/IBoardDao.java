package com.example.demo.dal.interfaces;

import com.example.demo.exceptions.DaoException;
import com.example.demo.model.Board;


public interface IBoardDao {
    Board getBoard(int boardId) throws DaoException;

    int createBoard(Board board) throws DaoException;

    void updateBoard(Board board, int boardId) throws DaoException;

    void deleteBoard(int boardId) throws DaoException;
}
