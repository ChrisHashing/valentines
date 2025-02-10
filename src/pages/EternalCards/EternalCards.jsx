import React, { useEffect, useState } from 'react';
import styles from './EternalCards.module.css';
import { Fade } from 'react-awesome-reveal';
import { useWallet } from '../../context/WalletContext';
import { loadValentines } from '../../utils/contractUtil';

const BATCH_SIZE = 10;

function EternalCards() {
    const [valentines, setValentines] = useState([]);
    const [loading, setLoading] = useState(true);
    const { walletAddress } = useWallet();

    const formatAddress = (address) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    useEffect(() => {
        const fetchValentines = async () => {
            console.log('Fetching valentines for wallet:', walletAddress);
            if (walletAddress) {
                try {
                    const fetchedValentines = await loadValentines(walletAddress, 0, BATCH_SIZE);
                    console.log('Fetched valentines:', fetchedValentines);
                    // Double the valentines array for testing
                    setValentines([...fetchedValentines, ...fetchedValentines]);
                } catch (error) {
                    console.error('Error loading valentines:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchValentines();
    }, [walletAddress]);

    // Debug logs for render cycle
    console.log('Current state - Loading:', loading);
    console.log('Current state - Valentines:', valentines);
    console.log('Current state - Wallet Address:', walletAddress);

    return (
        <div className={styles.wrapper}>
            <div className={styles.card_container}>
                <h1 className={styles.title}>Received Cards</h1>
                
                <div className={styles.cardGrid}>
                    {loading ? (
                        <div className={styles.loading}>
                            {console.log('Rendering loading state')}
                            Loading your valentines... 💝
                        </div>
                    ) : valentines.length === 0 ? (
                        <div className={styles.noValentines}>
                            {console.log('Rendering empty state')}
                            <p className={styles.heartbeat}>💝 Don't worry, we love you! 💝</p>
                            <p className={styles.subText}>
                                <a href="/" className={styles.loveLink}>
                                    Spread the love - send a valentine to someone special!
                                </a>
                            </p>
                        </div>
                    ) : (
                        <Fade
                            delay={50}
                            duration={100}
                            fraction={0.5}
                            triggerOnce
                        >
                            {console.log('Rendering valentine cards:', valentines.length)}
                            {valentines.map((valentine, index) => {
                                console.log('Rendering valentine:', valentine);
                                return (
                                    <div key={index} className={styles.card}>
                                        <div className={styles.cardContent}>
                                            <div className={styles.cardImage}>
                                                <img 
                                                    src={valentine.image} 
                                                    alt="Valentine NFT" 
                                                    className={styles.nftImage}
                                                    onError={(e) => {
                                                        console.log('Image failed to load:', valentine.image);
                                                        e.target.src = '/fallback-image.png'; // Add a fallback image
                                                    }}
                                                />
                                            </div>
                                            <div className={styles.cardInfo}>
                                                <p className={styles.sender}>
                                                    From: <a 
                                                        href={`https://polygonscan.com/address/${valentine.sender}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={styles.addressLink}
                                                    >
                                                        {formatAddress(valentine.sender)}
                                                    </a>
                                                </p>
                                                <p className={styles.year}>{valentine.year}</p>
                                                {valentine.message && (
                                                    <p className={styles.message}>"{valentine.message}"</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Fade>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EternalCards;
