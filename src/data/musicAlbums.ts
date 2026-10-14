// bandcamp album data for the music page
export interface MusicAlbum {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  albumUrl: string;
}

export const musicAlbums: MusicAlbum[] = [
  {
    id: '44696348',
    title: 'Motorslice (Original Soundtrack)',
    artist: 'Pizza Hotline',
    coverUrl: 'https://f4.bcbits.com/img/a3714087150_10.jpg',
    albumUrl: 'https://pizzahotline.bandcamp.com/album/motorslice-ost',
  },
  {
    id: '441884888',
    title: 'Crypt of the Necrodancer (Original Soundtrack)',
    artist: 'Derek B. Smith',
    coverUrl: 'https://f4.bcbits.com/img/a2187335077_1x1_700.avif',
    albumUrl: 'https://dbsoundworks.bandcamp.com/album/crypt-of-the-necrodancer-ost',
  },
  {
    id: '2166183303',
    title: 'Vampire Survivors Vol. 1 (Original Soundtrack)',
    artist: 'Laced Records',
    coverUrl: 'https://f4.bcbits.com/img/a3090449752_1x1_700.avif',
    albumUrl: 'https://lacedrecords.bandcamp.com/album/vampire-survivors-vol-1-original-soundtrack-1',
  },

  {
    id: '1420100316',
    title: 'Plants vs. Zombies Soundtrack',
    artist: 'Laura Shigihara',
    coverUrl: 'https://f4.bcbits.com/img/a4086158012_1x1_700.avif',
    albumUrl: 'https://laurashigihara.bandcamp.com/album/plants-vs-zombies-soundtrack',
  },
  {
    id: '1349219244',
    title: 'Minecraft - Volume Alpha',
    artist: 'C418',
    coverUrl: 'https://f4.bcbits.com/img/a3390257927_1x1_700.avif',
    albumUrl: 'https://c418.bandcamp.com/album/minecraft-volume-alpha',
  },
  {
    id: '551760206',
    title: 'Minecraft - Volume Beta',
    artist: 'C418',
    coverUrl: 'https://f4.bcbits.com/img/a1112985681_1x1_700.avif',
    albumUrl: 'https://c418.bandcamp.com/album/minecraft-volume-beta',
  },

  {
    id: '1525965313',
    title: 'Cuphead (Original Soundtrack)',
    artist: 'Studio MDHR',
    coverUrl: 'https://f4.bcbits.com/img/a2164104584_1x1_700.avif',
    albumUrl: 'https://studiomdhr.bandcamp.com/album/cuphead-original-soundtrack',
  },

  {
    id: '2141448418',
    title: 'Hollow Knight (Gods Nightmares)',
    artist: 'Christopher Larkin',
    coverUrl: 'https://f4.bcbits.com/img/a854956843_1x1_700.avif',
    albumUrl: 'https://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares',
  },
  {
    id: '2861197113',
    title: 'Hollow Knight: Silksong',
    artist: 'Christopher Larkin',
    coverUrl: 'https://f4.bcbits.com/img/a2085224863_2.jpg',
    albumUrl: 'https://christopherlarkin.bandcamp.com/album/hollow-knight-silksong-original-soundtrack',
  },
  {
    id: '2136659789',
    title: 'Smash Hit OST',
    artist: 'Douglas Holmquist',
    coverUrl: 'https://f4.bcbits.com/img/a2540284740_2.jpg',
    albumUrl: 'https://douglasholmquist.bandcamp.com/album/smash-hit-ost',
  },

];

export function bandcampEmbedSrc(albumId: string): string {
  return `https://bandcamp.com/EmbeddedPlayer/album=${albumId}/size=large/bgcol=faf3ea/linkcol=4b3a7a/tracklist=false/artwork=none/`;
}

export function bandcampBrowseSrc(albumId: string): string {
  return `https://bandcamp.com/EmbeddedPlayer/album=${albumId}/size=large/bgcol=faf3ea/linkcol=4b3a7a/tracklist=true/artwork=small/transparent=true/`;
}
