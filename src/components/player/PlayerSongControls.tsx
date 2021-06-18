import React from 'react';
import SVG from '../SVG';
import { injectAndObserve } from '../../core/utils';
import { RootStore } from '../../core/stores/rootStore';

type Props = {
  store?: RootStore;
  setAudioRef?: (ref: HTMLAudioElement) => void;
};

const PlayerSongControls: React.FC<Props> = injectAndObserve(({ store, setAudioRef }) => {
  const { radios, playerState } = store!;
  const { hdQuality, paused, radio, setRadio, setPaused } = playerState;

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

  return (
    <div className="flex mt-5 lg:mt-0 items-center justify-center">
      <div className="cursor-pointer">
        <SVG.PreviousButton onClick={setPreviousRadio} />
      </div>
      <div title={paused ? 'Play' : 'Pause'} className="mx-6 cursor-pointer">
        <SVG.PlayPauseButton paused={paused} setPaused={setPaused} color={radio?.color} />
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio
          src={hdQuality && radio?.url_hd_aac ? radio.url_hd_aac : radio?.url_128k_mp3}
          ref={setAudioRef}
        />
      </div>
      <div className="cursor-pointer">
        <SVG.NextButton onClick={setNextRadio} />
      </div>
    </div>
  );
});

export default PlayerSongControls;
