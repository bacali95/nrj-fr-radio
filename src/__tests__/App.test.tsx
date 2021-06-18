import React from 'react';
import { Provider } from 'mobx-react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../App';
import { rootStore } from '../core/stores/rootStore';

describe('App', () => {
  it('should render', () => {
    expect(
      render(
        <Provider store={rootStore}>
          <App />
        </Provider>
      )
    ).toBeTruthy();
  });
});
