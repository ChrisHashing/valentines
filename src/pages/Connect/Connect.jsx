import React from 'react'
import style from './Connect.module.css'
import { Fade } from 'react-awesome-reveal';
import { useWallet } from '../../context/WalletContext';

function Connect() {
  const { connectWallet, walletAddress } = useWallet();

  return (
      <Fade
          delay={50}
          duration={800}
          fraction={0.5}
      >
      <div className={style.wrappper}>
          <h1>Connect</h1>
          {walletAddress ? (
              <p>Connected: {walletAddress}</p>
          ) : (
              <button onClick={connectWallet}>Connect Wallet</button>
          )}
      </div>
      </Fade>
  )
}

export default Connect