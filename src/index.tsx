import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import { rootStore } from './core/stores/rootStore';

render(
  <Provider store={rootStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
