export interface SurfVocabulary {
  id: string;
  category: string;
  english: string;
  thaiMeaning: string;
  thaiPhonetic: string;
  example: string;
  audioText: string;
  surfTip?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const DEFAULT_CATEGORIES: string[] = [
  'Paddling & Takeoff',
  'Ocean & Environment',
  'Board & Equipment',
  'Safety & Etiquette',
  'Stance & Riding',
  'Wave Reading & Positioning'
];

export const CATEGORIES = [
  'All Categories',
  ...DEFAULT_CATEGORIES
];

export const SURF_VOCABULARY: SurfVocabulary[] = [
  {
    id: 'surf-1',
    category: 'Board & Equipment',
    english: 'Buoyancy',
    thaiMeaning: 'แรงลอยตัว (ความสามารถในการลอยน้ำของกระดาน)',
    thaiPhonetic: 'บอย-ยัน-ซี',
    example: 'A foam board has high buoyancy, which helps beginners catch small waves easily.',
    audioText: 'Buoyancy. A foam board has high buoyancy, which helps beginners catch small waves easily.',
    surfTip: 'สำหรับผู้เริ่มต้น เลือกบอร์ดที่มี Volume สูงเพื่อให้มี Buoyancy ช่วยพายง่ายขึ้น',
    difficulty: 'Beginner'
  },
  {
    id: 'surf-2',
    category: 'Paddling & Takeoff',
    english: 'Pop-up',
    thaiMeaning: 'การสปริงตัวยืนบนบอร์ด (เทคออฟ)',
    thaiPhonetic: 'ป๊อบ-อัพ',
    example: 'Keep your hands flat under your chest when doing a pop-up.',
    audioText: 'Pop-up. Keep your hands flat under your chest when doing a pop-up.',
    surfTip: 'อย่าใช้หัวเข่ายันบอร์ด ให้ใช้ฝ่ามือดันอกและวาดเท้ามาวางตรงกลางบอร์ดในจังหวะเดียว',
    difficulty: 'Beginner'
  },
  {
    id: 'surf-3',
    category: 'Ocean & Environment',
    english: 'Whitewater',
    thaiMeaning: 'คลื่นฟองขาว (คลื่นที่แตกตัวแล้ว)',
    thaiPhonetic: 'ไวท์-วอ-เทอร์',
    example: 'Beginners usually practice popping up in the whitewater near the shore.',
    audioText: 'Whitewater. Beginners usually practice popping up in the whitewater near the shore.',
    surfTip: 'คลื่นฟองขาวเหมาะสำหรับการฝึกทรงตัวและเทคออฟขั้นแรก ก่อนออกไปโต้คลื่นลูกเขียว (Green waves)',
    difficulty: 'Beginner'
  },
  {
    id: 'surf-4',
    category: 'Paddling & Takeoff',
    english: 'Turtle Roll',
    thaiMeaning: 'เทคนิคการพลิกบอร์ดหลบคลื่น (พลิกบอร์ดคว่ำลงน้ำ)',
    thaiPhonetic: 'เทอร์-เทิล-โรล',
    example: 'When a big wave approaches on a longboard, hold the rails tightly and do a turtle roll.',
    audioText: 'Turtle Roll. When a big wave approaches on a longboard, hold the rails tightly and do a turtle roll.',
    surfTip: 'ใช้กับ Longboard เมื่อดักคลื่นฟองขาวใหญ่ พลิกตัวและบอร์ดให้คว่ำลงใต้ผิวน้ำ',
    difficulty: 'Intermediate'
  },
  {
    id: 'surf-5',
    category: 'Ocean & Environment',
    english: 'Rip Current',
    thaiMeaning: 'กระแสน้ำไหลย้อนกลับออกสู่ทะเลลึก',
    thaiPhonetic: 'ริพ-เคอร์-เรนท์',
    example: 'If caught in a rip current, stay calm and paddle parallel to the shore.',
    audioText: 'Rip Current. If caught in a rip current, stay calm and paddle parallel to the shore.',
    surfTip: 'อย่าพายสวนกระแสน้ำตรงๆ เข้าหาฝั่ง ให้พายขนานกับชายหาดออกไปด้านข้างก่อน',
    difficulty: 'Beginner'
  },
  {
    id: 'surf-6',
    category: 'Safety & Etiquette',
    english: 'Lineup',
    thaiMeaning: 'ไลน์อัพ (จุดที่นักโต้คลื่นลอยตัวรอจับคลื่นนอกแนวคลื่นแตก)',
    thaiPhonetic: 'ไลน์-อัพ',
    example: 'Sit patient on your board at the lineup and watch the horizon for incoming sets.',
    audioText: 'Lineup. Sit patient on your board at the lineup and watch the horizon for incoming sets.',
    surfTip: 'เมื่อพายออกไปถึง Lineup ให้ดูมารยาทและทิศทางการเข้าจับคลื่นของเซิร์ฟเฟอร์คนอื่นเสมอ',
    difficulty: 'Beginner'
  },
  {
    id: 'surf-7',
    category: 'Paddling & Takeoff',
    english: 'Duck Dive',
    thaiMeaning: 'การกดหัวบอร์ดดำน้ำหลบคลื่น (ใช้กับ Shortboard)',
    thaiPhonetic: 'ดั๊ก-ไดฟ์',
    example: 'Push the nose of your shortboard under the wave and follow with your knee.',
    audioText: 'Duck Dive. Push the nose of your shortboard under the wave and follow with your knee.',
    surfTip: 'ใช้สำหรับ Shortboard ดันหัวบอร์ดและใช้เข่าหรือเท้ากดหางบอร์ดจมลงใต้ฟองคลื่น',
    difficulty: 'Intermediate'
  },
  {
    id: 'surf-8',
    category: 'Stance & Riding',
    english: 'Goofy Foot',
    thaiMeaning: 'การยืนหันหน้าขวา (เท้าขวาอยู่ข้างหน้า)',
    thaiPhonetic: 'กู๊ฟ-ฟี่-ฟุต',
    example: 'If your right foot is forward on the surf board, you are a goofy foot surfer.',
    audioText: 'Goofy Foot. If your right foot is forward on the surf board, you are a goofy foot surfer.',
    surfTip: 'การทดสอบง่ายๆ คือให้เพื่อนลองดันหลังเบาๆ เท้าไหนยื่นไปรับก่อน เท้านั้นคือเท้าหน้า',
    difficulty: 'Beginner'
  },
  {
    id: 'surf-9',
    category: 'Stance & Riding',
    english: 'Regular Foot',
    thaiMeaning: 'การยืนหันหน้าซ้าย (เท้าซ้ายอยู่ข้างหน้า)',
    thaiPhonetic: 'เรก-กิว-ลาร์-ฟุต',
    example: 'Most surfers stand with their left foot forward, which is called a regular foot stance.',
    audioText: 'Regular Foot. Most surfers stand with their left foot forward, which is called a regular foot stance.',
    surfTip: 'การยืนแบบ Regular ช่วยให้เข้าคลื่นขวา (Right hander) แบบหันหน้าเข้าหาคลื่น (Frontside)',
    difficulty: 'Beginner'
  },
  {
    id: 'surf-10',
    category: 'Safety & Etiquette',
    english: 'Drop-in',
    thaiMeaning: 'การปาดหน้า / แย่งคลื่นคนอื่น (ถือเป็นการผิดมารยาทร้ายแรง)',
    thaiPhonetic: 'ดร็อป-อิน',
    example: 'Never drop in on another surfer who already has the priority on the wave.',
    audioText: 'Drop-in. Never drop in on another surfer who already has the priority on the wave.',
    surfTip: 'มองซ้ายมองขวาหาคนที่อยู่ใกล้จุดPeakของคลื่นมากกว่าเสมอ เพื่อป้องกันอุบัติเหตุชนกัน',
    difficulty: 'Beginner'
  },
  {
    id: 'surf-11',
    category: 'Wave Reading & Positioning',
    english: 'Peak',
    thaiMeaning: 'ยอดคลื่น (จุดที่คลื่นเริ่มแตกตัวก่อนส่วนอื่น)',
    thaiPhonetic: 'พีค',
    example: 'Position yourself near the peak to catch the wave at its most powerful point.',
    audioText: 'Peak. Position yourself near the peak to catch the wave at its most powerful point.',
    surfTip: 'การอ่านตำแหน่ง Peak ช่วยให้จับคลื่นได้ง่ายและยาวที่สุด',
    difficulty: 'Intermediate'
  },
  {
    id: 'surf-12',
    category: 'Stance & Riding',
    english: 'Bottom Turn',
    thaiMeaning: 'การเลี้ยวโต้คลื่นตรงฐานคลื่น',
    thaiPhonetic: 'บ็อท-ท่อม-เทิร์น',
    example: 'A solid bottom turn sets up speed and trajectory for your next maneuver.',
    audioText: 'Bottom Turn. A solid bottom turn sets up speed and trajectory for your next maneuver.',
    surfTip: 'ย่อเข่า ย่อตัวลงต่ำเมื่อลงถึงฐานคลื่น แล้วบิดไหล่นำทางไปตามหน้าคลื่น',
    difficulty: 'Intermediate'
  },
  {
    id: 'surf-13',
    category: 'Board & Equipment',
    english: 'Leash / Legrope',
    thaiMeaning: 'สายรัดข้อเท้าเชื่อมกับบอร์ด',
    thaiPhonetic: 'ลีช / เล็ก-โรป',
    example: 'Always check your leash Velcro and cord before heading into the ocean.',
    audioText: 'Leash. Always check your leash Velcro and cord before heading into the ocean.',
    surfTip: 'ผูกสาย Leash ไว้ที่ขาหลัง (Rear foot) และตรวจเช็คสายเสมอเพื่อความปลอดภัย',
    difficulty: 'Beginner'
  },
  {
    id: 'surf-14',
    category: 'Wave Reading & Positioning',
    english: 'Set Waves',
    thaiMeaning: 'ชุดคลื่นใหญ่ที่เข้ามาเป็นช่วงๆ',
    thaiPhonetic: 'เซ็ต-เวฟส์',
    example: 'Wait past the break for the bigger set waves to roll in.',
    audioText: 'Set Waves. Wait past the break for the bigger set waves to roll in.',
    surfTip: 'สังเกตระยะห่างระหว่างชุดคลื่น (Lull) เพื่อกะจังหวะพายออกไปไลน์อัพโดยไม่ต้องปะทะคลื่น',
    difficulty: 'Intermediate'
  },
  {
    id: 'surf-15',
    category: 'Stance & Riding',
    english: 'Trim Line',
    thaiMeaning: 'การเลี้ยงความเร็วบนหน้าคลื่น',
    thaiPhonetic: 'ทริม-ไลน์',
    example: 'Find the sweet spot on your board to maintain a smooth trim line along the wave wall.',
    audioText: 'Trim Line. Find the sweet spot on your board to maintain a smooth trim line along the wave wall.',
    surfTip: 'ปรับน้ำหนักตัวหน้า-หลัง (Weight transfer) เพื่อไม่ให้หัวบอร์ดจมหรือหางบอร์ดหนืดเกินไป',
    difficulty: 'Advanced'
  }
];
