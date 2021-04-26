package com.example.demo.dal.implementations;

import com.example.demo.dal.interfaces.IPlayerDao;
import com.example.demo.model.Player;
import org.springframework.stereotype.Repository;

import java.util.HashMap;

/**
 * Primitive implementation of a player dao, using a HashMap.
 */
@Repository
public class PlayerDao implements IPlayerDao {
    //PlayerId, Player
    static final HashMap<Integer, Player> players = new HashMap<>();
    static private int playerIdCounter = 0;

    @Override
    public int addPlayer(int boardId, Player player) {
        playerIdCounter++;
        player.setPlayerId(playerIdCounter);
        players.put(player.getPlayerId(), player);
        return player.getPlayerId();
    }

    @Override
    public Player getPlayer(int playerId) {
        return players.get(playerId);
    }
}
