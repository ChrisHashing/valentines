import React from "react";
import styles from "./Gallery.module.css";
import CircularGallery from "../CircularGallery/CircularGallery";

function Gallery() {
  return (
    <div className={styles.galleryContainer}>

      <div style={{ height: '600px', position: 'relative' }}>
        <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
      </div>
    </div>
  );
}

export default Gallery;