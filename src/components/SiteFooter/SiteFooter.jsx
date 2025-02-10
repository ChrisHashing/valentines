import React from "react";
import styles from "./SiteFooter.module.css";
import { FaArrowUp } from "react-icons/fa";

const SiteFooter = () => {
    return (
        <footer className={styles.siteFooter}>
            <div className={styles.container}>
                <p className={styles.copyright}>
                    © 2025  Eternal Cards. All rights reserved.
                </p>
                <div className={styles.links}>
                    <a href="/" className={styles.link}>
                        Terms & Conditions
                    </a>
                </div>
            </div>
            <button className={styles.scrollUp} onClick={() => window.scrollTo(0, 0)}>
                <FaArrowUp />
            </button>
        </footer>
    );
};

export default SiteFooter;
