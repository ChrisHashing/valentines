import React from "react";
import styles from "./HeroSection.module.css";
import heroImg from '../../assets/Group 137.svg'
import { Fade } from "react-awesome-reveal";

const HeroSection = () => {
    const scrollToMintForm = () => {
        const mintFormSection = document.querySelector('#mint-form-section');
        if (mintFormSection) {
            mintFormSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                        Mint a Special Valentine's NFT – Only on February 14! Each NFT is
                        unique and available for one day only.
                    </p>
                    <button onClick={scrollToMintForm} className={styles.mintButton}>
                        MINT NOW 💝
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
