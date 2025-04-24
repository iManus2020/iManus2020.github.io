import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import FighterCard from './FighterCard';
import ForexChart from './ForexChart';
import fighters from './FighterData';

const BattleArena = () => {
  const [round, setRound] = useState(1);
  const [roundResults, setRoundResults] = useState([]);
  const [battleComplete, setBattleComplete] = useState(false);
  const [selectedFighters, setSelectedFighters] = useState({
    red: null,
    blue: null
  });
  const [isChartActive, setIsChartActive] = useState(false);
  const [currencyPair, setCurrencyPair] = useState('EUR/USD');
  const [redTeamFighters, setRedTeamFighters] = useState([]);
  const [blueTeamFighters, setBlueTeamFighters] = useState([]);

  // ทำการสุ่มนักมวยสำหรับแต่ละทีมเมื่อโหลดหน้า
  useEffect(() => {
    // สุ่มนักมวย 5 คนสำหรับทีมแดง
    const shuffledFighters = [...fighters].sort(() => 0.5 - Math.random());
    setRedTeamFighters(shuffledFighters.slice(0, 5));
    setBlueTeamFighters(shuffledFighters.slice(5, 10));
  }, []);

  const handleFighterSelect = (fighter, corner) => {
    setSelectedFighters(prev => ({
      ...prev,
      [corner]: fighter
    }));

    // ถ้าเลือกนักมวยทั้งสองฝ่ายแล้ว ให้กำหนดคู่สกุลเงินตามนักมวยที่เลือก
    if (corner === 'red' && selectedFighters.blue) {
      setCurrencyPair(fighter.currencyPair);
    } else if (corner === 'blue' && selectedFighters.red) {
      setCurrencyPair(selectedFighters.red.currencyPair);
    }
  };

  const startRound = () => {
    if (!selectedFighters.red || !selectedFighters.blue) {
      alert("กรุณาเลือกนักมวยทั้งสองฝ่าย");
      return;
    }

    setIsChartActive(true);
  };

  const handleCandleComplete = (candleData) => {
    const { isBullish, percentChange } = candleData;
    
    // Determine winner based on candle
    const winner = isBullish ? 'blue' : 'red';
    const loser = isBullish ? 'red' : 'blue';
    
    // Calculate score based on percent change and fighter stats
    const winnerFighter = selectedFighters[winner];
    const loserFighter = selectedFighters[loser];
    
    // Add round result
    setRoundResults(prev => [
      ...prev, 
      {
        round,
        winner,
        isBullish,
        percentChange: Math.abs(percentChange),
        winnerName: winnerFighter.name,
        loserName: loserFighter.name,
        currencyPair: currencyPair
      }
    ]);
    
    // Check if battle is complete (3 rounds)
    if (round >= 3) {
      setBattleComplete(true);
    } else {
      setRound(prev => prev + 1);
    }
    
    setIsChartActive(false);
  };

  const resetBattle = () => {
    setRound(1);
    setRoundResults([]);
    setBattleComplete(false);
    setSelectedFighters({ red: null, blue: null });
    
    // สุ่มนักมวยใหม่สำหรับการแข่งขันครั้งต่อไป
    const shuffledFighters = [...fighters].sort(() => 0.5 - Math.random());
    setRedTeamFighters(shuffledFighters.slice(0, 5));
    setBlueTeamFighters(shuffledFighters.slice(5, 10));
  };

  // Determine overall winner
  const determineOverallWinner = () => {
    if (roundResults.length < 3) return null;
    
    let redWins = 0;
    let blueWins = 0;
    
    roundResults.forEach(result => {
      if (result.winner === 'red') redWins++;
      else blueWins++;
    });
    
    if (redWins > blueWins) return 'red';
    if (blueWins > redWins) return 'blue';
    return 'draw';
  };

  const overallWinner = determineOverallWinner();

  return (
    <div className={styles.battleArena}>
      <h2 className={styles.arenaTitle}>
        สนามมวย Forex - ยกที่ {round}/3
      </h2>
      
      {battleComplete ? (
        <div className={styles.battleResults}>
          <h3 className={styles.resultsTitle}>
            ผลการแข่งขัน
          </h3>
          
          <div className={styles.resultsList}>
            {roundResults.map((result, index) => (
              <div key={index} className={styles.resultItem}>
                <span>ยกที่ {result.round}</span>
                <span className={result.winner === 'red' ? styles.redWin : styles.blueWin}>
                  {result.winnerName} ชนะ {result.loserName}
                </span>
                <span>
                  {result.currencyPair}: {result.isBullish ? 'Bullish' : 'Bearish'} ({result.percentChange.toFixed(3)}%)
                </span>
              </div>
            ))}
          </div>
          
          <div className={styles.overallResult}>
            <h4 className={styles.overallTitle}>
              ผลรวม
            </h4>
            <span className={`${styles.overallWinner} ${
              overallWinner === 'red' ? styles.redWinner : 
              overallWinner === 'blue' ? styles.blueWinner : 
              styles.drawResult
            }`}>
              {overallWinner === 'red' ? `${selectedFighters.red.name} ชนะ` : 
               overallWinner === 'blue' ? `${selectedFighters.blue.name} ชนะ` : 
               'เสมอ'}
            </span>
          </div>
          
          <div className={styles.resetButton}>
            <button className={styles.button} onClick={resetBattle}>
              เริ่มการแข่งขันใหม่
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.arenaGrid}>
            <div className={styles.teamSection}>
              <h3 className={`${styles.teamTitle} ${styles.redTeam}`}>
                ฝ่ายแดง
              </h3>
              <div className={styles.teamStack}>
                {redTeamFighters.map(fighter => (
                  <FighterCard 
                    key={fighter.id}
                    fighter={fighter}
                    isActive={selectedFighters.red?.id === fighter.id}
                    onClick={() => handleFighterSelect(fighter, 'red')}
                  />
                ))}
              </div>
            </div>
            
            <div>
              {isChartActive ? (
                <ForexChart 
                  currencyPair={currencyPair}
                  timeFrame="1m"
                  onCandleComplete={handleCandleComplete}
                />
              ) : (
                <div className={styles.battleStatus}>
                  <h3 className={styles.statusTitle}>
                    สถานะการแข่งขัน
                  </h3>
                  
                  <div className={styles.roundResults}>
                    {roundResults.map((result, index) => (
                      <div key={index} className={styles.roundResult}>
                        <span>ยกที่ {result.round}</span>
                        <span className={result.winner === 'red' ? styles.redWin : styles.blueWin}>
                          {result.winner === 'red' ? 'แดงชนะ' : 'น้ำเงินชนะ'}
                        </span>
                        <span>{result.currencyPair}</span>
                      </div>
                    ))}
                  </div>
                  
                  {selectedFighters.red && selectedFighters.blue && (
                    <div className={styles.currencyPairInfo}>
                      <h4>คู่สกุลเงินในการแข่งขัน: {currencyPair}</h4>
                      <p>
                        {selectedFighters.red.name} ({selectedFighters.red.nationality}) vs {selectedFighters.blue.name} ({selectedFighters.blue.nationality})
                      </p>
                    </div>
                  )}
                  
                  <div className={styles.startButton}>
                    <button 
                      className={styles.button} 
                      onClick={startRound}
                      disabled={!selectedFighters.red || !selectedFighters.blue}
                    >
                      {roundResults.length === 0 ? 'เริ่มการแข่งขัน' : `เริ่มยกที่ ${round}`}
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className={styles.teamSection}>
              <h3 className={`${styles.teamTitle} ${styles.blueTeam}`}>
                ฝ่ายน้ำเงิน
              </h3>
              <div className={styles.teamStack}>
                {blueTeamFighters.map(fighter => (
                  <FighterCard 
                    key={fighter.id}
                    fighter={fighter}
                    isActive={selectedFighters.blue?.id === fighter.id}
                    onClick={() => handleFighterSelect(fighter, 'blue')}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className={styles.rules}>
            <h4 className={styles.rulesTitle}>กติกาการแข่งขัน:</h4>
            <p className={styles.rulesText}>
              1. แข่งขัน 3 ยก ยกละ 1 นาที โดยใช้ข้อมูลจาก Forex เป็นตัวตัดสิน
            </p>
            <p className={styles.rulesText}>
              2. ถ้าแท่งเทียนจบเป็น Bullish (ราคาปิดสูงกว่าราคาเปิด) ฝ่ายน้ำเงินชนะ
            </p>
            <p className={styles.rulesText}>
              3. ถ้าแท่งเทียนจบเป็น Bearish (ราคาปิดต่ำกว่าราคาเปิด) ฝ่ายแดงชนะ
            </p>
            <p className={styles.rulesText}>
              4. ผู้ชนะคือฝ่ายที่ชนะมากกว่าใน 3 ยก
            </p>
            <p className={styles.rulesText}>
              5. คู่สกุลเงินในการแข่งขันจะถูกกำหนดโดยนักมวยฝ่ายแดงที่เลือก
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default BattleArena;
