import React from 'react';
import classNames from 'classnames';
import Player from './components/player/Player';
import RadioList from './components/RadioList';
import { injectAndObserve } from './core/utils';
import { RootStore } from './core/stores/rootStore';

import './App.global.css';

type Props = { store?: RootStore };

const App: React.FC<Props> = injectAndObserve(({ store }) => {
  const { darkMode } = store!;

  return (
    <div className={classNames({ dark: darkMode })}>
      <div className="h-screen scrollbar scrollbar-none bg-gray-200 dark:bg-gray-800">
        <Player />
        <RadioList />
      </div>
    </div>
  );
});

export default App;
