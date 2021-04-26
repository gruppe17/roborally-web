package com.example.demo.dal.interfaces;

import com.example.demo.exceptions.DaoException;
import com.example.demo.model.Space;


public interface ISpaceDao {
    void createSpaces(int boardId, Space[][] spaces) throws DaoException;

    void updateSpaces(int boardId, Space[][] spaces) throws DaoException;

    Space[][] getSpaces(int boardId) throws DaoException;
}
