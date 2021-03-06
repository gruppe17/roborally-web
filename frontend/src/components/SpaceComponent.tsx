import {FunctionComponent, useContext, useMemo} from "react";
import {Space} from "../types/Space";
import styles from "../styling/SpaceComponent.module.scss"
import BoardContext from '../context/BoardContext';
import UserContext from '../context/UserContext';
import GameContext from '../context/GameContext';

export type SpaceComponentProps = {
    space: Space
}
/*
 Note that we are explicitly specifying that SpaceComponent is of the type FunctionComponent,
 and that the props are of type SpaceComponentProps, also note that we use object destructuring to "unpack" the props.
 */

export const SpaceComponent: FunctionComponent<SpaceComponentProps> = ({space}) => {
    const {board, setCurrentPlayerOnSpace, switchCurrentPlayer, canMove} = useContext(BoardContext)
    const {currentUser} = useContext(UserContext)
    const {forceViewUpdate} = useContext(GameContext)

    //Below we essentially define a new variable using the useMemo hook, which can only take the value "white" or "black"
    //Additionally the code inside the hook (the calculation of whether it is black or white) is only executed
    // when the space prop updates (this is known as the dependencies of the hook)
    const color = useMemo<"white" | "black">(() => {
        if ((space.x + space.y) % 2 === 0) {
            return "white"
        } else {
            return "black"
        }
    }, [space])

    const onClickField = async () => {
        if (!space.playerId && canMove && board.currentPlayerDto?.playerId === currentUser.userId) { // A shorthand, check equivalents at https://bit.ly/2MnA4Rk
            forceViewUpdate();
            await setCurrentPlayerOnSpace(space)
            await switchCurrentPlayer()
        }
    }
    const playerColor = useMemo(() => {
        const res = board.playerDtos.find(value => value.playerId === space.playerId)
        if (res) return res.playerColor
    }, [board.playerDtos, space.playerId])
    return (
        //The classname is set dynamically and can either take the value styles.whiteSpace or styles.blackSpace
        //We also define that the callback should be called when the div is clicked
        <div className={styles[color + "Space"]} onClick={onClickField}>
            {/*if space.player is set render the div*/}
            {(space.playerId && playerColor) && <div className={styles[playerColor + "Player"]}/>}
        </div>
    )


}


