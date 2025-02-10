import React from "react";
import CountdownTimer from "../CountdownTimer/MintStartTimer";
import styles from "./Footer.module.css";
import InfiniteScrollCards from "../InfiniteScrollCards/InfiniteScrollCards";

function Footer() {
  return (
    <footer className={styles.footer}>
      <CountdownTimer endDate="2025-02-20T00:00:00" />
    </footer>
  );
}

export default Footer;