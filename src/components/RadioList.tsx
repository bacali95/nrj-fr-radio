import * as React from 'react';
import { useEffect, useState } from 'react';
import { RootStore } from '../core/stores/rootStore';
import { injectAndObserve } from '../core/utils';
import RadioCard from './RadioCard';
import { Radio } from '../core/types';

type RadioListProps = {
  store: RootStore;
};

const RadioList: React.FC<RadioListProps> = injectAndObserve(({ store }) => {
  const [radios, setRadios] = useState<Radio[]>([]);

  useEffect(() => {
    setRadios(store.radios ?? []);
  }, [store.radios]);

  return (
    <div className="container container--fluid container--background container--dark">
      <div className="container__body">
        <div className="grid grid--24">
          {radios.map((radio) => (
            <RadioCard key={radio.id} radio={radio} setRadio={store.playerState.setRadio} />
          ))}
        </div>
      </div>
    </div>
  );
});

export default RadioList;
