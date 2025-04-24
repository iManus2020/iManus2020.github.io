import React from 'react';
import styles from '../styles/Home.module.css';

const FighterCard = ({ fighter, isActive, onClick }) => {
  const { name, image, stats, style, record } = fighter;

  return (
    <div 
      className={`${styles.fighterCard} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      <div className={styles.fighterImage}>
        <img 
          src={image || "/placeholder-fighter.jpg"} 
          alt={name} 
        />
      </div>

      <div className={styles.fighterInfo}>
        <div className={styles.fighterHeader}>
          <span className={styles.fighterStyle}>{style}</span>
          <span className={styles.fighterRecord}>
            {record.wins}W - {record.losses}L
          </span>
        </div>

        <h4 className={styles.fighterName}>{name}</h4>

        <div className={styles.fighterStats}>
          <div className={styles.statRow}>
            <span>พลัง:</span>
            <span className={styles.statValue}>{stats.power}</span>
          </div>
          <div className={styles.statRow}>
            <span>ความเร็ว:</span>
            <span className={styles.statValue}>{stats.speed}</span>
          </div>
          <div className={styles.statRow}>
            <span>ความทนทาน:</span>
            <span className={styles.statValue}>{stats.endurance}</span>
          </div>
          <div className={styles.statRow}>
            <span>เทคนิค:</span>
            <span className={styles.statValue}>{stats.technique}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FighterCard;
