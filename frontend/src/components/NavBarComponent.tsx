import React, { ReactElement } from 'react'
import styles from "../styling/NavBarComponent.module.scss" //Import css module
import { Box, Button } from "grommet";


interface Props {
    
}

export default function NavBarComponent({}: Props): ReactElement {
    return (
        <Box className={styles.navbar}>
        <Box className={styles["nav-title"]}>Roborally</Box>
        <a href="#" className={styles["nav-link-row"]}>
          <Box className={styles["nav-icon"]}>▶️</Box>
          <Box className={styles["nav-link-text"]}>Play</Box>
        </a>
        <a href="#" className={styles["nav-link-row"]}>
          <Box className={styles["nav-icon"]}>❔</Box>
          <Box className={styles["nav-link-text"]}>Help</Box>
        </a>
      </Box>

    )
}
