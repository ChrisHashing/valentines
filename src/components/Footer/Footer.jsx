import React from "react";
import CountdownTimer from "../CountdownTimer/MintStartTimer";
import styles from "./Footer.module.css";
import InfiniteScrollCards from "../InfiniteScrollCards/InfiniteScrollCards";
import MintTimerContainer from "../CountdownTimer/MintTimerContainer";

function Footer() {
  return (
    <footer className={styles.footer}>
        <MintTimerContainer />
    </footer>
  );
}

export default Footer;