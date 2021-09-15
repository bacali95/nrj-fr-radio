import React, { useEffect } from 'react';

import { injectAndObserve } from '../../core/utils';
import { RootStore } from '../../core/stores/rootStore';
import PlayerSongDetails from './PlayerSongDetails';
import PlayerSongControls from './PlayerSongControls';
import PlayerSongExtraControls from './PlayerSongExtraControls';

type Props = {
  store?: RootStore;
};

const Player: React.FC<Props> = injectAndObserve(({ store }) => {
  const { darkMode, playerState } = store!;
  const { radio, song, paused, volume, hdQuality, setPaused } = playerState;

  const audioRef = React.useRef<HTMLAudioElement | null>();

  const grayColor = darkMode ? '111827' : 'd1d5db';

  const setAudioRef = (ref: HTMLAudioElement): void => {
    audioRef.current = ref;

    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  };

  const togglePlayer = async (_paused: boolean) => {
    const audio = audioRef.current;

    if (!audio || _paused === paused) return;

    try {
      if (!_paused) {
        audio.load();
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (e) {
      // do nothing
    }
  };

  useEffect(() => {
    togglePlayer(paused);
  }, [paused, hdQuality]);

  useEffect(() => {
    if (radio) {
      setPaused(false);
      togglePlayer(false);
    }
  }, [radio, setPaused]);

  return (
    <div className="fixed w-screen z-50">
      <div
        className="grid grid-cols-4 lg:grid-cols-3 items-center h-56 lg:h-32 p-4 m-4 rounded-lg bg-gray-300 text-black dark:text-white dark:bg-gray-900 shadow-xl"
        style={{
          backgroundImage: `linear-gradient(to right, #${grayColor}, #${grayColor}, #${grayColor}, #${grayColor}, #${radio?.color})`,
        }}
      >
        <div className="col-span-3 lg:col-span-2 lg:grid lg:grid-cols-2">
          <PlayerSongDetails radio={radio} song={song} />
          <PlayerSongControls setAudioRef={setAudioRef} />
        </div>
        <PlayerSongExtraControls audioRef={audioRef} />
      </div>
    </div>
  );
});

export default Player;
