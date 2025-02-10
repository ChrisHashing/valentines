import React, { useEffect, useState } from 'react';
import { initializeContractDate, updateCountdown } from '../../utils/contractUtil'; // Import the functions
import styles from './MintEndTimer.module.css'; // Import styles from MintEndTimer

const MintStartTimer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    useEffect(() => {
        const fetchContractDate = async () => {
            await initializeContractDate();
            updateCountdown(setTimeLeft); // Pass setTimeLeft to updateCountdown
        };

        fetchContractDate();

        const interval = setInterval(() => {
            updateCountdown(setTimeLeft); // Update countdown every second
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return (
        <div className={styles.timerContainer_wrapper}>
            <div className={styles.timerContainer}>MINT STARTS IN:</div>
            <div className={styles.count_town_wrapper}>
                <div className={styles.countdown}>
                    <div className={styles.timeBox}>
                        <span className={styles.timeValue} id="days">{timeLeft.days}</span>
                        <span className={styles.timeUnit}>DAYS</span>
                    </div>
                    <span className={styles.separator}>:</span>
                    <div className={styles.timeBox}>
                        <span className={styles.timeValue} id="hours">{timeLeft.hours}</span>
                        <span className={styles.timeUnit}>HRS</span>
                    </div>
                    <span className={styles.separator}>:</span>
                    <div className={styles.timeBox}>
                        <span className={styles.timeValue} id="minutes">{timeLeft.minutes}</span>
                        <span className={styles.timeUnit}>MIN</span>
                    </div>
                    <span className={styles.separator}>:</span>
                    <div className={styles.timeBox}>
                        <span className={styles.timeValue} id="seconds">{timeLeft.seconds}</span>
                        <span className={styles.timeUnit}>SEC</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MintStartTimer;
