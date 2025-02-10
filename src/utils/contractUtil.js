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

async function sendValentine(recipients) {
    // if (!recipients.length) {
    //     alert('Please add at least one recipient!');
    //     return;
    // }


    try {
        const allValentines = recipients.flatMap(recipient => 
            Array(recipient.quantity).fill().map((_, i) => ({
                to: recipient.address,
                message: recipient.messages?.[i] || ''
            }))
        );

        const result = await batchMintValentines(allValentines);
        
        console.log(result)
        // Update the success message display
        // let valentinesHtml = '';
        // result.mintedTokens.forEach((token, i) => {
        //     const valentine = allValentines[i];
        //     valentinesHtml += `
        //         <div class="valentine-sent">
        //             <h3>💌 Valentine Sent!</h3>
        //             <p>To: ${valentine.to}</p>
        //             ${valentine.message ? `<p>Message: ${valentine.message}</p>` : ''}
        //             <p>Token ID: ${token.tokenId}</p>
        //             ${result.isMock ? '<p class="mock-notice">(Test Mode)</p>' : ''}
        //             <p>With love ❤️</p>
        //         </div>
        //     `;
        // });

        // sentMessage.innerHTML = `
        //     <div class="batch-transaction">
        //         <p>Transaction: <a href="https://polygonscan.com/tx/${result.transaction}" 
        //             target="_blank">${result.transaction.slice(0, 6)}...${result.transaction.slice(-4)}</a></p>
        //     </div>
        //     ${valentinesHtml}
        // `;

        // Clear the form
        recipients = [];
        // Call a function to re-render recipients if needed
        renderRecipients();

    } catch (error) {
        console.error('Error sending valentine:', error);
        sentMessage.innerHTML = `
            <div class="valentine-error">
                <h3>❌ Error Sending Valentine</h3>
                <p>${error.message || 'Transaction failed. Please try again.'}</p>
            </div>
        `;
    }
}

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

export {updateCountdown,isValentinesDay,getCurrentUTCDate, connectWallet, updateSendButton, sendValentine, initializeContractDate, valentineDate };