import { action, observable } from 'mobx';
import http from '../http-client';
import { PlayerState } from './PlayerState';
import { Radio } from '../types';

export class RootStore {
  @observable darkMode: boolean;

  @observable radios: Radio[] = [];

  @observable playerState: PlayerState;

  constructor() {
    this.darkMode = this.getInitialDarkMode();

    this.playerState = new PlayerState(this);

    this.refresh()
      .then(() => {
        const lastRadioId = localStorage.getItem('lastRadioId');
        const radio = this.radios.find((r) => r.id === lastRadioId) ?? this.radios[0];
        return this.playerState.setRadio(radio);
      })
      .catch(undefined);

    setInterval(async () => {
      await this.refresh();
      await this.playerState.refreshSong();
    }, 30 * 1000);
  }

  @action
  refresh = async () => {
    this.radios = await http.get<Radio[]>('https://www.nrj.fr/onair');
  };

  @action
  refreshAndGetRadio = async (radio: Radio): Promise<Radio | undefined> => {
    await this.refresh();
    return this.radios.find((r) => radio.id === r.id);
  };

  @action
  setDarkMode = (darkMode: boolean): void => {
    this.darkMode = darkMode;
    localStorage.setItem('darkMode', `${darkMode}`);
  };

  private getInitialDarkMode = () => {
    let status = localStorage.getItem('darkMode');

    if (status === null && window.matchMedia) {
      status = `${window.matchMedia('(prefers-color-scheme: dark)').matches}`;
      localStorage.setItem('darkMode', status);
    }

    return status === 'true';
  };
}

export const rootStore = new RootStore();
