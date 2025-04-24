// FighterData.js - ข้อมูลนักมวยทั้งหมดในเกม

const fighters = [
  {
    id: 1,
    name: "Satoshi",
    nationality: "Japan",
    currency: "JPY",
    currencyPair: "USD/JPY",
    image: "/fighters/1.ชื่อ Satoshi สัญชาติ Japan สกุลเงิน JPY.png",
    stats: { power: 85, speed: 78, endurance: 82, technique: 90 },
    style: "มวยเทคนิค",
    record: { wins: 25, losses: 3 },
    description: "นักมวยที่มีเทคนิคการต่อสู้ที่แม่นยำและรวดเร็ว ชอบใช้หมัดและศอกโจมตีจุดอ่อนของคู่ต่อสู้"
  },
  {
    id: 2,
    name: "Ford",
    nationality: "USA",
    currency: "USD",
    currencyPair: "EUR/USD",
    image: "/fighters/2. ชื่อ Ford สัญชาติ USA สกุลเงิน USD.png",
    stats: { power: 90, speed: 75, endurance: 88, technique: 80 },
    style: "มวยบู๊",
    record: { wins: 30, losses: 5 },
    description: "นักมวยที่มีพละกำลังมหาศาล ชอบเข้าปะทะและใช้หมัดหนักๆ ในการโจมตีคู่ต่อสู้"
  },
  {
    id: 3,
    name: "Tim",
    nationality: "Australia",
    currency: "AUD",
    currencyPair: "AUD/USD",
    image: "/fighters/3. ชื่อ Tim สัญชาติ Australia สกุลเงิน AUD.png",
    stats: { power: 82, speed: 85, endurance: 80, technique: 83 },
    style: "มวยรอบตัว",
    record: { wins: 22, losses: 4 },
    description: "นักมวยที่มีความสมดุลในทุกด้าน สามารถปรับเปลี่ยนสไตล์การต่อสู้ได้ตามสถานการณ์"
  },
  {
    id: 4,
    name: "Gerrard",
    nationality: "England",
    currency: "GBP",
    currencyPair: "GBP/USD",
    image: "/fighters/4. ชื่อ Gerrard สัญชาติ England สกุลเงิน GBP.png",
    stats: { power: 87, speed: 82, endurance: 85, technique: 84 },
    style: "มวยเชิง",
    record: { wins: 28, losses: 6 },
    description: "นักมวยที่มีทักษะการเคลื่อนไหวที่ดีเยี่ยม ชอบใช้เท้าและเข่าในการโจมตี"
  },
  {
    id: 5,
    name: "David",
    nationality: "Canada",
    currency: "CAD",
    currencyPair: "USD/CAD",
    image: "/fighters/5. ชื่อ David สัญชาติ Canada สกุลเงิน CAD.png",
    stats: { power: 84, speed: 83, endurance: 89, technique: 81 },
    style: "มวยอึด",
    record: { wins: 24, losses: 7 },
    description: "นักมวยที่มีความทนทานสูง สามารถรับแรงกระแทกได้ดีและไม่ยอมแพ้ง่ายๆ"
  },
  {
    id: 6,
    name: "Albert",
    nationality: "Switzerland",
    currency: "CHF",
    currencyPair: "USD/CHF",
    image: "/fighters/6.ชื่อ Albert สัญชาติ Switzerland สกุลเงิน CHF.png",
    stats: { power: 80, speed: 88, endurance: 83, technique: 87 },
    style: "มวยเชิงวิทยาศาสตร์",
    record: { wins: 26, losses: 4 },
    description: "นักมวยที่ใช้หลักการทางฟิสิกส์และคณิตศาสตร์ในการคำนวณจังหวะการโจมตีอย่างแม่นยำ"
  },
  {
    id: 7,
    name: "Cliff",
    nationality: "New Zealand",
    currency: "NZD",
    currencyPair: "NZD/USD",
    image: "/fighters/7.ชื่อ Cliff สัญชาติ New Zealand สกุลเงิน NZD.png",
    stats: { power: 86, speed: 84, endurance: 81, technique: 85 },
    style: "มวยดุดัน",
    record: { wins: 23, losses: 5 },
    description: "นักมวยที่มีความดุดันและไม่กลัวใคร ชอบเข้าไปปะทะและกดดันคู่ต่อสู้ตลอดเวลา"
  },
  {
    id: 8,
    name: "Henry",
    nationality: "France",
    currency: "EUR",
    currencyPair: "EUR/GBP",
    image: "/fighters/8.ชื่อ Henry สัญชาติ France สกุลเงิน EUR.png",
    stats: { power: 83, speed: 87, endurance: 82, technique: 88 },
    style: "มวยศิลปะ",
    record: { wins: 27, losses: 3 },
    description: "นักมวยที่มีลีลาการต่อสู้ที่สวยงามราวกับศิลปะ แต่แฝงไปด้วยพลังและความอันตราย"
  },
  {
    id: 9,
    name: "Yuri",
    nationality: "Russia",
    currency: "RUB",
    currencyPair: "USD/RUB",
    image: "/fighters/9 ชื่อ Yuri สัญชาติ Russia สกุลเงิน RUB.png",
    stats: { power: 92, speed: 78, endurance: 86, technique: 79 },
    style: "มวยหนัก",
    record: { wins: 29, losses: 6 },
    description: "นักมวยที่มีพละกำลังมหาศาล หมัดหนักและทนทานต่อการโจมตี"
  },
  {
    id: 10,
    name: "Mohamed",
    nationality: "South Africa",
    currency: "ZAR",
    currencyPair: "USD/ZAR",
    image: "/fighters/10.ชื่อ Mohamed สัญชาติ South africaสกุลเงิน ZAR.png",
    stats: { power: 85, speed: 89, endurance: 84, technique: 82 },
    style: "มวยเร็ว",
    record: { wins: 25, losses: 5 },
    description: "นักมวยที่มีความเร็วสูง เคลื่อนไหวรวดเร็วและหลบหลีกการโจมตีได้ดีเยี่ยม"
  }
];

export default fighters;
