import { action, autorun, observable } from 'mobx';
import http from '../http-client';
import { PlayerState } from './PlayerState';
import { Radio } from '../types';

export class RootStore {
  @observable radios: Radio[] = [];

  @observable playerState: PlayerState;

  constructor() {
    this.playerState = new PlayerState(this);

    autorun(
      async (): Promise<void> => {
        await this.refresh();
        const lastRadioId = localStorage.getItem('lastRadioId');
        const radio = lastRadioId
          ? this.radios.find((r) => r.id === lastRadioId) ?? this.radios[0]
          : this.radios[0];
        await this.playerState.setRadio(radio);
      }
    );

    setInterval(() => this.refresh(), 30 * 1000);
  }

  @action
  refresh = async () => {
    this.radios = await http.get<Radio[]>('https://www.nrj.fr/onair');
  };

  @action
  refreshAndGet = async (radio: Radio): Promise<Radio | undefined> => {
    await this.refresh();
    return this.radios.find((r) => radio.id === r.id);
  };
}

export const rootStore = new RootStore();
