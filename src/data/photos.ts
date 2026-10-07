export interface Photo {
  file: string
  alt: string
  caption: string
  width: number
  height: number
}

export const photos = {
  bouzouki: { file: 'elianis-bouzouki.jpg', alt: 'אליאניס מחזיק בוזוקי לצד מיקרופון', caption: 'אליאניס והבוזוקי', width: 1086, height: 1448 },
  sunset: { file: 'bouzouki-sunset.png', alt: 'אליאניס מנגן בבוזוקי על רקע שקיעה', caption: 'אהבת הנגינה', width: 1235, height: 1274 },
  rabbi: { file: 'rabbi-portrait.png', alt: 'רבי אליהו מזרחי ז״ל בכובע ובטלית', caption: 'רבי אליהו מזרחי ז״ל', width: 1448, height: 1086 },
  couple: { file: 'family-couple.png', alt: 'תמונה זוגית מתוך האלבום המשפחתי', caption: 'רגעים יחד', width: 1536, height: 1024 },
  home: { file: 'family-home.png', alt: 'בניין מגורים צהוב עם מרפסות וגינה', caption: 'מן האלבום המשפחתי', width: 1086, height: 1448 },
  family: { file: 'family.png', alt: 'אליהו ובני המשפחה בתמונה משותפת', caption: 'המשפחה והמורשת', width: 1583, height: 993 },
  tribute: { file: 'tribute.png', alt: 'פריט הוקרה ממוסגר עם סמל ארגון השוטרים הבינלאומי', caption: 'פריט הוקרה מן האלבום המשפחתי', width: 1518, height: 1036 },
  singer: { file: 'singer.jpg', alt: 'אדם שר אל מיקרופון בתמונה מתוך האלבום המשפחתי', caption: 'רגע של שירה', width: 1086, height: 1448 },
  torah: { file: 'torah-gathering.png', alt: 'מפגש סביב שולחן מול מדפי ספרי קודש', caption: 'תורה, קהילה וחסד', width: 1490, height: 1055 },
  later: { file: 'bouzouki-later.png', alt: 'אליהו עם הבוזוקי במרפסת בשנותיו המאוחרות', caption: 'הניגון מלווה את הדרך', width: 1254, height: 1254 },
  album: { file: 'album-cover.png', alt: 'עטיפת נוסטלגיה יוונית של אליאניס עם תמונתו והבוזוקי', caption: 'נוסטלגיה יוונית — עטיפת האלבום', width: 1034, height: 1521 },
} satisfies Record<string, Photo>
