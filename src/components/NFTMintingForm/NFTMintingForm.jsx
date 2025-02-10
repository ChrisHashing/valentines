import React, { useState } from "react";
import styles from "./NFTMintingForm.module.css";
import heroImg from '../../assets/Group 138.svg'
import { useWallet } from '../../context/WalletContext';
import { sendValentine } from '../../utils/contractUtil';

function NFTMintingForm() {
  const [isCustomMessage, setIsCustomMessage] = useState(false);
  const [tokenAmount, setTokenAmount] = useState(1);
  const { walletConnected, connectWallet } = useWallet();
  const [recipients, setRecipients] = useState([]);
  const [recipientAddress, setRecipientAddress] = useState('');

  const increment = () => {
    setTokenAmount(prev => Math.min(prev + 1, 100)); // Limit max value if needed
};

const decrement = () => {
    setTokenAmount(prev => Math.max(prev - 1, 1)); // Limit min value to 1
};

const handleAddRecipient = () => {
  if (recipientAddress) {
      setRecipients([...recipients, {
          address: recipientAddress,
          quantity: quantity,
          messages: message ? [message] : []
      }]);
      setRecipientAddress('');
      setMessage('');
      setQuantity(1);
  }
};

const handleSendValentine = async () => {
      if (!recipients.length) {
            alert('Please add at least one recipient!');
            return;
        }

        setTransactionStatus({
          type: 'sending',
          message: '💌 Sending your valentine(s)...'
      });
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
      <form className={styles.form}>
        <div className={styles.inputRow}>
          <input
            type="text"
            className={styles.textInput}
            placeholder="Recipient's Polygon Address"
          />
         <button type="button" className={styles.tokenamt} onClick={decrement}>-</button>
                    <input
                        type="number"
                        className={styles.tokenAmount}
                        value={tokenAmount}
                        onChange={(e) => setTokenAmount(e.target.value)}
                    />
                    <button className={styles.tokenamt} type="button" onClick={increment}>+</button>
        </div>
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
        {isCustomMessage && (
          <textarea
            className={styles.textArea}
            placeholder="Write your message here..."
          />
        )}
        {walletConnected ? (
          <button type="submit" className={styles.submitButton} onClick={handleSendValentine}>
            Send Valentine
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
