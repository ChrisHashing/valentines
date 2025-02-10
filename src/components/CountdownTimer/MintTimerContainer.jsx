import React, { useEffect, useState } from 'react';
import MintStartTimer from './MintStartTimer';
import MintEndTimer from './MintEndTimer';
import { getCurrentUTCDate, isValentinesDay, valentineDate } from '../../utils/contractUtil'; // Import necessary functions

const MintTimerContainer = () => {
    const [mintStarted, setMintStarted] = useState(false);
    const [mintStartTime, setMintStartTime] = useState(null);
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    useEffect(() => {
        const now = getCurrentUTCDate();
        const currentYear = now.getUTCFullYear();
        // Set start time to Valentine's Day at midnight
        const startTime = new Date(Date.UTC(currentYear, valentineDate.month - 1, valentineDate.day));

        setMintStartTime(startTime.getTime() / 1000); // Convert to seconds
        if (now >= startTime) {
            setMintStarted(true);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = getCurrentUTCDate();
            const currentYear = now.getUTCFullYear();
            const targetDate = new Date(Date.UTC(currentYear, valentineDate.month - 1, valentineDate.day + 1)); // End of Valentine's Day

            const difference = targetDate - now;

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({
                days: days.toString().padStart(2, '0'),
                hours: hours.toString().padStart(2, '0'),
                minutes: minutes.toString().padStart(2, '0'),
                seconds: seconds.toString().padStart(2, '0'),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {mintStarted ? (
                <MintEndTimer endDate={mintStartTime} />
            ) : (
                <MintStartTimer />
            )}
        </div>
    );
};

export default MintTimerContainer;
