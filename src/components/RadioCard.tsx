import * as React from 'react';
import classNames from 'classnames';
import { RootStore } from '../core/stores/rootStore';
import { getCurrentSong, injectAndObserve } from '../core/utils';
import { Radio } from '../core/types';
import SVG from './SVG';

type RadioCardProps = {
  radio: Radio;
  store?: RootStore;
};

const RadioCard: React.FC<RadioCardProps> = injectAndObserve(({ radio, store }) => {
  const { radio: selectedRadio, paused, setPaused, setRadio } = store!.playerState;
  const song = getCurrentSong(radio) ?? radio.playlist[radio.playlist.length - 1].song;

  const onClick = () => (radio.id === selectedRadio?.id ? setPaused(!paused) : setRadio(radio));

  return (
    <div
      key={radio.id}
      className="flex flex-col rounded-lg bg-gray-200 dark:bg-gray-900 p-3 items-center text-center shadow-md"
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className="w-full mb-2 relative" onClick={onClick}>
        <img
          className="w-full rounded-lg bg-red-800 shadow-md"
          src={song.img_url}
          alt={song.artist}
          onError={(event): void => {
            event.currentTarget.src =
              'https://img.nrj.fr/Ppd0h9o-tQTDYhph80b61ZMEfrI=/https%3A%2F%2Fplayers.nrjaudio.fm%2Flive-metadata%2Fplayer%2Fimg%2F200x%2FNRJ-default_173_173.png';
          }}
        />
        <img
          className="w-1/4 rounded-md bg-white shadow-md absolute top-2 left-2 z-10"
          src={radio.logo}
          alt={radio.name}
        />
        <div
          className={classNames(
            'flex text-white items-center justify-center w-full h-full rounded-lg absolute top-0 transition-colors duration-500 cursor-pointer',
            {
              'opacity-0 hover:opacity-100 hover:bg-opacity-50 hover:bg-gray-900':
                radio.id !== selectedRadio?.id,
              'bg-opacity-50 bg-gray-900': radio.id === selectedRadio?.id,
            }
          )}
        >
          {radio.id !== selectedRadio?.id || paused ? <SVG.CardPlayButton /> : <SVG.AnimatedBars />}
        </div>
      </div>
      <div className="max-w-full">
        <div className="font-semibold truncate" title={song.title}>
          {song.title}
        </div>
        <div className="text-gray-500 font-medium truncate" title={song.artist}>
          {song.artist}
        </div>
      </div>
    </div>
  );
});

export default RadioCard;
