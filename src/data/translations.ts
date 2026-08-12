export type Language = 'en' | 'th';

const en = {
  // Navigation Tabs
  tabHome: 'Home',
  tabStudy: 'Vocab',
  tabPhrases: 'Phrases',
  tabManage: 'Manage',

  // Home Screen / Landing Page
  langName: 'EN',
  welcomeTitle: 'Surf Lesson Vocabs and Phrases',
  landingHeroSub: 'Master Surf Terminology & Useful Coaching Phrases with Native Audio & Thai Phonetics',
  todayBannerTitle: 'Continue Learning',
  learnedCountLabel: 'Learned',
  totalCountLabel: 'Total Terms',
  totalPhrasesCountLabel: 'Useful Phrases',
  categoriesHeader: 'Vocabulary Categories',
  phraseCategoriesHeader: 'Phrase Categories',
  goButton: 'STUDY',
  startVocabBtn: 'Practice Vocabulary',
  startPhrasesBtn: 'Study Useful Phrases',
  featuredPhraseHeader: 'Featured Coaching Command',

  // Phrases Screen
  phrasesTitle: 'Useful Surf Phrases',
  phrasesSubtitle: 'Coaching Commands, Line-up Rules & Water Communication',
  contextTipHeader: 'Coaching Context Tip:',
  allPhrasesCategories: 'All Phrases',

  // Header & Quick Actions
  addManageCards: 'Add / Manage Cards',
  starred: 'Starred',
  mastered: 'Mastered',
  cardCount: 'Card',
  of: 'of',

  // Category Filter
  topicCategories: 'Topic Categories',
  swipeTopics: 'swipe topics →',
  allCategories: 'All Categories',

  // Flashcard Cues & Badges
  swipePrev: '← Swipe Prev',
  swipeNext: 'Swipe Next →',
  swipeOrTap: 'Swipe or Tap card',
  englishFront: 'English Front',
  thaiBack: 'Thai Back',
  tapToFlip: 'Tap to flip',
  tapToFlipBack: 'Tap to flip back',
  thaiMeaningHeader: 'ความหมาย (Thai Meaning)',
  thaiPhoneticHeader: 'คำอ่านออกเสียง (Thai Phonetic)',
  exampleSentenceHeader: 'Example Sentence',
  surfTipHeader: 'Surf Instructor Tip:',
  thaiTranslationBadge: 'คำแปลภาษาไทย',
  englishTerminologyBadge: 'ENGLISH SURF TERMINOLOGY',
  englishPhraseBadge: 'ENGLISH SURF PHRASE',
  listenAudio: 'Listen Audio',
  speaking: 'Speaking...',

  // Controls
  prev: 'Prev',
  next: 'Next',
  shuffle: 'Shuffle',
  speed: 'Speed:',
  swipeNotice: 'Swipe left/right to change card',
  speedSlow: '0.8x Slow',
  speedNormal: '1.0x Normal',
  speedFast: '1.2x Fast',

  // Empty State
  noBookmarkedTitle: 'No Bookmarked Cards',
  noBookmarkedDesc: "You haven't bookmarked any cards in this category yet. Click the bookmark icon on any card to save it for quick review!",
  viewAllCards: 'View All Cards',

  // Pin Modal
  enterPinTitle: 'Enter Admin PIN',
  enterPinDesc: 'Please enter your PIN to manage flashcards & phrases',
  enterPinPlaceholder: 'Enter PIN...',
  unlockManager: 'Unlock Manager',
  incorrectPin: 'Incorrect PIN. Please try again.',

  // Card Manager Modal
  managerTitle: 'Flashcard & Phrase Manager',
  totalCards: 'Total Cards:',
  categoriesCount: 'Categories:',
  tabAllCards: 'All Cards',
  tabAddCard: 'Add Card',
  tabEditCard: 'Edit Card',
  tabCategories: 'Categories',
  resetDefaults: 'Reset Defaults',
  searchPlaceholder: 'Search cards by English, Thai, or Category...',
  noCardsFound: 'No flashcards found matching your search.',
  createCardTitle: 'Create New Flashcard',
  editCardTitle: 'Editing:',
  categoryLabel: 'Category *',
  englishLabel: 'English Word / Phrase *',
  thaiMeaningLabel: 'Thai Meaning *',
  thaiPhoneticLabel: 'Thai Phonetic Pronunciation',
  exampleLabel: 'Example Sentence / Context',
  surfTipLabel: 'Surf Tip (Thai advice)',
  audioTextLabel: 'Audio Text (Read Aloud Voice Text)',
  cancel: 'Cancel',
  saveCard: 'Save Card',
  updateCard: 'Update Card',
  addNewCategory: 'Add New Category',
  addCategoryPlaceholder: 'e.g. Longboard Tricks, Surf Wax & Fins...',
  addBtn: 'Add',
  existingCategories: 'Existing Categories'
};

export type TranslationKeys = typeof en;

const th: TranslationKeys = {
  // Navigation Tabs
  tabHome: 'หน้าแรก',
  tabStudy: 'คำศัพท์',
  tabPhrases: 'ประโยคใช้งาน',
  tabManage: 'จัดการ',

  // Home Screen / Landing Page
  langName: 'TH',
  welcomeTitle: 'คำศัพท์และประโยคสำหรับการเรียนเซิร์ฟ',
  landingHeroSub: 'เรียนรู้คำศัพท์โต้คลื่นและประโยคคำสั่งสอนโต้คลื่น พร้อมคำอ่านออกเสียงภาษาไทยและเสียงเจ้าของภาษา',
  todayBannerTitle: 'เรียนต่อจากเดิม',
  learnedCountLabel: 'เรียนรู้แล้ว',
  totalCountLabel: 'คำศัพท์ทั้งหมด',
  totalPhrasesCountLabel: 'ประโยคใช้งาน',
  categoriesHeader: 'หมวดหมู่คำศัพท์',
  phraseCategoriesHeader: 'หมวดหมู่ประโยคใช้งาน',
  goButton: 'เริ่มเรียน',
  startVocabBtn: 'ฝึกคำศัพท์โต้คลื่น',
  startPhrasesBtn: 'ฝึกประโยคติดปาก',
  featuredPhraseHeader: 'ประโยคคำสั่งสอนโต้คลื่นยอดฮิต',

  // Phrases Screen
  phrasesTitle: 'ประโยคใช้งานโต้คลื่น',
  phrasesSubtitle: 'คำสั่งสอน กฎ Line-up และการสื่อสารในน้ำ',
  contextTipHeader: 'บริบทและเทคนิคจากโค้ช:',
  allPhrasesCategories: 'ประโยคทั้งหมด',

  // Header & Quick Actions
  addManageCards: 'เพิ่ม / จัดการการ์ด',
  starred: 'ติดดาว',
  mastered: 'เรียนรู้แล้ว',
  cardCount: 'การ์ดใบที่',
  of: 'จาก',

  // Category Filter
  topicCategories: 'หมวดหมู่หัวข้อ',
  swipeTopics: 'ปัดดูหมวดหมู่ →',
  allCategories: 'หมวดหมู่ทั้งหมด',

  // Flashcard Cues & Badges
  swipePrev: '← ปัดก่อนหน้า',
  swipeNext: 'ปัดถัดไป →',
  swipeOrTap: 'ปัดหรือแตะการ์ด',
  englishFront: 'ด้านหน้า (อังกฤษ)',
  thaiBack: 'ด้านหลัง (ไทย)',
  tapToFlip: 'แตะการ์ดเพื่อดูคำแปล',
  tapToFlipBack: 'แตะเพื่อพลิกกลับ',
  thaiMeaningHeader: 'ความหมาย (Thai Meaning)',
  thaiPhoneticHeader: 'คำอ่านออกเสียง (Thai Phonetic)',
  exampleSentenceHeader: 'ประโยคตัวอย่าง (Example Sentence)',
  surfTipHeader: 'คำแนะนำจากผู้สอน:',
  thaiTranslationBadge: 'คำแปลภาษาไทย',
  englishTerminologyBadge: 'คำศัพท์โต้คลื่นภาษาอังกฤษ',
  englishPhraseBadge: 'ประโยคโต้คลื่นภาษาอังกฤษ',
  listenAudio: 'ฟังเสียงอ่าน',
  speaking: 'กำลังเล่นเสียง...',

  // Controls
  prev: 'ก่อนหน้า',
  next: 'ถัดไป',
  shuffle: 'สุ่มการ์ด',
  speed: 'ความเร็วเสียง:',
  swipeNotice: 'ปัดซ้ายขวาเพื่อเปลี่ยนการ์ด',
  speedSlow: '0.8x ช้า',
  speedNormal: '1.0x ปกติ',
  speedFast: '1.2x เร็ว',

  // Empty State
  noBookmarkedTitle: 'ไม่มีการ์ดที่ติดดาว',
  noBookmarkedDesc: 'คุณยังไม่ได้ติดดาวการ์ดใดๆ ในหมวดหมู่นี้ กดไอคอนบุ๊กมาร์กบนการ์ดเพื่อบันทึกไว้ทบทวน!',
  viewAllCards: 'ดูการ์ดทั้งหมด',

  // Pin Modal
  enterPinTitle: 'ใส่ PIN ผู้ดูแล',
  enterPinDesc: 'กรุณากรอก รหัส PIN เพื่อเข้าสู่หน้าจัดการการ์ด',
  enterPinPlaceholder: 'ใส่ PIN...',
  unlockManager: 'ปลดล็อกผู้จัดการการ์ด',
  incorrectPin: 'รหัส PIN ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',

  // Card Manager Modal
  managerTitle: 'ระบบจัดการการ์ดและหมวดหมู่',
  totalCards: 'การ์ดทั้งหมด:',
  categoriesCount: 'หมวดหมู่:',
  tabAllCards: 'การ์ดทั้งหมด',
  tabAddCard: 'เพิ่มการ์ด',
  tabEditCard: 'แก้ไขการ์ด',
  tabCategories: 'หมวดหมู่',
  resetDefaults: 'คืนค่าเริ่มต้น',
  searchPlaceholder: 'ค้นหาคำศัพท์...',
  noCardsFound: 'ไม่พบการ์ดตรงตามคำค้นหา',
  createCardTitle: 'สร้างแฟลชการ์ดใหม่',
  editCardTitle: 'กำลังแก้ไข:',
  categoryLabel: 'หมวดหมู่ *',
  englishLabel: 'คำศัพท์ภาษาอังกฤษ *',
  thaiMeaningLabel: 'ความหมายภาษาไทย *',
  thaiPhoneticLabel: 'คำอ่านออกเสียงภาษาไทย',
  exampleLabel: 'ประโยคตัวอย่าง',
  surfTipLabel: 'เทคนิคการโต้คลื่น (คำแนะนำ)',
  audioTextLabel: 'ข้อความเสียงอ่าน (Audio Text)',
  cancel: 'ยกเลิก',
  saveCard: 'บันทึกการ์ด',
  updateCard: 'อัปเดตการ์ด',
  addNewCategory: 'เพิ่มหมวดหมู่ใหม่',
  addCategoryPlaceholder: 'เช่น ท่า Longboard, แว็กซ์และฟิน...',
  addBtn: 'เพิ่ม',
  existingCategories: 'หมวดหมู่ที่มีอยู่'
};

export const TRANSLATIONS: Record<Language, TranslationKeys> = {
  en,
  th
};
