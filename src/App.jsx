import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import CountdownTimer from "./components/CountdownTimer/MintStartTimer";
import Gallery from "./components/Gallery/Gallery";
import Instructions from "./components/Instructions/Instructions";
import NFTMintingForm from "./components/NFTMintingForm/NFTMintingForm";
import Footer from "./components/Footer/Footer";
import HeroSection from "./components/HeroSection/HeroSection";
import InfiniteScrollCards from "./components/InfiniteScrollCards/InfiniteScrollCards";
import { WalletProvider } from './context/WalletContext'; // Import the WalletProvider
import styles from "./App.module.css";
import EternalCards from "./pages/EternalCards/EternalCards";
import Connect from "./pages/Connect/Connect";
import Message from "./pages/Message/Message";
import SiteFooter from "./components/SiteFooter/SiteFooter";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., for fetching resources or rendering components)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust the delay as needed (2 seconds here)

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  if (isLoading) {
    return <LoadingSpinner />; // Show loading spinner while the app is loading
  }

  return (
    <Router>
      <div className={styles.appContainer}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className={styles.mainSection}>
                  <div className={styles.HeroSection_wrappper}>
                    <HeroSection />
                    <CountdownTimer />
                  </div>
                </div>
                <Gallery />
                <div className={styles.Instructions}>
                  <div className={styles.Introduction_wrappper}>
                    <Instructions />
                  </div>
                </div>
                <div className={styles.NFTMintingForm}>
                  <div className={styles.NFTMintingForm_wrappper}>

                      <NFTMintingForm />
                      {/* Other components */}

                    <Footer />

                  </div>
                </div>
                <InfiniteScrollCards />
              </>
            }
          />
          <Route path="/eternal-cards" element={<EternalCards />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/message" element={<Message />} />
        </Routes>
        <SiteFooter />
      </div>
    </Router>
  );
}

export default App;
