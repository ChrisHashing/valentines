import React, { useEffect, useState } from 'react';
import styles from './EternalCards.module.css';
import { Fade } from 'react-awesome-reveal';
import { useWallet } from '../../context/WalletContext';
import { loadValentines } from '../../utils/contractUtil'; // Import the loadValentines function

function EternalCards() {
    const [valentines, setValentines] = useState([]);
    const { walletAddress } = useWallet();

    useEffect(() => {
        const fetchValentines = async () => {
            if (walletAddress) {
                const fetchedValentines = await loadValentines(); // Call the function to fetch valentines
                setValentines(fetchedValentines);
            }
        };

        fetchValentines();
    }, [walletAddress]);

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Received Cards</h1>
            <div className={styles.cardGrid}>
                <Fade delay={50} duration={100} fraction={0.5} triggerOnce>
                    {valentines.map((valentine, index) => (
                        <div key={index} className={styles.card}>
                            <img src={valentine.image} alt="Valentine NFT" className={styles.nftImage} />
                            <p>From: {valentine.sender}</p>
                            <p>Message: {valentine.message}</p>
                        </div>
                    ))}
                </Fade>
            </div>
        </div>
    );
}

export default EternalCards;
