import { action, observable } from 'mobx';
import { getCurrentSong } from '../utils';
import { RootStore } from './rootStore';
import { Radio, RadioSong } from '../types';

export class PlayerState {
  @observable radio: Radio | undefined;

  @observable song: RadioSong | undefined;

  @observable paused = false;

  @observable hdQuality = true;

  @observable volume = 50;

  constructor(private rootStore: RootStore) {}

  @action
  setRadio = async (radio: Radio) => {
    localStorage.setItem('lastRadioId', radio.id);

    this.radio = radio;
    this.refreshSong();
  };

  @action
  refreshSong = async () => {
    this.song = getCurrentSong(this.radio);

    if (!this.song) {
      this.radio = await this.rootStore.refreshAndGetRadio(this.radio!);
      const playlist = this.radio?.playlist;
      this.song = getCurrentSong(this.radio) ?? playlist?.[playlist?.length - 1].song;
    }
  };

  @action
  setPaused = (paused: boolean) => {
    this.paused = paused;
  };

  @action
  setVolume = (volume: number) => {
    this.volume = volume;
  };

  @action
  setHdQuality = (hdQuality: boolean) => {
    this.hdQuality = hdQuality && !!this.radio?.url_hd_aac;
  };
}
