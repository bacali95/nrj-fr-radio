import * as React from 'react';
import classNames from 'classnames';
import { RootStore } from '../core/stores/rootStore';
import { getCurrentSong, injectAndObserve } from '../core/utils';
import { Radio } from '../core/types';

type RadioCardProps = {
  radio: Radio;
  setRadio: (radio: Radio) => void;
  store?: RootStore;
};

const RadioCard: React.FC<RadioCardProps> = injectAndObserve(({ radio, setRadio, store }) => {
  const { radio: selectedRadio, paused, setPaused } = store!.playerState;
  const song = getCurrentSong(radio) ?? radio.playlist[radio.playlist.length - 1].song;

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
    <div
      className="grid-item grid-item--12 grid-item--md6 grid-item--lg4 grid-item--xl3"
      onClick={() => (radio.id === selectedRadio?.id ? setPaused(!paused) : setRadio(radio))}
    >
      <section
        className={classNames('m-card m-card-webradio', {
          'm-card-webradio--active': radio.id === selectedRadio?.id && !paused,
        })}
      >
        <div className="m-card__header ratio ratio--1by1 u-bg-white u-rounded u-overflow-hidden">
          <div
            className="d-block u-link-underline-none ratio-inner u-overlay"
            role="button"
            tabIndex={0}
          >
            <figure className="ratio ratio--1by1">
              <div className="u-bg-gray-70 ratio-inner">
                <img
                  className="thumbnail-visual lazy ratio-media"
                  onError={(event): void => {
                    event.currentTarget.src =
                      'https://www.nrj.fr/uploads/assets/nrj/logo_monochrome.svg';
                  }}
                  src={song?.img_url}
                  alt={song?.artist}
                />
              </div>
            </figure>
            <figure className="a-media-info-brand u-size-50 u-rounded-2 u-shadow">
              <span className="a-media-info-brand__inner ratio ratio--1by1">
                <img
                  className="a-media-info-brand__visual ratio-inner"
                  src={radio.logo}
                  alt={radio.name}
                />
              </span>
            </figure>
            {radio.id === selectedRadio?.id && !paused && (
              <span className="equalizer">
                <span className="equalizer-span eq1" />
                <span className="equalizer-span eq2" />
                <span className="equalizer-span eq3" />
              </span>
            )}
            <svg
              className="a-icon a-icon--play-1-filled u-size-40 u-overlay__icon m-card-webradio__icon"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path
                className="a-icon__body"
                fill="currentColor"
                d="M7.3,2C6.9,2,6.4,2.1,6.1,2.4C4.9,2.9,4.8,3.9,4.8,4.2v23.5c0,1,0.7,1.6,1.2,1.9C6.3,29.9,6.7,30,7.2,30c0.1,0,0.2,0,0.3,0 c0,0,0,0,0.1,0l0,0c0.4,0,0.7-0.1,1.1-0.2c0.1,0,0.3-0.1,0.4-0.2l21.7-11.8c0.3-0.1,0.8-0.5,1.1-1.2c0.2-0.6,0.2-1.1-0.1-1.6 c-0.1-0.2-0.2-0.4-0.4-0.5l-0.2-0.2c-0.1-0.1-0.3-0.2-0.4-0.3L8.7,2.4C8.3,2.1,7.7,2,7.3,2L7.3,2z"
              />
            </svg>
          </div>
        </div>
        <div className="m-card__body u-text-center">
          <div className="d-block u-link-underline-invert " role="button" tabIndex={0}>
            <h4 className="a-heading-4 truncated-line-2">{song?.title}</h4>
            <p className="description truncated-line-2 u-text-capitalize">{song?.artist}</p>
          </div>
        </div>
      </section>
    </div>
  );
});

export default RadioCard;
