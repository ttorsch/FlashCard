export interface SurfVocabulary {
  id: string;
  category: string;
  english: string;
  thaiMeaning: string;
  thaiPhonetic: string;
  example: string;
  audioText: string;
  surfTip?: string;
  displayOrder?: number;
}

export const DEFAULT_CATEGORIES = [
  'Introduce Myself',
  'Purpose of Class',
  'Theory Lesson',
  'Wave Condition',
  'Lineup & Health Concern'
];

export const CATEGORIES = DEFAULT_CATEGORIES;

export const SURF_VOCABULARY: SurfVocabulary[] = [
  // 1. Introduce Myself
  {
    id: 'vocab-1',
    category: 'Introduce Myself',
    english: 'Instructor',
    thaiMeaning: 'ครูผู้สอน / โค้ชผู้ฝึกสอน',
    thaiPhonetic: 'อิน-สตรัค-เทอร์',
    example: 'I will be your surf instructor today.',
    audioText: 'Instructor. I will be your surf instructor today.',
    surfTip: 'ใช้แนะนำตัวเองสร้างความน่าเชื่อถือและความอบอุ่นให้นักเรียน'
  },
  {
    id: 'vocab-2',
    category: 'Introduce Myself',
    english: 'First',
    thaiMeaning: 'แรก / ครั้งแรก',
    thaiPhonetic: 'เฟิร์สท์',
    example: 'Is this your first time surfing?',
    audioText: 'First. Is this your first time surfing?',
    surfTip: 'เช็กประสบการณ์แรกของนักเรียนเพื่อปรับระดับบทเรียนให้เหมาะสม'
  },
  {
    id: 'vocab-3',
    category: 'Introduce Myself',
    english: 'Lesson',
    thaiMeaning: 'บทเรียน / คลาสเรียน',
    thaiPhonetic: 'เลส-ซัน',
    example: 'Welcome to your first surf lesson!',
    audioText: 'Lesson. Welcome to your first surf lesson!',
    surfTip: 'สร้างบรรยากาศบทเรียนที่เป็นกันเองและสนุกสนาน'
  },

  // 2. Purpose of Class
  {
    id: 'vocab-4',
    category: 'Purpose of Class',
    english: 'Safety',
    thaiMeaning: 'ความปลอดภัย',
    thaiPhonetic: 'เซฟ-ที',
    example: 'Safety is our top priority today.',
    audioText: 'Safety. Safety is our top priority today.',
    surfTip: 'เน้นย้ำความปลอดภัยเสมอก่อนลงน้ำ'
  },
  {
    id: 'vocab-5',
    category: 'Purpose of Class',
    english: 'Catch',
    thaiMeaning: 'จับคลื่น / โต้คลื่น',
    thaiPhonetic: 'แคช',
    example: 'Today we will help you catch your first wave!',
    audioText: 'Catch. Today we will help you catch your first wave!',
    surfTip: 'ให้เป้าหมายที่ตื่นเต้นแก่นักเรียน'
  },

  // 3. Theory Lesson
  {
    id: 'vocab-6',
    category: 'Theory Lesson',
    english: 'Theory',
    thaiMeaning: 'ทฤษฎีการโต้คลื่น',
    thaiPhonetic: 'ธี-โอ-รี',
    example: 'Our beach theory lesson takes 30 minutes.',
    audioText: 'Theory. Our beach theory lesson takes 30 minutes.',
    surfTip: 'การเรียนทฤษฎีบนฝั่งช่วยลดอุบัติเหตุในน้ำ'
  },
  {
    id: 'vocab-7',
    category: 'Theory Lesson',
    english: 'Basic',
    thaiMeaning: 'พื้นฐาน',
    thaiPhonetic: 'เบ-สิค',
    example: 'We will cover basic surfing techniques.',
    audioText: 'Basic. We will cover basic surfing techniques.',
    surfTip: 'ปูพื้นฐานการวางท่าทางที่ถูกต้อง'
  },
  {
    id: 'vocab-8',
    category: 'Theory Lesson',
    english: 'Skill',
    thaiMeaning: 'ทักษะ / ฝีมือ',
    thaiPhonetic: 'สกิล',
    example: 'Surfing requires practice and balance skills.',
    audioText: 'Skill. Surfing requires practice and balance skills.',
    surfTip: 'ฝึกทักษะการทรงตัวบนผืนทรายก่อน'
  },
  {
    id: 'vocab-9',
    category: 'Theory Lesson',
    english: 'Ocean',
    thaiMeaning: 'มหาสมุทร / ทะเล',
    thaiPhonetic: 'โอ-เชียน',
    example: 'Always respect the ocean rules and safety.',
    audioText: 'Ocean. Always respect the ocean rules and safety.',
    surfTip: 'สอนให้นักเรียนเข้าใจธรรมชาติของทะเล'
  },
  {
    id: 'vocab-10',
    category: 'Theory Lesson',
    english: 'Practice',
    thaiMeaning: 'การฝึกซ้อม / การฝึกหัด',
    thaiPhonetic: 'แพรค-ทิส',
    example: 'First we practice pop-up on the sand.',
    audioText: 'Practice. First we practice pop-up on the sand.',
    surfTip: 'การซ้อมบนฝั่งจนแม่นยำช่วยให้ยืนบนน้ำได้ง่ายขึ้น'
  },
  {
    id: 'vocab-11',
    category: 'Theory Lesson',
    english: 'Stance',
    thaiMeaning: 'ท่ายืนบนเซิร์ฟบอร์ด',
    thaiPhonetic: 'สแตนซ์',
    example: 'Keep your feet wide for a strong surfing stance.',
    audioText: 'Stance. Keep your feet wide for a strong surfing stance.',
    surfTip: 'ท่ายืนย่อเข่ากว้างระดับไหล่ช่วยการทรงตัว'
  },
  {
    id: 'vocab-12',
    category: 'Theory Lesson',
    english: 'Pop-up',
    thaiMeaning: 'การลุกขึ้นยืนบนบอร์ดรวดเดียว',
    thaiPhonetic: 'ป๊อป-อัพ',
    example: 'Pop up in one smooth continuous motion.',
    audioText: 'Pop-up. Pop up in one smooth continuous motion.',
    surfTip: 'สปริงตัวขึ้นยืนรวดเดียว ห้ามเอาเข่าแตะบอร์ด'
  },
  {
    id: 'vocab-13',
    category: 'Theory Lesson',
    english: 'Communication',
    thaiMeaning: 'การสื่อสารสัญญาณมือและเสียง',
    thaiPhonetic: 'คอม-มิวนิ-เค-ชัน',
    example: 'Hand signals are important for water communication.',
    audioText: 'Communication. Hand signals are important for water communication.',
    surfTip: 'นัดแนะสัญญาณมือกับนักเรียนให้ชัดเจน'
  },
  {
    id: 'vocab-14',
    category: 'Theory Lesson',
    english: 'Then',
    thaiMeaning: 'จากนั้น / ต่อมา',
    thaiPhonetic: 'เดน',
    example: 'First practice on sand, then go into water.',
    audioText: 'Then. First practice on sand, then go into water.',
    surfTip: 'บอกลำดับขั้นตอนการเรียนให้นักเรียนเข้าใจง่าย'
  },

  // 4. Wave Condition
  {
    id: 'vocab-15',
    category: 'Wave Condition',
    english: 'Weather',
    thaiMeaning: 'สภาพอากาศ',
    thaiPhonetic: 'เวท-เธอร์',
    example: 'The weather is warm and clear today.',
    audioText: 'Weather. The weather is warm and clear today.',
    surfTip: 'เช็กสภาพอากาศทุกครั้งก่อนเริ่มคลาส'
  },
  {
    id: 'vocab-16',
    category: 'Wave Condition',
    english: 'Rain',
    thaiMeaning: 'ฝน / ฝนตก',
    thaiPhonetic: 'เรน',
    example: 'Don\'t worry about the rain, we are getting wet anyway.',
    audioText: 'Rain. Don\'t worry about the rain, we are getting wet anyway.',
    surfTip: 'ฝนตกปรอยๆ ยังเล่นเซิร์ฟได้ปลอดภัย'
  },
  {
    id: 'vocab-17',
    category: 'Wave Condition',
    english: 'Strong',
    thaiMeaning: 'แรง / แข็งแรง',
    thaiPhonetic: 'สตรอง',
    example: 'The waves are strong today, paddle hard!',
    audioText: 'Strong. The waves are strong today, paddle hard!',
    surfTip: 'เตือนนักเรียนให้พายบอร์ดแรงขึ้นเมื่อคลื่นทรงพลัง'
  },
  {
    id: 'vocab-18',
    category: 'Wave Condition',
    english: 'Current',
    thaiMeaning: 'กระแสน้ำทะเล',
    thaiPhonetic: 'เคอ-เรินท์',
    example: 'Watch out for the ocean current on the side.',
    audioText: 'Current. Watch out for the ocean current on the side.',
    surfTip: 'สังเกตทิศทางกระแสน้ำและพายอยู่ใกล้โค้ช'
  },

  // 5. Lineup & Health Concern
  {
    id: 'vocab-19',
    category: 'Lineup & Health Concern',
    english: 'Deep',
    thaiMeaning: 'ลึก / น้ำลึก',
    thaiPhonetic: 'ดีพ',
    example: 'We are not going into deep water today.',
    audioText: 'Deep. We are not going into deep water today.',
    surfTip: 'ให้นักเรียนมั่นใจว่าฝึกในระดับน้ำปลอดภัย'
  },
  {
    id: 'vocab-20',
    category: 'Lineup & Health Concern',
    english: 'Whitewater',
    thaiMeaning: 'คลื่นฟองขาวที่แตกตัวแล้ว',
    thaiPhonetic: 'ไวท์-วอ-เทอร์',
    example: 'Beginners practice catching waves in the whitewater.',
    audioText: 'Whitewater. Beginners practice catching waves in the whitewater.',
    surfTip: 'คลื่นฟองขาวเหมาะสำหรับการฝึกครั้งแรกที่สุด'
  },
  {
    id: 'vocab-21',
    category: 'Lineup & Health Concern',
    english: 'Medical condition',
    thaiMeaning: 'สภาวะทางสุขภาพ / โรคประจำตัว',
    thaiPhonetic: 'เม-ดิ-เคิล คอน-ดิ-ชัน',
    example: 'Please inform me of any medical condition.',
    audioText: 'Medical condition. Please inform me of any medical condition.',
    surfTip: 'เช็กประวัติสุขภาพก่อนเริ่มคลาสเสมอ'
  },
  {
    id: 'vocab-22',
    category: 'Lineup & Health Concern',
    english: 'Injury',
    thaiMeaning: 'การบาดเจ็บ / บาดแผล',
    thaiPhonetic: 'อิน-จู-รี',
    example: 'Do you have any muscle or joint injury?',
    audioText: 'Injury. Do you have any muscle or joint injury?',
    surfTip: 'เช็กอาการบาดเจ็บเดิมเพื่อเลี่ยงท่าซ้อมที่อันตราย'
  },
  {
    id: 'vocab-23',
    category: 'Lineup & Health Concern',
    english: 'Surgery',
    thaiMeaning: 'การผ่าตัด',
    thaiPhonetic: 'เซอร์-เจอร์-รี',
    example: 'Have you had any recent surgery?',
    audioText: 'Surgery. Have you had any recent surgery?',
    surfTip: 'ผู้ที่เพิ่งผ่าตัดควรเลี่ยงการกระทบกระเทือน'
  },
  {
    id: 'vocab-24',
    category: 'Lineup & Health Concern',
    english: 'Swim',
    thaiMeaning: 'ว่ายน้ำ',
    thaiPhonetic: 'สวิม',
    example: 'Can you swim confidently in ocean water?',
    audioText: 'Swim. Can you swim confidently in ocean water?',
    surfTip: 'เช็กความสามารถในการว่ายน้ำเพื่อเตรียมความพร้อม'
  },
  {
    id: 'vocab-25',
    category: 'Lineup & Health Concern',
    english: 'Unwell',
    thaiMeaning: 'ไม่สบายตัว / รู้สึกไม่ดี',
    thaiPhonetic: 'อัน-เวล',
    example: 'If you feel unwell, tell me immediately.',
    audioText: 'Unwell. If you feel unwell, tell me immediately.',
    surfTip: 'ให้นักเรียนแจ้งทันทีหากมีอาการเวียนศีรษะหรือเหนื่อยหอบ'
  }
];
