import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

const ForexChart = ({ currencyPair = 'EUR/USD', timeFrame = '1m', onCandleComplete }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: currencyPair,
        data: [],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1
      }
    ]
  });
  
  const [currentPrice, setCurrentPrice] = useState(0);
  const [openPrice, setOpenPrice] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute in seconds
  const [isRunning, setIsRunning] = useState(true);
  const [powerBarPosition, setPowerBarPosition] = useState(50); // Start at middle (50%)

  // Simulate Forex data
  useEffect(() => {
    if (!isRunning) return;

    // Set initial price
    if (openPrice === 0) {
      const initialPrice = parseFloat((1 + Math.random() * 0.5).toFixed(5));
      setOpenPrice(initialPrice);
      setCurrentPrice(initialPrice);
    }

    const interval = setInterval(() => {
      // Generate new price with small random change
      const change = (Math.random() - 0.5) * 0.002; // Small random change
      const newPrice = parseFloat((currentPrice + change).toFixed(5));
      setCurrentPrice(newPrice);
      
      // Update chart data
      setChartData(prevData => {
        const newLabels = [...prevData.labels, new Date().toLocaleTimeString()];
        if (newLabels.length > 60) newLabels.shift(); // Keep only last 60 data points
        
        const newData = [...prevData.datasets[0].data, newPrice];
        if (newData.length > 60) newData.shift();
        
        return {
          labels: newLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              label: currencyPair,
              data: newData
            }
          ]
        };
      });
      
      // Update power bar position based on current vs open price
      const percentChange = ((newPrice - openPrice) / openPrice) * 100;
      // Scale to make movements more visible (±2% change = full movement)
      const scaledPosition = 50 + (percentChange * 25);
      // Clamp between 0-100
      const clampedPosition = Math.max(0, Math.min(100, scaledPosition));
      setPowerBarPosition(clampedPosition);
      
      // Update timer
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          
          // Determine if bullish or bearish and notify parent
          const isBullish = newPrice > openPrice;
          if (onCandleComplete) {
            onCandleComplete({
              open: openPrice,
              close: newPrice,
              isBullish,
              percentChange
            });
          }
          
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPrice, openPrice, isRunning, onCandleComplete, currencyPair]);

  // Format time left as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.forexChart}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>{currencyPair}</h3>
        <span className={`${styles.currentPrice} ${currentPrice < openPrice ? styles.bearishPrice : styles.bullishPrice}`}>
          {currentPrice.toFixed(5)}
        </span>
      </div>
      
      <div className={styles.chartContainer}>
        {/* Chart visualization */}
        <div className={styles.chartVisualization}>
          <div className={styles.candleSticks}>
            {Array.from({ length: 10 }).map((_, index) => {
              const isUp = Math.random() > 0.5;
              const height = 20 + Math.random() * 60;
              return (
                <div 
                  key={index} 
                  className={`${styles.candle} ${isUp ? styles.bullishCandle : styles.bearishCandle}`}
                  style={{ height: `${height}px` }}
                />
              );
            })}
          </div>
        </div>
      </div>
      
      <div className={styles.powerBarContainer}>
        <span className={styles.redSide}>แดง</span>
        <span className={styles.timer}>
          เวลา: {formatTime(timeLeft)}
        </span>
        <span className={styles.blueSide}>น้ำเงิน</span>
      </div>
      
      <div className={styles.powerBarWrapper}>
        <div 
          className={styles.powerBar} 
          style={{ width: `${powerBarPosition}%` }}
        />
        <div className={styles.powerBarCenter} />
      </div>
      
      <div className={styles.priceInfo}>
        <div className={styles.priceBox}>
          <span className={styles.priceLabel}>เปิด:</span>
          <span className={styles.priceValue}>{openPrice.toFixed(5)}</span>
        </div>
        <div className={styles.priceBox}>
          <span className={styles.priceLabel}>ปัจจุบัน:</span>
          <span className={`${styles.priceValue} ${currentPrice > openPrice ? styles.priceUp : styles.priceDown}`}>
            {currentPrice.toFixed(5)}
          </span>
        </div>
        <div className={styles.priceBox}>
          <span className={styles.priceLabel}>เปลี่ยนแปลง:</span>
          <span 
            className={`${styles.priceValue} ${currentPrice > openPrice ? styles.priceUp : styles.priceDown}`}
          >
            {((currentPrice - openPrice) / openPrice * 100).toFixed(3)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForexChart;
