import React, { ReactElement } from 'react'
import styles from "../styling/MenuComponent.module.scss"
interface Props {
    
}

function MenuComponent({}: Props): ReactElement {
    return (
        <div className={styles["menu"]}>
            <div className={styles["button-row"]}>
              <button className={styles["btn"]}>New game</button>
              <button className={styles["btn"]}>Games</button>
              <button className={styles["btn"]}>Players</button>
            </div>

            <div className={styles["menu-content"]}>
              Each button will have different content here. The white button is
              the active menu. <br /> When the game is active this might show
              your program register and cards
            </div>
          </div>
     
    )
}

export default MenuComponent
