export interface SurfPhrase {
  id: string;
  category: string;
  english: string;
  thaiMeaning: string;
  thaiPhonetic: string;
  context?: string;
  audioText?: string;
}

export const DEFAULT_PHRASE_CATEGORIES = [
  'Introduce Myself',
  'Purpose of Class',
  'Theory Lesson',
  'Wave Condition',
  'Lineup & Health Concern'
];

export const SURF_PHRASES: SurfPhrase[] = [
  // 1. Introduce Myself
  {
    id: 'phrase-1',
    category: 'Introduce Myself',
    english: 'Hi, my name is [Name].',
    thaiMeaning: 'สวัสดีครับ/ค่ะ ผม/ดิฉันชื่อ [Name]',
    thaiPhonetic: '"ไฮ, ไม เนม อิส..."',
    context: 'กล่าวทักทายเป็นกันเองพร้อมยิ้มต้อนรับนักเรียน',
    audioText: 'Hi, my name is your instructor.'
  },
  {
    id: 'phrase-2',
    category: 'Introduce Myself',
    english: 'I will be your surf instructor today.',
    thaiMeaning: 'วันนี้ผม/ดิฉันจะเป็นผู้สอนโต้คลื่นให้คุณครับ/ค่ะ',
    thaiPhonetic: '"ไอ วิล บี ยัวร์ เซิร์ฟ อิน-สตรัค-เทอร์ ทู-เดย์"',
    context: 'สร้างความมั่นใจและความน่าเชื่อถือให้ผู้เรียน',
    audioText: 'I will be your surf instructor today.'
  },
  {
    id: 'phrase-3',
    category: 'Introduce Myself',
    english: 'What is your name?',
    thaiMeaning: 'คุณชื่ออะไรครับ/ค่ะ?',
    thaiPhonetic: '"วอท อิส ยัวร์ เนม?"',
    context: 'ถามชื่อเพื่อสร้างความคุ้นเคยและจดจำนักเรียน',
    audioText: 'What is your name?'
  },
  {
    id: 'phrase-4',
    category: 'Introduce Myself',
    english: 'Where are you from?',
    thaiMeaning: 'คุณมาจากประเทศอะไรครับ/ค่ะ?',
    thaiPhonetic: '"แวร์ อาร์ ยู ฟรอม?"',
    context: 'ชวนคุยผ่อนคลายบรรยากาศและสร้างมิตรภาพ',
    audioText: 'Where are you from?'
  },
  {
    id: 'phrase-5',
    category: 'Introduce Myself',
    english: 'Have you ever surfed before?',
    thaiMeaning: 'คุณเคยโต้คลื่นมาก่อนไหมครับ/ค่ะ?',
    thaiPhonetic: '"แฮฟ ยู เอฟ-เว่อร์ เซิร์ฟด์ บี-ฟอร์?"',
    context: 'ประเมินระดับประสบการณ์ของผู้เรียนก่อนเริ่มคลาส',
    audioText: 'Have you ever surfed before?'
  },

  // 2. Purpose of Class
  {
    id: 'phrase-6',
    category: 'Purpose of Class',
    english: 'Our main goal today is to have fun and surf safely!',
    thaiMeaning: 'เป้าหมายหลักของเราวันนี้คือ สนุกและโต้คลื่นอย่างปลอดภัย!',
    thaiPhonetic: '"เอาเออร์ เมน โกล ทู-เดย์ อิส ทู แฮฟ ฟัน แอนด์ เซิร์ฟ เซฟ-ลี่!"',
    context: 'เน้นย้ำความสนุกควบคู่กับความปลอดภัยเป็นหลัก',
    audioText: 'Our main goal today is to have fun and surf safely!'
  },
  {
    id: 'phrase-7',
    category: 'Purpose of Class',
    english: 'This first lesson is all about safety, fun, and catching your first wave!',
    thaiMeaning: 'บทเรียนแรกนี้เน้นเรื่องความปลอดภัย ความสนุก และการจับคลื่นลูกแรก!',
    thaiPhonetic: '"ดิส เฟิร์สท์ เลส-ซัน อิส ออล อะเบาต์ เซฟ-ที, ฟัน, แอนด์ แคช-ชิ่ง ยัวร์ เฟิร์สท์ เวฟ!"',
    context: 'สร้างความตื่นเต้นและตั้งเป้าหมายในบทเรียนแรก',
    audioText: 'This first lesson is all about safety, fun, and catching your first wave!'
  },
  {
    id: 'phrase-8',
    category: 'Purpose of Class',
    english: 'We want you to have a great time and come back safely to the beach.',
    thaiMeaning: 'เราอยากให้คุณมีความสุขและกลับเข้าฝั่งได้อย่างปลอดภัยครับ/ค่ะ',
    thaiPhonetic: '"วี วอนท์ ยู ทู แฮฟ อะ เกรท ไทม์ แอนด์ คัม แบ็ค เซฟ-ลี่ ทู เดอะ บีช"',
    context: 'แสดงความห่วงใยและเน้นย้ำความปลอดภัยตลอดคาบเรียน',
    audioText: 'We want you to have a great time and come back safely to the beach.'
  },

  // 3. Theory Lesson
  {
    id: 'phrase-9',
    category: 'Theory Lesson',
    english: 'Our beach theory lesson will take around 30 minutes.',
    thaiMeaning: 'การเรียนทฤษฎีบนชายหาดจะใช้เวลาประมาณ 30 นาทีครับ/ค่ะ',
    thaiPhonetic: '"เอาเออร์ บีช ธี-โอ-รี เลส-ซัน วิล เทค อะราวน์ด เซอร์-ที มิน-นิทส์"',
    context: 'แจ้งกรอบเวลาทฤษฎีบนฝั่งให้นักเรียนรับทราบ',
    audioText: 'Our beach theory lesson will take around 30 minutes.'
  },
  {
    id: 'phrase-10',
    category: 'Theory Lesson',
    english: 'We will learn basic surfing skills and ocean safety.',
    thaiMeaning: 'เราจะเรียนรู้ทักษะการโต้คลื่นพื้นฐานและความปลอดภัยในทะเล',
    thaiPhonetic: '"วี วิล เลิร์น เบ-สิค เซิร์ฟ-ฟิ่ง สกิลส์ แอนด์ โอ-เชียน เซฟ-ที"',
    context: 'สรุปหัวข้อความรู้ที่จะได้เรียนบนหาด',
    audioText: 'We will learn basic surfing skills and ocean safety.'
  },
  {
    id: 'phrase-11',
    category: 'Theory Lesson',
    english: 'We will practice four things: surfboard parts, your stance, the pop-up, and communication.',
    thaiMeaning: 'เราจะฝึก 4 เรื่อง: ส่วนประกอบบอร์ด, ท่ายืน, การป๊อปอัพ และการสื่อสาร',
    thaiPhonetic: '"วี วิล แพรค-ทิส ฟอร์ ธิงส์: เซิร์ฟ-บอร์ด พาร์ทส์, ยัวร์ สแตนซ์, เดอะ ป๊อป-อัพ, แอนด์ คอม-มิวนิ-เค-ชัน"',
    context: 'ไล่เรียง 4 สเต็ปหลักบนชายหาดให้เข้าใจง่าย',
    audioText: 'We will practice four things: surfboard parts, your stance, the pop-up, and communication.'
  },
  {
    id: 'phrase-12',
    category: 'Theory Lesson',
    english: 'First we practice on the sand, then we go into the water.',
    thaiMeaning: 'เราจะฝึกบนทรายก่อน แล้วค่อยลงน้ำกันครับ/ค่ะ',
    thaiPhonetic: '"เฟิร์สท์ วี แพรค-ทิส ออน เดอะ แซนด์, เดน วี โก อิน-ทู เดอะ วอ-เทอร์"',
    context: 'บอกลำดับขั้นตอนการเรียนจากบนหาดสู่ในน้ำ',
    audioText: 'First we practice on the sand, then we go into the water.'
  },

  // 4. Wave Condition
  {
    id: 'phrase-13',
    category: 'Wave Condition',
    english: 'The weather is great today!',
    thaiMeaning: 'อากาศวันนี้ดีมากครับ/ค่ะ!',
    thaiPhonetic: '"เดอะ เวท-เธอร์ อิส เกรท ทู-เดย์!"',
    context: 'บอกสภาพอากาศที่ดีเพื่อสร้างพลังบวก',
    audioText: 'The weather is great today!'
  },
  {
    id: 'phrase-14',
    category: 'Wave Condition',
    english: 'Don\'t worry about the rain, we are getting wet anyway!',
    thaiMeaning: 'ไม่ต้องกังวลเรื่องฝนตกครับ เราก็เปียกน้ำอยู่ดี!',
    thaiPhonetic: '"โดนท์ วอร์-รี อะเบาต์ เดอะ เรน, วี อาร์ เก็ต-ติ้ง เว็ต เอ-นี-เวย์!"',
    context: 'พูดให้กำลังใจผ่อนคลายความกังวลเมื่อมีฝนตกปรอยๆ',
    audioText: 'Don\'t worry about the rain, we are getting wet anyway!'
  },
  {
    id: 'phrase-15',
    category: 'Wave Condition',
    english: 'The waves are nice and strong today, great for practicing!',
    thaiMeaning: 'คลื่นวันนี้แรงดี เหมาะกับการฝึกซ้อมมากครับ/ค่ะ',
    thaiPhonetic: '"เดอะ เวฟส์ อาร์ ไนซ์ แอนด์ สตรอง ทู-เดย์, เกรท ฟอร์ แพรค-ทิส-สิ่ง!"',
    context: 'อธิบายสภาวะคลื่นแรงในเชิงบวกสำหรับการฝึกซ้อม',
    audioText: 'The waves are nice and strong today, great for practicing!'
  },
  {
    id: 'phrase-16',
    category: 'Wave Condition',
    english: 'The waves are perfect for beginners today!',
    thaiMeaning: 'คลื่นวันนี้สมบูรณ์แบบสำหรับผู้เริ่มต้นมากครับ!',
    thaiPhonetic: '"เดอะ เวฟส์ อาร์ เพอร์-เฟ็คท์ ฟอร์ บี-กิน-เนอร์ส ทู-เดย์!"',
    context: 'สร้างความมั่นใจให้นักเรียนใหม่ว่าคลื่นเล่นง่าย',
    audioText: 'The waves are perfect for beginners today!'
  },
  {
    id: 'phrase-17',
    category: 'Wave Condition',
    english: 'There is a slight current, so please stay close to me.',
    thaiMeaning: 'วันนี้มีกระแสน้ำเล็กน้อย ให้พายอยู่ใกล้ๆ ครูไว้นะครับ',
    thaiPhonetic: '"แดร์ อิส อะ สไลท์ เคอ-เรินท์, โซ พลีส สเตย์ โคลส ทู มี"',
    context: 'เตือนนักเรียนเรื่องกระแสน้ำและให้เกาะกลุ่มใกล้โค้ช',
    audioText: 'There is a slight current, so please stay close to me.'
  },

  // 5. Lineup & Health Concern
  {
    id: 'phrase-18',
    category: 'Lineup & Health Concern',
    english: 'We are staying in shallow water today, not going deep.',
    thaiMeaning: 'วันนี้เราจะเล่นในน้ำตื้น จะไม่ไปในน้ำลึกครับ/ค่ะ',
    thaiPhonetic: '"วี อาร์ สเตย์-อิ้ง อิน แชล-โลว์ วอ-เทอร์ ทู-เดย์, น็อต โก-อิ้ง ดีพ"',
    context: 'ให้ความมั่นใจแก่นักเรียนที่กลัวน้ำลึก',
    audioText: 'We are staying in shallow water today, not going deep.'
  },
  {
    id: 'phrase-19',
    category: 'Lineup & Health Concern',
    english: 'The water level is around waist-deep so you can always stand up.',
    thaiMeaning: 'น้ำลึกประมาณระดับเอว คุณสามารถยืนแตะพื้นได้ตลอดเวลา',
    thaiPhonetic: '"เดอะ วอ-เทอร์ เล-เวิล อิส อะราวน์ด เวสท์-ดีพ โซ ยู แคน ออล-เวย์ส สแตนด์ อัพ"',
    context: 'อธิบายระดับน้ำชัดเจนว่ายืนถึงพื้นเสมอ',
    audioText: 'The water level is around waist-deep so you can always stand up.'
  },
  {
    id: 'phrase-20',
    category: 'Lineup & Health Concern',
    english: 'We will practice in the whitewater (broken waves).',
    thaiMeaning: 'เราจะฝึกกันในคลื่นฟองขาว (คลื่นที่แตกตัวแล้ว)',
    thaiPhonetic: '"วี วิล แพรค-ทิส อิน เดอะ ไวท์-วอ-เทอร์"',
    context: 'อธิบายพื้นที่ซ้อมหลักสำหรับผู้เรียนครั้งแรก',
    audioText: 'We will practice in the whitewater.'
  },
  {
    id: 'phrase-21',
    category: 'Lineup & Health Concern',
    english: 'Do you have any medical conditions, injuries, or surgeries I should know about?',
    thaiMeaning: 'คุณมีโรคประจำตัว บาดแผล หรือเคยผ่าตัดที่ครูควรทราบไหมครับ/ค่ะ?',
    thaiPhonetic: '"ดู ยู แฮฟ เอ-นี เม-ดิ-เคิล คอน-ดิ-ชันส์, อิน-จู-รีส์, ออร์ เซอร์-เจอร์-รีส์ ไอ ชูด โน อะเบาต์?"',
    context: 'ซักถามประวัติสุขภาพและปัญหาร่างกายเพื่อความปลอดภัยสูงสุด',
    audioText: 'Do you have any medical conditions, injuries, or surgeries I should know about?'
  },
  {
    id: 'phrase-22',
    category: 'Lineup & Health Concern',
    english: 'Can you swim? / Do you wear contact lenses?',
    thaiMeaning: 'คุณว่ายน้ำเป็นไหม? / คุณใส่คอนแทคเลนส์ไหมครับ?',
    thaiPhonetic: '"แคน ยู สวิม? / ดู ยู แวร์ คอน-แท็ค เลน-เสส?"',
    context: 'ประเมินทักษะการว่ายน้ำและการเตรียมตัวเรื่องสายตา',
    audioText: 'Can you swim? Do you wear contact lenses?'
  },
  {
    id: 'phrase-23',
    category: 'Lineup & Health Concern',
    english: 'If you feel tired, cold, or unwell, please tell me anytime.',
    thaiMeaning: 'ถ้าคุณรู้สึกเหนื่อย หนาว หรือไม่สบายตัว ให้บอกครูได้ตลอดเวลาเลยนะครับ',
    thaiPhonetic: '"อิฟ ยู ฟีล ไท-เออร์ด, โคลด์, ออร์ อัน-เวล, พลีส เทล มี เอ-นี-ไทม์"',
    context: 'เปิดโอกาสให้นักเรียนแจ้งสื่อสารความผิดปกติของร่างกายได้ตลอดเวลา',
    audioText: 'If you feel tired, cold, or unwell, please tell me anytime.'
  }
];
