import * as React from 'react';
import { useEffect } from 'react';
import SVG from './SVG';
import { injectAndObserve } from '../core/utils';
import { RootStore } from '../core/stores/rootStore';

type PlayerProps = {
  store?: RootStore;
};

const Player: React.FC<PlayerProps> = injectAndObserve(({ store }) => {
  const { radios, darkMode, setDarkMode, playerState } = store!;
  const { radio, song, paused, volume, hdQuality, setPaused, setHdQuality, setRadio } = playerState;

  const audioRef = React.useRef<HTMLAudioElement | null>();

  const setAudioRef = (ref: HTMLAudioElement): void => {
    audioRef.current = ref;

    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  };

  const togglePlayer = async (_paused: boolean) => {
    const audio = audioRef.current;

    if (!audio) return;

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

  const setPreviousRadio = () => {
    const currentSongIndex = radios.findIndex((r) => r.id === radio?.id);

    return setRadio(currentSongIndex ? radios[currentSongIndex - 1] : radios[radios.length - 1]);
  };

  const setNextRadio = () => {
    const currentSongIndex = radios.findIndex((r) => r.id === radio?.id);

    return setRadio(
      currentSongIndex < radios.length - 1 ? radios[currentSongIndex + 1] : radios[0]
    );
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
      <div className="grid grid-cols-3 items-center h-32 p-4 m-4 rounded-lg bg-gray-300 text-black dark:text-white dark:bg-gray-900 transition-colors duration-500 shadow-lg">
        <div className="flex items-center">
          <img
            className="flex-none w-24 h-24 rounded-lg bg-white"
            src={radio?.logo}
            alt={radio?.name}
          />
          <img
            className="flex-none ml-3 w-24 h-24 rounded-lg bg-white"
            src={song?.img_url}
            alt={song?.title}
          />
          <div className="min-w-0 flex-auto ml-3 font-medium">
            <p className="text-red-600 dark:text-red-400 text-sm">
              Playing on <strong className="uppercase">{radio?.name}</strong>
            </p>
            <p className="text-black dark:text-white text-xl truncate">{song?.title}</p>
            <p className="text-gray-500 dark:text-gray-400 text-lg">{song?.artist}</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="cursor-pointer">
            <SVG.PreviousButton onClick={setPreviousRadio} />
          </div>
          <div title={paused ? 'Play' : 'Pause'} className="mx-6 cursor-pointer">
            <SVG.PlayPauseButton paused={paused} setPaused={setPaused} />
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <audio src={radio?.[hdQuality ? 'url_128k_mp3' : 'url_64k_aac']} ref={setAudioRef} />
          </div>
          <div className="cursor-pointer">
            <SVG.NextButton onClick={setNextRadio} />
          </div>
        </div>
        <div className="flex items-center justify-end mr-5">
          <button type="button" className="mr-5">
            <SVG.DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode} />
          </button>
          <div className="cursor-pointer mr-5" role="none">
            <svg width="30" height="30" viewBox="0 0 32 32">
              <path
                fill="none"
                d="M18.4,1.1c-0.6-0.3-1.3-0.2-1.8,0.3L8,9C7.8,9.2,7.5,9.3,7.3,9.3H4.4C2.5,9.3,1,10.8,1,12.6v6.8c0,1.8,1.5,3.3,3.4,3.3h2.8 c0.3,0,0.5,0.1,0.7,0.3l8.6,7.6c0.3,0.3,0.7,0.4,1.1,0.4c0.2,0,0.5,0,0.7-0.1c0.6-0.3,1-0.8,1-1.5V2.6C19.4,2,19,1.4,18.4,1.1z M27.8,16l3-3c0.3-0.3,0.3-0.8,0-1.1c-0.3-0.3-0.8-0.3-1.1,0l-3,3l-3-3c-0.3-0.3-0.8-0.3-1.1,0c-0.3,0.3-0.3,0.8,0,1.1l3,3l-3,3 c-0.3,0.3-0.3,0.8,0,1.1c0.1,0.1,0.3,0.2,0.5,0.2c0.2,0,0.4-0.1,0.5-0.2l3-3l3,3c0.1,0.1,0.3,0.2,0.5,0.2c0.2,0,0.4-0.1,0.5-0.2 c0.3-0.3,0.3-0.8,0-1.1L27.8,16z"
              />
              <path
                fill="currentColor"
                d="M18.4,1.1c-0.6-0.3-1.3-0.2-1.8,0.3L8,9C7.8,9.2,7.6,9.3,7.3,9.3H4.4C2.5,9.3,1,10.8,1,12.6v6.8c0,1.8,1.5,3.3,3.4,3.3h2.9 c0.3,0,0.5,0.1,0.7,0.3l8.7,7.6c0.3,0.3,0.7,0.4,1.1,0.4c0.2,0,0.5,0,0.7-0.1c0.6-0.3,1-0.8,1-1.5V2.6C19.4,2,19,1.4,18.4,1.1z M23.2,8.9c-0.3-0.3-0.7-0.3-1.1-0.1c-0.3,0.3-0.3,0.7-0.1,1.1c3.1,3.6,3.1,9,0,12.6c-0.3,0.3-0.2,0.8,0.1,1.1 c0.1,0.1,0.3,0.2,0.5,0.2c0.2,0,0.4-0.1,0.6-0.3C26.8,19.2,26.8,13,23.2,8.9z M26.5,4.6c-0.3-0.3-0.8-0.3-1.1,0 c-0.3,0.3-0.3,0.8,0,1.1c5.4,5.9,5.4,15.1,0,21c-0.3,0.3-0.3,0.8,0,1.1c0.1,0.1,0.3,0.2,0.5,0.2c0.2,0,0.4-0.1,0.6-0.2 C32.5,21.2,32.5,11.1,26.5,4.6z"
              />
            </svg>
          </div>
          <div className="cursor-pointer">
            <SVG.HdQualityButton hdQuality={hdQuality} setHdQuality={setHdQuality} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Player;
