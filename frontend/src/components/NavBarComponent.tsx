import React, { ReactElement } from 'react'
import styles from "../styling/NavBarComponent.module.scss" //Import css module



interface Props {
    
}

export default function NavBarComponent({}: Props): ReactElement {
    return (
        <div className={styles.navbar}>
        <div className={styles["nav-title"]}>Roborally</div>
        <a href="#" className={styles["nav-link-row"]}>
          <div className={styles["nav-icon"]}>▶️</div>
          <div className={styles["nav-link-text"]}>Play</div>
        </a>
        <a href="#" className={styles["nav-link-row"]}>
          <div className={styles["nav-icon"]}>❔</div>
          <div className={styles["nav-link-text"]}>Help</div>
        </a>
      </div>

    )
}
