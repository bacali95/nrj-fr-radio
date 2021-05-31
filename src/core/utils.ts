import { IReactComponent } from 'mobx-react/dist/types/IReactComponent';
import { inject, observer } from 'mobx-react';
import { Radio, RadioSong } from './types';

export function injectAndObserve<T extends IReactComponent>(component: T): T {
  return inject('store')(observer(component));
}

export function getCurrentSong(radio?: Radio): RadioSong | undefined {
  return radio?.playlist?.find((item) => !item.song.id || item.end_timestamp * 1000 > Date.now())
    ?.song;
}
