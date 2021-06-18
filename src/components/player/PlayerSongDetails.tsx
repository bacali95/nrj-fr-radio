import React from 'react';
import { observer } from 'mobx-react';
import { Radio, RadioSong } from '../../core/types';

type Props = {
  radio?: Radio;
  song?: RadioSong;
};

const PlayerSongDetails: React.FC<Props> = observer(({ radio, song }) => {
  return (
    <div className="flex items-center">
      <img
        className="flex-none w-24 h-24 rounded-lg bg-white shadow-md"
        src={radio?.logo}
        alt={radio?.name}
      />
      <img
        className="flex-none ml-3 w-24 h-24 rounded-lg bg-white shadow-md"
        src={song?.img_url}
        alt={song?.title}
      />
      <div className="min-w-0 flex-auto ml-3 font-medium">
        <p
          className="text-red-600 dark:text-red-400 text-sm truncate"
          style={{ color: `#${radio?.color ?? 'red'}` }}
          title={`Playing on ${radio?.name}`}
        >
          Playing on <strong className="uppercase">{radio?.name}</strong>
        </p>
        <p className="text-black dark:text-white text-2xl truncate" title={song?.title}>
          {song?.title}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-base truncate" title={song?.artist}>
          {song?.artist}
        </p>
      </div>
    </div>
  );
});

export default PlayerSongDetails;
