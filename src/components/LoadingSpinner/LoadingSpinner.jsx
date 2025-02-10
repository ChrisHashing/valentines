import React from "react";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Valentine 💖 Loading...</p>
        </div>
    );
};

export default LoadingSpinner;
