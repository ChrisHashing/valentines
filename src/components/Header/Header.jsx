import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiMessageSquare } from "react-icons/fi";
import styles from "./Header.module.css";
import message_icon from "../../assets/message_icon.svg";
import { useWallet } from "../../context/WalletContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { connectWallet, walletAddress } = useWallet();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMessageIconClick = () => {
    navigate("/eternal-cards");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to="/" className={`${styles.button} ${styles.eternalButton}`}>
          Eternal Cards
        </Link>
      </div>
      <div className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ""}`}>
        <button 
          onClick={connectWallet} 
          className={`${styles.button} ${styles.connectButton}`}
        >
          {walletAddress ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
        </button>
      </div>
      {walletAddress && (
        <div className={styles.messageIcon} onClick={handleMessageIconClick} style={{ marginLeft: '16px' }}>
          <img src={message_icon} alt="Messages" className={styles.message_icon} />
        </div>
      )}
      <div className={styles.menuIcon} onClick={toggleMenu}>
        {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </div>
    </header>
  );
};

export default Header;