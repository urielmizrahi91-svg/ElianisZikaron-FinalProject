export interface Song {
  id: string
  title: string
  description: string
  youtubeId?: string
  links?: { label: string; url: string }[]
}

const collectionOne = { label: 'Amazon Music — נוסטלגיה יוונית אוסף 1', url: 'https://music.amazon.in/albums/B09DZ1S8W5' }
const collectionTwo = { label: 'Amazon Music — נוסטלגיה יוונית אוסף 2', url: 'https://music.amazon.in/albums/B09DZ52YXT' }

export const artistLinks = [
  { label: 'Apple Music', url: 'https://music.apple.com/th/artist/%D7%90%D7%9C%D7%99%D7%90%D7%A0%D7%99%D7%A1/943710990?l=th' },
  { label: 'Amazon Music', url: 'https://music.amazon.in/artists/B00PWCRPS6/%D7%90%D7%9C%D7%99%D7%90%D7%A0%D7%99%D7%A1' },
  { label: 'Audiomack', url: 'https://audiomack.com/lynys' },
]

export const songs: Song[] = [
  {
    id: 'figa-medley',
    title: 'מחרוזת פיגה',
    description: 'מחרוזת יוונית מרכזית בדרכו המוזיקלית של אליאניס, כפי שמתארת המשפחה. לצפייה ולהאזנה דרך YouTube.',
    youtubeId: 'O4NNTlaoBi8',
    links: [collectionOne, { label: 'Amazon Music — הלהיטים הגדולים ביוונית', url: 'https://music.amazon.in/albums/B00PWCISY6' }],
  },
  {
    id: 'bom-pam-oseksizim',
    title: 'מחרוזת בומפם, אוסקסיזים',
    description: 'מחרוזת המשלבת את בומפם ואוסקסיזים, מתוך הרפרטואר היווני של אליאניס. לצפייה ולהאזנה דרך YouTube.',
    youtubeId: 'YnhANi6wFZg',
    links: [collectionOne],
  },
  {
    id: 'manolia-ligo-ligo',
    title: 'מחרוזת: מנוליה, ליגו ליגו',
    description: 'מחרוזת מנוליה וליגו ליגו — לצפייה ולהאזנה דרך YouTube.',
    youtubeId: 'mPRpXih2A7o',
    links: [collectionTwo],
  },
  {
    id: 'smile-brother',
    title: 'תחייך אחי / Χαμογέλα αδερφέ.',
    description: 'סינגל של אליאניס, משנת 2025.',
    links: [
      { label: 'Spotify', url: 'https://open.spotify.com/album/1LoFVPZwkoB3qTBV3oD9ri' },
      { label: 'Apple Music', url: 'https://music.apple.com/us/album/1796337619' },
      { label: 'Amazon Music', url: 'https://music.amazon.in/albums/B0DWSBVYGF' },
      { label: 'DistroKid — כל פלטפורמות ההאזנה', url: 'https://distrokid.com/hyperfollow/577/----' },
    ],
  },
  {
    id: 'mothers-child', title: 'ילד של אמא', description: 'סינגל של אליאניס.',
    links: [{ label: 'Amazon Music', url: 'https://music.amazon.in/albums/B09D2DY655' }],
  },
  {
    id: 'light-in-your-eyes', title: 'האור בעינייך', description: 'סינגל של אליאניס.',
    links: [{ label: 'Amazon Music', url: 'https://music.amazon.in/albums/B09D2PZYHN' }],
  },
  ...([
    ['matia-mou', 'מחרוזת: מתייה מו'],
    ['o-baglama', 'מחרוזת: או בגלמה'],
    ['afilotimi', 'מחרוזת: אפילוטימי'],
    ['tha-sou-fero', 'מחרוזת: תסו פרו'],
    ['ametafos', 'מחרוזת: אמטפוס'],
    ['ikosi-ena', 'מחרוזת: איקוס אנא'],
    ['zitiano-mi', 'זיתייאנו מי'],
    ['erota-mou', 'מחרוזת: ארוטה מו'],
  ] as const).map(([id, title]) => ({
    id, title, description: 'מתוך האלבום נוסטלגיה יוונית אוסף 1. הקישור מוביל לאלבום.', links: [collectionOne],
  })),
  ...([
    ['mimolta', 'מחרוזת: מימולטה'],
    ['tiki-tiki', 'מחרוזת: תיקי תיקי'],
    ['palmakia', 'מחרוזת: פלמקיה'],
    ['kato-afto', 'מחרוזת קטו אפטו'],
    ['ola-kala', 'מחרוזת: אולה קלה'],
    ['iparcho', 'מחרוזת: איפרכו'],
    ['kakokai', 'מחרוזת: ככוקאי'],
    ['rebetiko', 'מחרוזת: רבטיקו'],
    ['den-ftanis', 'מחרוזת: דנפטניס'],
  ] as const).map(([id, title]) => ({
    id, title, description: 'מתוך האלבום נוסטלגיה יוונית אוסף 2. הקישור מוביל לאלבום.',
    links: id === 'palmakia'
      ? [collectionTwo, { label: 'Amazon Music — הלהיטים הגדולים ביוונית', url: 'https://music.amazon.in/albums/B00PWCISY6' }, { label: 'Qobuz — הלהיטים הגדולים ביוונית', url: 'https://www.qobuz.com/be-nl/album/-/q58cok8021ijb' }, { label: 'Apple Music — הלהיטים הגדולים ביוונית', url: 'https://music.apple.com/us/album/943710912' }]
      : [collectionTwo],
  })),
]
