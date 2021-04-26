package com.example.demo.dal.implementations;

import com.example.demo.dal.interfaces.ISpaceDao;
import com.example.demo.model.Space;
import org.springframework.stereotype.Repository;

import java.util.HashMap;

/**
 * Primitive implementation of a space dao, using a HashMap.
 */
@Repository
public class SpaceDao implements ISpaceDao {
    //BoardId, Space[][]
    static final HashMap<Integer, Space[][]> spaces = new HashMap<>();

    @Override
    public void createSpaces(int boardId, Space[][] spacesToAdd) {
        spaces.put(boardId, spacesToAdd);
    }

    @Override
    public void updateSpaces(int boardId, Space[][] spacesToUpdate) {
        spaces.replace(boardId, spacesToUpdate);
    }

    @Override
    public Space[][] getSpaces(int boardId) {
        return spaces.get(boardId);
    }

}
