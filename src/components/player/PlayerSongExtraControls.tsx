import React, { useState } from 'react';
import classNames from 'classnames';
import SVG from '../SVG';
import { injectAndObserve } from '../../core/utils';
import { RootStore } from '../../core/stores/rootStore';

type Props = {
  store?: RootStore;
  audioRef: React.MutableRefObject<HTMLAudioElement | null | undefined>;
};

const PlayerSongExtraControls: React.FC<Props> = injectAndObserve(({ store, audioRef }) => {
  const { darkMode, setDarkMode, playerState } = store!;
  const { hdQuality, volume, radio, setVolume, setHdQuality } = playerState;

  const [volumeSlider, setVolumeSlider] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-end justify-center lg:flex-row lg:items-center lg:justify-end mr-2">
      <div className="cursor-pointer hover:bg-gray-500 hover:bg-opacity-50 rounded-full p-3">
        <SVG.DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      <div className="relative cursor-pointer hover:bg-gray-500 hover:bg-opacity-50 rounded-full p-3">
        <SVG.VolumeButton volume={volume} onClick={() => setVolumeSlider(!volumeSlider)} />
        <div
          className={classNames(
            'absolute flex items-center transform -translate-x-40% mt-3 p-2 bg-gray-200 rounded-md',
            {
              hidden: !volumeSlider,
            }
          )}
        >
          <input
            type="range"
            name="volume"
            min="0"
            max="100"
            value={volume}
            onChange={(event) => {
              setVolume(event.target.valueAsNumber);
              if (audioRef.current) {
                audioRef.current.volume = event.target.valueAsNumber / 100;
              }
            }}
          />
        </div>
      </div>
      <div className="cursor-pointer hover:bg-gray-500 hover:bg-opacity-50 rounded-full p-3">
        <SVG.HdQualityButton
          hdQuality={hdQuality && !!radio?.url_hd_aac}
          setHdQuality={setHdQuality}
        />
      </div>
    </div>
  );
});

export default PlayerSongExtraControls;
