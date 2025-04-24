import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import FighterCard from '../components/FighterCard';
import BattleArena from '../components/BattleArena';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  
  const renderContent = () => {
    switch (activeTab) {
      case 'battle':
        return <BattleArena />;
      case 'home':
      default:
        return (
          <div>
            <div className={styles.hero} style={{backgroundImage: "url('/muay-thai-bg.jpg')"}}>
              <div className={styles.heroOverlay}></div>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  เกมการ์ดนักมวยไทย Forex
                </h1>
                <p className={styles.heroText}>
                  ผสมผสานระหว่างกีฬามวยไทยและการเทรด Forex ในเกมการ์ดที่ท้าทายและสนุกสนาน
                </p>
                <button 
                  className={styles.button} 
                  onClick={() => setActiveTab('battle')}
                >
                  เริ่มการแข่งขัน
                </button>
              </div>
            </div>

            <div className={styles.main}>
              <h2 className={styles.sectionTitle}>
                วิธีการเล่น
              </h2>
              
              <div className={styles.grid}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>
                    1. เลือกนักมวย
                  </h3>
                  <p>
                    เลือกนักมวยที่คุณชื่นชอบจากฝ่ายแดงและฝ่ายน้ำเงิน แต่ละคนมีสถิติและสไตล์การชกที่แตกต่างกัน
                  </p>
                </div>
                
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>
                    2. ดูการแข่งขัน
                  </h3>
                  <p>
                    แข่งขัน 3 ยก ยกละ 1 นาที โดยใช้ข้อมูลจาก Forex เป็นตัวตัดสิน แถบพลังจะเคลื่อนไหวตามข้อมูลแท่งเทียน
                  </p>
                </div>
                
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>
                    3. ดูผลการแข่งขัน
                  </h3>
                  <p>
                    ถ้าแท่งเทียนจบเป็น Bullish ฝ่ายน้ำเงินชนะ ถ้าเป็น Bearish ฝ่ายแดงชนะ ผู้ชนะคือฝ่ายที่ชนะมากกว่าใน 3 ยก
                  </p>
                </div>
              </div>
              
              <div>
                <h2 className={styles.sectionTitle}>
                  คุณสมบัติเกม
                </h2>
                
                <div className={styles.featureGrid}>
                  <div className={styles.feature}>
                    <div className={styles.featureIcon}>
                      1
                    </div>
                    <div>
                      <h3 className={styles.featureTitle}>
                        ข้อมูล Forex เรียลไทม์
                      </h3>
                      <p>
                        ใช้ข้อมูลจริงจากตลาด Forex เป็นกลไกหลักในการกำหนดผลแพ้ชนะ
                      </p>
                    </div>
                  </div>
                  
                  <div className={styles.feature}>
                    <div className={styles.featureIcon}>
                      2
                    </div>
                    <div>
                      <h3 className={styles.featureTitle}>
                        นักมวยหลากหลายสไตล์
                      </h3>
                      <p>
                        เลือกนักมวยที่มีสถิติและสไตล์การชกที่แตกต่างกัน
                      </p>
                    </div>
                  </div>
                  
                  <div className={styles.feature}>
                    <div className={styles.featureIcon}>
                      3
                    </div>
                    <div>
                      <h3 className={styles.featureTitle}>
                        ระบบการแข่งขัน 3 ยก
                      </h3>
                      <p>
                        แข่งขัน 3 ยก ยกละ 1 นาที เพื่อหาผู้ชนะที่แท้จริง
                      </p>
                    </div>
                  </div>
                  
                  <div className={styles.feature}>
                    <div className={styles.featureIcon}>
                      4
                    </div>
                    <div>
                      <h3 className={styles.featureTitle}>
                        กราฟิกสวยงาม
                      </h3>
                      <p>
                        ภาพนักมวยและอินเตอร์เฟซที่ออกแบบอย่างสวยงาม
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.callToAction}>
                <h2 className={styles.callToActionTitle}>
                  พร้อมที่จะเริ่มการแข่งขันหรือยัง?
                </h2>
                <button 
                  className={styles.button} 
                  onClick={() => setActiveTab('battle')}
                >
                  เริ่มการแข่งขันเลย
                </button>
              </div>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 
            className={styles.title} 
            onClick={() => setActiveTab('home')}
          >
            เกมการ์ดนักมวยไทย Forex
          </h1>
          
          <nav className={styles.nav}>
            <button 
              className={`${styles.navButton} ${activeTab === 'home' ? styles.navButtonActive : ''}`} 
              onClick={() => setActiveTab('home')}
            >
              หน้าหลัก
            </button>
            <button 
              className={`${styles.navButton} ${activeTab === 'battle' ? styles.navButtonActive : ''}`} 
              onClick={() => setActiveTab('battle')}
            >
              สนามแข่ง
            </button>
          </nav>
        </div>
      </header>
      
      <main className={styles.main}>
        {renderContent()}
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLeft}>
            <h2 className={styles.footerTitle}>
              เกมการ์ดนักมวยไทย Forex
            </h2>
            <p className={styles.footerText}>
              ผสมผสานระหว่างกีฬามวยไทยและการเทรด Forex
            </p>
          </div>
          
          <div className={styles.footerRight}>
            <p className={styles.footerText}>&copy; 2025 เกมการ์ดนักมวยไทย Forex</p>
            <p className={styles.footerText}>พัฒนาโดย Manus AI</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
