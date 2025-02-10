import React from "react";
import styles from "./Message.module.css";
import { Fade } from 'react-awesome-reveal';

const Message = () => {
    return (
        <Fade
            delay={50} // Wait before starting
            duration={800} // Animation duration
            fraction={0.5} // Trigger when 50% visible
        >
            <div className={styles.wrappper}>

                <div className={styles.container}>
                    <h1 className={styles.title}>
                        No Valentines Yet?! Oh No! <span className={styles.emoji}>💔</span>
                    </h1>
                    <p className={styles.message}>
                        Your mailbox is emptier than my love life... <span className={styles.emoji}>😭</span>
                        <br />
                        But don’t worry, love is a two-way street! <span className={styles.emoji}>💌</span>
                        <br />
                        Send a Valentine first, and you might just get one back!
                    </p>
                    <button className={styles.button}>SEND</button>
                </div>
            </div>
        </Fade>

    );
};

export default Message;
