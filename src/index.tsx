import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { Provider } from 'react-redux';
import store from './store';
import Router from './Router';
import Wrapper from './components/Wrapper';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store()}>
      <Wrapper>
        <Router />
      </Wrapper>
    </Provider>
  </React.StrictMode>,
);
