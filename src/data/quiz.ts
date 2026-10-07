export interface QuizQuestion {
  question: string
  options: string[]
  answer: number
  explanation: string
}

export const quizQuestions: QuizQuestion[] = [
  { question: 'באיזו עיר גדל אליאניס?', options: ['ירושלים', 'חיפה', 'תל אביב'], answer: 1, explanation: 'אליהו גדל בחיפה, בבית של מסורת ומוזיקה.' },
  { question: 'באיזה כלי נגינה התמחה?', options: ['פסנתר', 'חצוצרה', 'בוזוקי'], answer: 2, explanation: 'אחרי שלמד גיטרה, התמחה אליהו בנגינה בבוזוקי.' },
  { question: 'לאיזו קבוצת כדורגל כתב ושר שיר אליפות בשנת 1984?', options: ['מכבי חיפה', 'מכבי תל אביב', 'בית״ר ירושלים'], answer: 0, explanation: 'לפי סיפור המשפחה, אליאניס כתב ושר את שיר האליפות הראשון של מכבי חיפה.' },
  { question: 'לאן עבר בגיל 34?', options: ['אילת', 'מעלות־תרשיחא', 'באר שבע'], answer: 1, explanation: 'בגיל 34 עבר למעלות־תרשיחא וחזר בתשובה.' },
  { question: 'למה הקדיש את לילותיו?', options: ['לימוד תורה', 'אימוני כדורגל', 'לימודי צילום'], answer: 0, explanation: 'אליהו הקדיש את לילותיו ללימוד תורה, לצד עשייה של חסד והשכנת שלום.' },
]
