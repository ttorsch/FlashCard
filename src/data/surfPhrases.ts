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
  'Coaching Commands',
  'Line-up Etiquette',
  'Safety & Warnings',
  'Water Communication'
];

export const SURF_PHRASES: SurfPhrase[] = [
  {
    id: 'phrase-1',
    category: 'Coaching Commands',
    english: 'Paddle with your chest up!',
    thaiMeaning: 'พายโดยยกหน้าอกขึ้นจากบอร์ด!',
    thaiPhonetic: '"พัด-เดิล วิธ ยัวร์ เชสท์ อัพ!"',
    context: 'ช่วยถ่ายเทน้ำหนักไปด้านหลัง ป้องกันหัวบอร์ดทิ่มน้ำ (Nose dive)',
    audioText: 'Paddle with your chest up!'
  },
  {
    id: 'phrase-2',
    category: 'Coaching Commands',
    english: 'Look over your shoulder!',
    thaiMeaning: 'มองข้ามไหล่ไปข้างหลังเพื่อเช็กคลื่น!',
    thaiPhonetic: '"ลุค โอ-เว่อร์ ยัวร์ โชล-เดอร์!"',
    context: 'เช็กว่าคลื่นกำลังจะแตกตัวตรงไหนและชันพอหรือยังก่อนลุกขึ้นยืน',
    audioText: 'Look over your shoulder!'
  },
  {
    id: 'phrase-3',
    category: 'Coaching Commands',
    english: 'Pop up in one smooth motion!',
    thaiMeaning: 'ลุกขึ้นยืนในจังหวะเดียวให้ต่อเนื่อง!',
    thaiPhonetic: '"ป๊อป อัพ อิน วัน สมูธ โม-ชัน!"',
    context: 'อย่าใช้วางเข่าก่อน ให้สปริงตัวขึ้นยืนรวดเดียวเพื่อไม่ให้เสียสมดุล',
    audioText: 'Pop up in one smooth motion!'
  },
  {
    id: 'phrase-4',
    category: 'Coaching Commands',
    english: 'Bend your knees, keep your head centered.',
    thaiMeaning: 'ย่อเข่าลงและรักษาหัวให้อยู่ตรงกลางบอร์ด',
    thaiPhonetic: '"เบนด์ ยัวร์ นีส์, คีพ ยัวร์ เฮด เซน-เทอร์ด"',
    context: 'การย่อเข่าช่วยเพิ่มการยึดเกาะและทรงตัวบนคลื่นได้ดีขึ้น',
    audioText: 'Bend your knees, keep your head centered.'
  },
  {
    id: 'phrase-5',
    category: 'Coaching Commands',
    english: 'Keep your hands flat on the board under your ribs.',
    thaiMeaning: 'วางมือราบกับหน้าบอร์ดบริเวณใต้ชายโครง',
    thaiPhonetic: '"คีพ ยัวร์ แฮนดส์ แฟลต ออน เดอะ บอร์ด อัน-เดอร์ ยัวร์ ริบส์"',
    context: 'ห้ามจับขอบบอร์ด (Rails) ขณะ Pop up เพราะจะทำให้บอร์ดเอียงพลิก',
    audioText: 'Keep your hands flat on the board under your ribs.'
  },
  {
    id: 'phrase-6',
    category: 'Line-up Etiquette',
    english: 'Surfer closest to the peak has the right of way.',
    thaiMeaning: 'คนที่อยู่ใกล้จุดคลื่นแตกตัวมากที่สุดมีสิทธิโต้คลื่นก่อน',
    thaiPhonetic: '"เซิร์ฟ-เฟอร์ โคลส-เอสท์ ทู เดอะ พีค แฮส เดอะ ไรท์ ออฟ เวย์"',
    context: 'กฎพื้นฐานของ Line-up ห้ามแย่งคลื่นคนที่อยู่ด้านใน (Don\'t drop in)',
    audioText: 'Surfer closest to the peak has the right of way.'
  },
  {
    id: 'phrase-7',
    category: 'Line-up Etiquette',
    english: 'Don\'t drop in on other surfers!',
    thaiMeaning: 'อย่าแย่งตัดหน้าคนที่กำลังโต้คลื่นอยู่!',
    thaiPhonetic: '"โดนท์ ดรอป อิน ออน อัธ-เธอร์ เซิร์ฟ-เฟอร์ส!"',
    context: 'การตัดหน้าเป็นสิ่งอันตรายและเสียมารยาทอย่างมากในสังคมโต้คลื่น',
    audioText: 'Don\'t drop in on other surfers!'
  },
  {
    id: 'phrase-8',
    category: 'Line-up Etiquette',
    english: 'Wait your turn in the line-up.',
    thaiMeaning: 'รอคิวของคุณตามลำดับในจุด Line-up',
    thaiPhonetic: '"เวท ยัวร์ เทิร์น อิน เดอะ ไลน์-อัพ"',
    context: 'ห้ามพายแซงคิวคนอื่นไปรอข้างหน้าทันทีที่พายออกไปถึง (Don\'t snake)',
    audioText: 'Wait your turn in the line-up.'
  },
  {
    id: 'phrase-9',
    category: 'Safety & Warnings',
    english: 'Cover your head when you wipe out!',
    thaiMeaning: 'เอามือป้องศีรษะไว้เสมอเมื่อตกจากบอร์ด!',
    thaiPhonetic: '"คัฟ-เว่อร์ ยัวร์ เฮด เว็น ยู ไวพ์ เอาท์!"',
    context: 'ป้องกันบอร์ดกระแทกศีรษะขณะโผล่ขึ้นมาจากใต้น้ำ',
    audioText: 'Cover your head when you wipe out!'
  },
  {
    id: 'phrase-10',
    category: 'Safety & Warnings',
    english: 'Never let go of your surfboard in the impact zone.',
    thaiMeaning: 'ห้ามปล่อยบอร์ดหลุดมือเด็ดขาดในบริเวณที่คลื่นม้วนแตกตัว',
    thaiPhonetic: '"เน-เว่อร์ เล็ท โก ออฟ ยัวร์ เซิร์ฟ-บอร์ด อิน ดิ อิม-แพค โซน"',
    context: 'บอร์ดที่ลอยอิสระโดนคลื่นพัดอาจไปกระแทกผู้อื่นบาดเจ็บได้',
    audioText: 'Never let go of your surfboard in the impact zone.'
  },
  {
    id: 'phrase-11',
    category: 'Safety & Warnings',
    english: 'If caught in a rip current, paddle parallel to the shore.',
    thaiMeaning: 'หากโดนกระแสน้ำดูด ให้พายขนานไปกับแนวชายฝั่ง',
    thaiPhonetic: '"อิฟ คอท อิน อะ ริพ เคอ-เรินท์, พัด-เดิล แพ-รา-เลล ทู เดอะ ชอร์"',
    context: 'อย่าพายสวนกระแสน้ำตรงเข้าฝั่งเพราะจะหมดแรง พายขนานออกข้างก่อน',
    audioText: 'If caught in a rip current, paddle parallel to the shore.'
  },
  {
    id: 'phrase-12',
    category: 'Water Communication',
    english: 'Going left! / Going right!',
    thaiMeaning: 'กำลังจะไปทางซ้าย! / กำลังจะไปทางขวา!',
    thaiPhonetic: '"โก-อิ้ง เลฟท์! / โก-อิ้ง ไรท์!"',
    context: 'ตะโกนบอกทิศทางที่จะโต้คลื่นให้คนอื่นรู้เพื่อป้องกันการชนกัน',
    audioText: 'Going left! Going right!'
  },
  {
    id: 'phrase-13',
    category: 'Water Communication',
    english: 'Are you okay?',
    thaiMeaning: 'คุณเป็นอะไรไหม / โอเคไหม?',
    thaiPhonetic: '"อาร์ ยู โอ-เค?"',
    context: 'ควรถามเพื่อนนักโต้คลื่นเสมอเมื่อเห็นเขาล้มแรงรุนแรง (Wipeout)',
    audioText: 'Are you okay?'
  },
  {
    id: 'phrase-14',
    category: 'Water Communication',
    english: 'Outside! Big set coming!',
    thaiMeaning: 'ระวังคลื่นชุดใหญ่กำลังเข้ามาจากด้านนอก!',
    thaiPhonetic: '"เอาท์-ไซด์! บิ๊ก เซ็ท คัม-มิ่ง!"',
    context: 'ตะโกนเตือนคนใน Line-up เมื่อเห็นคลื่นชุดใหญ่กำลังเข้าม้วนตัว',
    audioText: 'Outside! Big set coming!'
  }
];
