import * as React from 'react';
import { useEffect } from 'react';
import classNames from 'classnames';
import { injectAndObserve } from '../core/utils';
import { RootStore } from '../core/stores/rootStore';

type PlayerProps = {
  store?: RootStore;
};

const Player: React.FC<PlayerProps> = injectAndObserve(({ store }) => {
  const {
    radio,
    song,
    paused,
    volume,
    hdQuality,
    setPaused,
    setVolume,
    setHdQuality,
  } = store!.playerState;

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
    <div
      className="player-webradio player-webradio--sticked is-fast-average-color-light"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      style={{ '--fast-average-bg-color': `#${radio?.color}` }}
    >
      <div className="player-webradio__main">
        <header className="player-webradio__header">
          <div className="player-webradio__header-visual">
            <div className="player-webradio__branding">
              <figure className="thumbnail ratio ratio--1by1">
                <div className="thumbnail-inner ratio-inner">
                  <img
                    className="thumbnail-visual ratio-media"
                    src={radio?.logo}
                    alt={radio?.name}
                  />
                </div>
              </figure>
            </div>
            <div className="player-webradio__cover">
              <figure className="thumbnail ratio ratio--1by1">
                <div className="thumbnail-inner ratio-inner">
                  <img
                    className="thumbnail-visual ratio-media"
                    src={song?.img_url}
                    alt={song?.title}
                    crossOrigin="anonymous"
                  />
                </div>
              </figure>
            </div>
          </div>
          <div className="player-webradio__action">
            <div>
              <button
                title={paused ? 'Play' : 'Pause'}
                type="button"
                onClick={() => setPaused(!paused)}
                className={classNames(
                  'a-button u-rounded-50 u-size-40 u-border-0 player-webradio__control player-webradio__control--action',
                  {
                    'a-button--active': !paused,
                  }
                )}
              >
                <svg
                  className="a-icon a-icon--play-pause-1-filled u-size-16 u-mx-0"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path
                    className="a-icon__body-filled"
                    fill="none"
                    d="M9.7,1H5.5c-2,0-3.7,1.7-3.7,3.7v22.6c0,2,1.7,3.7,3.7,3.7h4.2c2,0,3.7-1.7,3.7-3.7V4.7C13.4,2.7,11.7,1,9.7,1z M26.5,1 h-4.2c-2,0-3.7,1.7-3.7,3.7v22.6c0,2,1.7,3.7,3.7,3.7h4.2c2,0,3.7-1.7,3.7-3.7V4.7C30.2,2.7,28.5,1,26.5,1z"
                  />
                  <path
                    className="a-icon__body a-icon__body--replaced"
                    fill="currentColor"
                    d="M7.3,2C6.9,2,6.4,2.1,6.1,2.4C4.9,2.9,4.8,3.9,4.8,4.2v23.5c0,1,0.7,1.6,1.2,1.9C6.3,29.9,6.7,30,7.2,30c0.1,0,0.2,0,0.3,0 c0,0,0,0,0.1,0l0,0c0.4,0,0.7-0.1,1.1-0.2c0.1,0,0.3-0.1,0.4-0.2l21.7-11.8c0.3-0.1,0.8-0.5,1.1-1.2c0.2-0.6,0.2-1.1-0.1-1.6 c-0.1-0.2-0.2-0.4-0.4-0.5l-0.2-0.2c-0.1-0.1-0.3-0.2-0.4-0.3L8.7,2.4C8.3,2.1,7.7,2,7.3,2L7.3,2z"
                  />
                </svg>
                <span className="a-button__text player-webradio__control-text">
                  {paused ? 'Play' : 'Pause'}
                </span>
              </button>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <audio src={radio?.[hdQuality ? 'url_128k_mp3' : 'url_64k_aac']} ref={setAudioRef} />
            </div>
          </div>
          <div className="player-webradio__header-content">
            <p className="player-webradio__sup-heading">
              Playing on <strong className="u-text-uppercase">{radio?.name}</strong>
            </p>
            <h3 className="a-heading-4 u-text-uppercase truncated-line-1 player-webradio__heading">
              {song?.title}
            </h3>
            <p className="description truncated-line-1 u-text-capitalize player-webradio__description">
              {song?.artist}
            </p>
          </div>
        </header>
      </div>
      <aside className="player-webradio__aside">
        <ul className="player-webradio__controls">
          <li className="player-webradio__controls-item player-webradio__controls-item--volume">
            <button
              title="Volume"
              id="webradioVolume"
              type="button"
              className="a-button a-button--link u-rounded-50 u-size-60 player-webradio__control"
            >
              <svg
                className="a-icon a-icon--sound-on-off-filled u-size-24 u-mx-0"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path
                  className="a-icon__body-filled"
                  fill="none"
                  d="M18.4,1.1c-0.6-0.3-1.3-0.2-1.8,0.3L8,9C7.8,9.2,7.5,9.3,7.3,9.3H4.4C2.5,9.3,1,10.8,1,12.6v6.8c0,1.8,1.5,3.3,3.4,3.3h2.8 c0.3,0,0.5,0.1,0.7,0.3l8.6,7.6c0.3,0.3,0.7,0.4,1.1,0.4c0.2,0,0.5,0,0.7-0.1c0.6-0.3,1-0.8,1-1.5V2.6C19.4,2,19,1.4,18.4,1.1z M27.8,16l3-3c0.3-0.3,0.3-0.8,0-1.1c-0.3-0.3-0.8-0.3-1.1,0l-3,3l-3-3c-0.3-0.3-0.8-0.3-1.1,0c-0.3,0.3-0.3,0.8,0,1.1l3,3l-3,3 c-0.3,0.3-0.3,0.8,0,1.1c0.1,0.1,0.3,0.2,0.5,0.2c0.2,0,0.4-0.1,0.5-0.2l3-3l3,3c0.1,0.1,0.3,0.2,0.5,0.2c0.2,0,0.4-0.1,0.5-0.2 c0.3-0.3,0.3-0.8,0-1.1L27.8,16z"
                />
                <path
                  className="a-icon__body a-icon__body--replaced"
                  fill="currentColor"
                  d="M18.4,1.1c-0.6-0.3-1.3-0.2-1.8,0.3L8,9C7.8,9.2,7.6,9.3,7.3,9.3H4.4C2.5,9.3,1,10.8,1,12.6v6.8c0,1.8,1.5,3.3,3.4,3.3h2.9 c0.3,0,0.5,0.1,0.7,0.3l8.7,7.6c0.3,0.3,0.7,0.4,1.1,0.4c0.2,0,0.5,0,0.7-0.1c0.6-0.3,1-0.8,1-1.5V2.6C19.4,2,19,1.4,18.4,1.1z M23.2,8.9c-0.3-0.3-0.7-0.3-1.1-0.1c-0.3,0.3-0.3,0.7-0.1,1.1c3.1,3.6,3.1,9,0,12.6c-0.3,0.3-0.2,0.8,0.1,1.1 c0.1,0.1,0.3,0.2,0.5,0.2c0.2,0,0.4-0.1,0.6-0.3C26.8,19.2,26.8,13,23.2,8.9z M26.5,4.6c-0.3-0.3-0.8-0.3-1.1,0 c-0.3,0.3-0.3,0.8,0,1.1c5.4,5.9,5.4,15.1,0,21c-0.3,0.3-0.3,0.8,0,1.1c0.1,0.1,0.3,0.2,0.5,0.2c0.2,0,0.4-0.1,0.6-0.2 C32.5,21.2,32.5,11.1,26.5,4.6z"
                />
              </svg>
              <span className="a-button__text u-visually-hidden">Volume</span>
            </button>
            <div className="player-webradio__volume-tip">
              <span className="a-range-slider js-range-slider">
                <span className="a-range-slider__wrapper">
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="webradioVolumeRange" className="form-label u-visually-hidden">
                    Volume
                  </label>
                  <input
                    className="a-range-slider__input js-range-slider__input"
                    id="webradioVolumeRange"
                    max="100"
                    name="webradioVolumeRange"
                    type="range"
                    onChange={(event) => {
                      setVolume(event.target.valueAsNumber);
                      if (audioRef.current) {
                        audioRef.current.volume = event.target.valueAsNumber / 100;
                      }
                    }}
                    value={volume}
                  />
                  <span
                    className="a-range-slider__progress js-range-slider__progress"
                    style={{ width: `${volume}%` }}
                  />
                </span>
              </span>
            </div>
          </li>
          <li className="player-webradio__controls-item">
            <button
              title="HD Quality"
              type="button"
              className={classNames(
                'a-button a-button--vertical a-button--small a-button--link u-rounded-50 u-size-60 player-webradio__control',
                { 'a-button-enabled': hdQuality }
              )}
              onClick={() => setHdQuality(!hdQuality)}
            >
              <svg
                className="a-icon a-icon--hd u-size-24"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path
                  className="a-icon__body-filled"
                  fill="none"
                  d="M20.8,13.6H19v5.3h1.8c0.7,0,1.4-0.2,2-0.7c1-1.1,1-2.8,0-3.9C22.3,13.8,21.5,13.6,20.8,13.6z M28.1,5.4H3.9 C2,5.4,0.5,7,0.5,8.9v14.2c0,1.9,1.5,3.5,3.4,3.3h24.2c1.9,0,3.4-1.5,3.4-3.4V8.8C31.5,6.9,30,5.4,28.1,5.4z M15,20.5h-2V17H9.2v3.5 h-2V12h2v3.4H13V12h2V20.5z M25,18.5c-0.4,0.7-1,1.2-1.7,1.5s-1.6,0.5-2.4,0.5H17V12h3.9c0.8,0,1.6,0.1,2.4,0.5 c0.7,0.3,1.3,0.9,1.7,1.5C25.8,15.4,25.8,17.1,25,18.5z"
                />
                <path
                  className="a-icon__body a-icon__body--replaced"
                  fill="currentColor"
                  d="M28.1,5.4H3.9C2,5.4,0.5,7,0.5,8.9v14.2c0,1.9,1.5,3.4,3.4,3.4h24.2c1.9,0,3.4-1.5,3.4-3.4V8.9C31.5,7,30,5.4,28.1,5.4z M28.1,25.3H3.9c-1.2,0-2.1-1-2.1-2.1V8.9c0-1.2,1-2.1,2.1-2.1h24.2c1.2,0,2.1,1,2.1,2.1l0,14.2C30.2,24.3,29.3,25.3,28.1,25.3z M13,15.4H9.2V12h-2v8.5h2V17H13v3.5h2V12l-2,0V15.4z M23.3,12.5c-0.8-0.4-1.6-0.5-2.4-0.5H17v8.5h3.9c0.8,0,1.7-0.2,2.4-0.5 c0.7-0.3,1.3-0.8,1.7-1.5c0.8-1.4,0.8-3.1,0-4.5C24.6,13.4,24,12.9,23.3,12.5z M22.8,18.2c-0.6,0.5-1.3,0.7-2,0.7l-1.8,0v-5.3h1.8 c0.7,0,1.5,0.2,2,0.7C23.8,15.4,23.8,17.1,22.8,18.2z"
                />
              </svg>
              <span className="a-button__text player-webradio__control-text">HD Quality</span>
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
});

export default Player;
