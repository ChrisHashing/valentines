import React, { useState, useEffect } from "react";
import styles from "./MintEndTimer.module.css";
import { getCurrentUTCDate,valentineDate } from '../../utils/contractUtil';

function CountdownTimer({ endDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = getCurrentUTCDate();
    const currentYear = now.getUTCFullYear();
    let targetDate;
    targetDate = new Date(Date.UTC(currentYear, valentineDate.month - 1, valentineDate.day + 1)); // Next day at midnight
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (!timeLeft) {
    return <div className={styles.expired}>Mint has ended!</div>;
  }

  return (
    <div className={styles.timerContainer_wrapper}>
      <div className={styles.timerContainer}>MINT ENDS IN:</div>
      <div className={styles.count_town_wrapper}>
        <div className={styles.countdown}>
          <div className={styles.timeBox}>
            <span className={styles.timeValue}>{timeLeft.days}</span>
            <span className={styles.timeUnit}>DAYS</span>
          </div>
          <span className={styles.separator}>:</span>
          <div className={styles.timeBox}>
            <span className={styles.timeValue}>{timeLeft.hours}</span>
            <span className={styles.timeUnit}>HRS</span>
          </div>
          <span className={styles.separator}>:</span>
          <div className={styles.timeBox}>
            <span className={styles.timeValue}>{timeLeft.minutes}</span>
            <span className={styles.timeUnit}>MIN</span>
          </div>
          <span className={styles.separator}>:</span>
          <div className={styles.timeBox}>
            <span className={styles.timeValue}>{timeLeft.seconds}</span>
            <span className={styles.timeUnit}>SEC</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountdownTimer;
