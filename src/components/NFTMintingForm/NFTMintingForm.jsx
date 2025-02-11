import React, { useState, useEffect } from "react";
import styles from "./NFTMintingForm.module.css";
import heroImg from '../../assets/Group 138.svg'
import { useWallet } from '../../context/WalletContext';
import { useRecipient } from '../../context/RecipientContext';
import { sendValentine } from '../../utils/contractUtil';
import { getMintPrices } from '../../utils/contractConfig';

function NFTMintingForm() {
  const [isCustomMessage, setIsCustomMessage] = useState(false);
  const [tokenAmount, setTokenAmount] = useState(1);
  const [message, setMessage] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [transactionStatus, setTransactionStatus] = useState(null);
  const { walletConnected, connectWallet } = useWallet();
  const { selectedRecipient } = useRecipient();
  const [prices, setPrices] = useState({ card: "0.001", message: "0.005" });

  useEffect(() => {
    const fetchPrices = async () => {
      const fetchedPrices = await getMintPrices();
      setPrices(fetchedPrices);
    };
    fetchPrices();
  }, []);

  // Listen for selected recipient changes
  useEffect(() => {
    console.log('NFTMintingForm: selectedRecipient changed:', selectedRecipient);
    if (selectedRecipient) {
      console.log('NFTMintingForm: Setting recipient address');
      setRecipientAddress(selectedRecipient);
    }
  }, [selectedRecipient]);

  const increment = () => {
    setTokenAmount(prev => Math.min(prev + 1, 100));
  };

  const decrement = () => {
    setTokenAmount(prev => Math.max(prev - 1, 1));
  };

  const calculateTotalPrice = () => {
    const basePrice = Number(prices.card) * tokenAmount;
    const messagePrice = isCustomMessage ? Number(prices.message) : 0;
    return (basePrice + messagePrice).toFixed(3);
  };

  const handleSendValentine = async (e) => {
    e.preventDefault();
    
    if (!walletConnected) {
      alert('Please connect your wallet first!');
      return;
    }

    if (!recipientAddress) {
      alert('Please enter a recipient address!');
      return;
    }

    if (isCustomMessage && !message.trim()) {
      alert('Please enter your message!');
      return;
    }

    setTransactionStatus({
      type: 'sending',
      message: '💌 Sending your valentine(s)...'
    });

    try {
      const result = await sendValentine(
        recipientAddress,
        tokenAmount,
        isCustomMessage,
        message
      );

      const txHash = result.result.transaction;
      
      setTransactionStatus({
        type: 'success',
        message: '💝 Valentine sent successfully!'
      });

      // Reset form
      setRecipientAddress('');
      setMessage('');
      setTokenAmount(1);
      setIsCustomMessage(false);
    } catch (error) {
      let errorMessage = '❌ Transaction failed';
      
      if (error.code === 'ACTION_REJECTED' || error.message.includes('user rejected')) {
        errorMessage = '❌ Transaction cancelled';
      } else if (error.message.includes('insufficient funds')) {
        errorMessage = '❌ Insufficient funds';
      }

      setTransactionStatus({
        type: 'error',
        message: errorMessage
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.imageContainer}>
        <img
          src={heroImg}
          alt="Cute Rhino with a flower"
          className={styles.nftImage}
        />
      </div>
      <form className={styles.form} onSubmit={handleSendValentine}>
        <div className={styles.inputRow}>
          <input
            type="text"
            className={styles.textInput}
            placeholder="Recipient's Polygon Address"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
          <div className={styles.quantityControls}>
            <button type="button" className={styles.tokenamt} onClick={decrement}>-</button>
            <input
              type="number"
              className={styles.tokenAmount}
              value={tokenAmount}
              onChange={(e) => setTokenAmount(Number(e.target.value))}
              min="1"
              max="100"
            />
            <button type="button" className={styles.tokenamt} onClick={increment}>+</button>
          </div>
        </div>

        {tokenAmount === 1 && (
          <div className={styles.checkboxRow}>
            <input
              type="checkbox"
              id="customMessage"
              className={styles.checkbox}
              checked={isCustomMessage}
              onChange={(e) => setIsCustomMessage(e.target.checked)}
            />
            <label htmlFor="customMessage" className={styles.label}>
              Add Custom Message
            </label>
          </div>
        )}

        {isCustomMessage && tokenAmount === 1 && (
          <textarea
            className={styles.textArea}
            placeholder="Write your message here... (max 280 characters)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={280}
          />
        )}

        {transactionStatus && (
          <div className={`${styles.status} ${styles[transactionStatus.type]}`}>
            {transactionStatus.message}
          </div>
        )}

        {walletConnected ? (
          <button type="submit" className={styles.submitButton}>
            Send Valentine{tokenAmount > 1 ? 's' : ''} ({calculateTotalPrice()} POL)
          </button>
        ) : (
          <button 
            type="button"
            onClick={connectWallet} 
            className={`${styles.button} ${styles.connectButton}`}
          >
            Connect Wallet
          </button>
        )}
      </form>
    </div>
  );
}

export default NFTMintingForm;
