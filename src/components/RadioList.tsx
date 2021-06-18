import React from 'react';
import { RootStore } from '../core/stores/rootStore';
import { injectAndObserve } from '../core/utils';
import RadioCard from './RadioCard';

type Props = {
  store?: RootStore;
};

const RadioList: React.FC<Props> = injectAndObserve(({ store }) => {
  const { radios = [] } = store!;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 m-4 mt-64 lg:mt-40 text-black dark:text-white relative">
      {radios.map((radio) => (
        <RadioCard key={radio.id} radio={radio} />
      ))}
    </div>
  );
});

export default RadioList;
