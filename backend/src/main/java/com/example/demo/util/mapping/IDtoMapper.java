package com.example.demo.util.mapping;

import com.example.demo.controller.GameController.BoardDto;
import com.example.demo.controller.GameController.PlayerDto;
import com.example.demo.controller.GameController.SpaceDto;
import com.example.demo.exceptions.MappingException;
import com.example.demo.model.Board;
import com.example.demo.model.Player;
import com.example.demo.model.Space;

public interface IDtoMapper {
    PlayerDto convertToDto(Player player) throws MappingException;

    BoardDto convertToDto(Board board) throws MappingException;

    SpaceDto convertToDto(Space space) throws MappingException;

    Board convertToEntity(BoardDto boardDto);

    Space convertToEntity(SpaceDto spaceDto, Board board);

    Player convertToEntity(PlayerDto playerDto, Board board) throws MappingException;
}
