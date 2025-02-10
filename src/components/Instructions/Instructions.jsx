import React from "react";
import styles from "./Instructions.module.css";

function Instructions() {
  return (
    <div className={styles.instructionsContainer}>
      <h2 className={styles.title}>VALENTINE'S NFT INSTRUCTIONS</h2>
      <ul className={styles.instructionsList}>
        <li>Minting is OPEN! Valentine's NFTs are available until the end of the countdown!</li>
        <li>Connect your wallet using the button in the top right.</li>
        <li>Enter your valentine's Polygon wallet address.</li>
        <li>Choose between a random Valentine's NFT or add your custom message.</li>
        <li>Mint your unique Valentine's NFT directly to their wallet.</li>
        <li>Each NFT is unique and will be randomly selected from our collection.</li>
      </ul>
      <div className={styles.pricingSection}>
        <p>
          <strong>BASIC VALENTINE NFT:</strong> <span>1 POL</span>
        </p>
        <p>
          <strong>CUSTOM MESSAGE ADD-ON:</strong> <span>10 POL</span>
        </p>
      </div>
    </div>
  );
}

export default Instructions;
