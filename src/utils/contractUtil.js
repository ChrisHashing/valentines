import { getValentineDate, fetchValentines, getMintPrices, mintValentine, batchMintValentines, initializeContract } from './contractConfig.js';

let walletConnected = false;
let valentineDate = { month: 2, day: 14 }; // Default until loaded
let isLoading = false;
let currentIndex = 0;
const BATCH_SIZE = 12;

const DEV_MODE = false; 

export const loadValentines = async (walletAddress, offset, limit) => {
    if (!walletAddress || !window.ethereum) {
        return []; // Return an empty array if not connected
    }

    try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const address = accounts[0];

        const valentines = await fetchValentines(address, offset, offset + limit);
        currentIndex += valentines.length; // Update currentIndex for pagination

        return valentines; // Return the fetched valentines
    } catch (error) {
        console.error('Error loading valentines:', error);
        return []; // Return an empty array on error
    }
}

async function initializeContractDate() {
    try {
        const contractDate = await getValentineDate();
        // console.log('Contract date loaded:', contractDate);
        if (!contractDate || !contractDate.month || !contractDate.day) {
            console.warn('Invalid contract date, using default');
            valentineDate = { month: 2, day: 14 }; // Default fallback
        } else {
            valentineDate = contractDate;
        }
    } catch (error) {
        console.error('Error initializing contract date:', error);
    }
}

async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            walletConnected = true;
            // Return the connected account
            return accounts[0];
        } catch (error) {
            console.error('Error connecting wallet:', error);
            throw new Error('Error connecting wallet. Please try again.');
        }
    } else {
        throw new Error('Please install MetaMask or another Web3 wallet to connect!');
    }
}

async function updateSendButton() {
    const sendButton = document.querySelector('.valentine-card button');
    if (!walletConnected) {
        sendButton.textContent = `Connect Wallet to Send`;
        sendButton.onclick = connectWallet;
    } else {
        sendButton.textContent = 'Send Love ❤️';
        sendButton.onclick = sendValentine;
    }
}

export const sendValentine = async (recipient, quantity, customMessageEnabled, message) => {
    // Input validation
    if (recipient.trim() === '') {
        throw new Error('Please enter recipient Polygon address!');
    }

    if (customMessageEnabled && message.trim() === '') {
        throw new Error('Please enter your message!');
    }

    if (quantity < 1 || quantity > 100) {
        throw new Error('Please enter a quantity between 1 and 100!');
    }

    try {
        if (quantity === 1) {
            // Single mint
            const result = await mintValentine(recipient, message);
            return {
                type: 'single',
                result: result
            };
        } else {
            // Batch mint
            const valentines = Array(quantity).fill().map(() => ({
                to: recipient,
                message: message
            }));

            const result = await batchMintValentines(valentines);
            return {
                type: 'batch',
                result: result
            };
        }
    } catch (error) {
        console.error('Error sending valentine:', error);
        throw error;
    }
};

function isValentinesDay(date) {
    return date.getUTCMonth() === (valentineDate.month - 1) && 
           date.getUTCDate() === valentineDate.day;
}

function updateCountdown(setTimeLeft) {
    const now = new Date();
    const currentYear = now.getUTCFullYear();
    const targetDate = new Date(Date.UTC(currentYear, valentineDate.month - 1, valentineDate.day));

    if (isValentinesDay(now)) {
        targetDate.setUTCDate(targetDate.getUTCDate() + 1);
    } else if (now > targetDate) {
        targetDate.setUTCFullYear(currentYear + 1);
    }

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
}

function getCurrentUTCDate() {
    if (DEV_MODE) {
        // In dev mode, simulate Valentine's Day
        const now = new Date();
        return new Date(Date.UTC(
            now.getUTCFullYear(),
            valentineDate.month - 1,  // Convert to 0-based month
            valentineDate.day,
            now.getUTCHours(),
            now.getUTCMinutes(),
            now.getUTCSeconds()
        ));
    }
    return new Date();
}

export {updateCountdown,isValentinesDay,getCurrentUTCDate, connectWallet, updateSendButton, initializeContractDate, valentineDate };