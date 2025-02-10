import React from "react";
import styles from "./HeroSection.module.css";
import heroImg from '../../assets/Group 137.svg'
import { Fade } from "react-awesome-reveal";

const HeroSection = () => {
    return (
       
            <div className={styles.heroSection}>
                <div className={styles.content}>
                    <img
                        src={heroImg}
                        alt="Cupid Illustration"
                        className={styles.image}
                    />
                    <div className={styles.text}>
                        <h1>Crypto Valentines - Send Love on the Blockchain! 💌</h1>
                        <p>
                            Mint a Special Valentine’s NFT – Only on February 14! Each NFT is
                            unique and available for one day only.
                        </p>
                    </div>
                </div>
            </div>
    );
};

export default HeroSection;
