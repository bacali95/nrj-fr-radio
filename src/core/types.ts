export type Radio = {
  id: string;
  name: string;
  color: string;
  logo: string;
  url_64k_aac: string;
  url_128k_mp3: string;
  url_hd_aac: string;
  awparams: string;
  playlist: RadioPlaylist[];
  slug: string;
  genres: RadioGenre[];
};

export type RadioSong = {
  id: number;
  title: string;
  artist: string;
  img_url: string;
};

export type RadioPlaylist = {
  song: RadioSong;
  end_timestamp: number;
};

export type RadioGenre = {
  label: string;
  slug: string;
};
