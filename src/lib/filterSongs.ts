import type { Song } from '../data/songs'

export function filterSongs(songs: readonly Song[], query: string, favoritesOnly: boolean, favoriteIds: readonly string[]): Song[] {
  const searchText = query.trim().toLocaleLowerCase('he')
  return songs.filter((song) =>
    `${song.title} ${song.description}`.toLocaleLowerCase('he').includes(searchText)
      && (!favoritesOnly || favoriteIds.includes(song.id)),
  )
}
