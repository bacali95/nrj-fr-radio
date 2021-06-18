import React from 'react';
import classNames from 'classnames';
import Player from './components/Player';
import RadioList from './components/RadioList';
import { injectAndObserve } from './core/utils';
import { RootStore } from './core/stores/rootStore';

import './App.global.css';

const App: React.FC<{ store?: RootStore }> = injectAndObserve(({ store }) => {
  const { darkMode } = store!;

  return (
    <div className={classNames({ dark: darkMode })}>
      <div className="h-screen scrollbar scrollbar-none bg-gray-50 dark:bg-gray-800 transition-colors duration-500">
        <Player />
        <RadioList />
      </div>
    </div>
  );
});

export default App;
