import React, { createContext, useContext, useState } from 'react';

const WalletContext = createContext();

export const useWallet = () => {
    return useContext(WalletContext);
};

export const WalletProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [walletConnected, setWalletConnected] = useState(false);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletAddress(accounts[0]);
                setWalletConnected(true);
            } catch (error) {
                console.error("Error connecting to wallet:", error);
            }
        } else {
            alert("Please install MetaMask!");
        }
    };

    return (
        <WalletContext.Provider value={{ walletAddress, walletConnected, connectWallet }}>
            {children}
        </WalletContext.Provider>
    );
};