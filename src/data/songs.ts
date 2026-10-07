export interface Song {
  id: string
  title: string
  description: string
  youtubeId: string
}

export const songs: Song[] = [
  {
    id: 'figa-medley',
    title: 'מחרוזת פיגה',
    description: 'מחרוזת פיגה — לצפייה ולהאזנה דרך YouTube.',
    youtubeId: 'O4NNTlaoBi8',
  },
  {
    id: 'bom-pam-oseksizim',
    title: 'מחרוזת בומפם, אוסקסיזים',
    description: 'מחרוזת בומפם, אוסקסיזים — לצפייה ולהאזנה דרך YouTube.',
    youtubeId: 'YnhANi6wFZg',
  },
  {
    id: 'manolia-ligo-ligo',
    title: 'מחרוזת: מנוליה, ליגו ליגו',
    description: 'מחרוזת מנוליה וליגו ליגו — לצפייה ולהאזנה דרך YouTube.',
    youtubeId: 'mPRpXih2A7o',
  },
]
