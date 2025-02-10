
import React, { useRef, useEffect } from "react";
import styles from "./InfiniteScrollCards.module.css";


const profiles = [
  {
      name: "Vitalik Buterin",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Vitalik_Buterin_TechCrunch_London_2015_%28cropped%29.jpg",
      address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
  },
  {
      name: "Gary Veynerchuck",
      image: "https://i.seadn.io/gae/YX3nBiTQ1N7Pa6ymJTD2I9ihuxiwVY-gvBloyt5vf8QMitXYKX_KEdf7FyfTGaD9BObTmO6E4OzDUKrsli0w8B7xRc-jqJnqhIxu5Q?auto=format&dpr=1&w=256",
      address: "0x5ea9681c3ab9b5739810f8b91ae65ec47de62119"
  },
  {
      name: "Donald Trump",
      image: "https://www.whitehouse.gov/wp-content/uploads/2025/01/Donald-J-Trump.jpg",
      address: "0x94845333028B1204Fbe14E1278Fd4Adde46B22ce"
  },
  {
      name: "Paris Hilton",
      image: "https://i.seadn.io/gcs/files/4351d491a6e60dc3915d555762e5dadb.jpg?auto=format&dpr=1&w=256",
      address: "0xB6Aa5a1AA37a4195725cDF1576dc741d359b56bd"
  },
  {
      name: "Mark Cuban",
      image: "https://i.seadn.io/gae/yMiURhMqqYzfoZZUz09s1fwZqBRfQylXwN8jIYjKNpy3ClCPNCJIjJA-BuI3M6QvO6cMED9ag9l9MSow4ohiag55pUE_D_0GzBzxlA?auto=format&dpr=1&w=256",
      address: "0xa679c6154b8d4619Af9F83f0bF9a13A680e01eCf"
  },
  {
      name: "Steve Aoki",
      image: "https://i.seadn.io/gae/FDYglkKVkwubS6YrgjWa8Nqa6E47sccB41Va7u0OlvmQwUiOrKiCund13JVSXzLZx76ms--QcVgonfqCbMEBuUMTDmSy9mWsRt-d?auto=format&dpr=1&w=256",
      address: "0xe4bBCbFf51e61D0D95FcC5016609aC8354B177C4"
  },
  {
    name: "Vitalik Buterin",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Vitalik_Buterin_TechCrunch_London_2015_%28cropped%29.jpg",
    address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
},
{
    name: "Gary Veynerchuck",
    image: "https://i.seadn.io/gae/YX3nBiTQ1N7Pa6ymJTD2I9ihuxiwVY-gvBloyt5vf8QMitXYKX_KEdf7FyfTGaD9BObTmO6E4OzDUKrsli0w8B7xRc-jqJnqhIxu5Q?auto=format&dpr=1&w=256",
    address: "0x5ea9681c3ab9b5739810f8b91ae65ec47de62119"
},
{
    name: "Donald Trump",
    image: "https://www.whitehouse.gov/wp-content/uploads/2025/01/Donald-J-Trump.jpg",
    address: "0x94845333028B1204Fbe14E1278Fd4Adde46B22ce"
},
{
    name: "Paris Hilton",
    image: "https://i.seadn.io/gcs/files/4351d491a6e60dc3915d555762e5dadb.jpg?auto=format&dpr=1&w=256",
    address: "0xB6Aa5a1AA37a4195725cDF1576dc741d359b56bd"
},
{
    name: "Mark Cuban",
    image: "https://i.seadn.io/gae/yMiURhMqqYzfoZZUz09s1fwZqBRfQylXwN8jIYjKNpy3ClCPNCJIjJA-BuI3M6QvO6cMED9ag9l9MSow4ohiag55pUE_D_0GzBzxlA?auto=format&dpr=1&w=256",
    address: "0xa679c6154b8d4619Af9F83f0bF9a13A680e01eCf"
},
{
    name: "Steve Aoki",
    image: "https://i.seadn.io/gae/FDYglkKVkwubS6YrgjWa8Nqa6E47sccB41Va7u0OlvmQwUiOrKiCund13JVSXzLZx76ms--QcVgonfqCbMEBuUMTDmSy9mWsRt-d?auto=format&dpr=1&w=256",
    address: "0xe4bBCbFf51e61D0D95FcC5016609aC8354B177C4"
},
  // Add more profiles as needed
];

function InfiniteScrollCards() {
  const scrollerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    let isPaused = false;

    const scrollContent = () => {
      if (!isPaused) {
        scroller.scrollLeft += 1; // Adjust speed by changing increment
        if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
          scroller.scrollLeft = 0; // Reset scroll to loop back
        }
      }
      animationRef.current = requestAnimationFrame(scrollContent);
    };

    // Start scrolling
    animationRef.current = requestAnimationFrame(scrollContent);

    return () => cancelAnimationFrame(animationRef.current); // Cleanup
  }, []);

  const handleMouseEnter = () => {
    cancelAnimationFrame(animationRef.current); // Pause scrolling
  };

  const handleMouseLeave = () => {
    animationRef.current = requestAnimationFrame(() => {
      scrollerRef.current.scrollLeft += 1;
    });
  };

  const handleScroll = (event) => {
    event.preventDefault();
    scrollerRef.current.scrollLeft += event.deltaY; // Enable mouse scrolling
  };

  return (
    <div
      className={styles.scrollWrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onWheel={handleScroll} // Mouse scroll handling
    >
      <div ref={scrollerRef} className={styles.scroller}>
        {profiles.map((profile, index) => (
          <div key={`${profile.address}-${index}`} className={styles.card}>
            <div className={styles.avatar} style={{ backgroundImage: `url(${profile.image})` }}></div>
            <div className={styles.text}>{profile.name}</div>
            <button className={styles.button}>SEND</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfiniteScrollCards;
