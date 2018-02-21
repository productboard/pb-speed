import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { getMetadata, trackAction } from './api';
import MetadataStore from './stores/MetadataStore';
import App from './App';

import './index.css';

const TIME_START = Date.now();

getMetadata().then(metadata => {
  MetadataStore.setMetadata(metadata);

  for (let i = 0; i < 10; i++) {
    trackAction({
      action: 'DATA_LOADED',
      duration: (Date.now() - TIME_START) * Math.round(Math.random() * 100),
    });
  }

  ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);

  for (let i = 0; i < 10; i++) {
    trackAction({
      action: 'CHARTS_RENDERED',
      duration: (Date.now() - TIME_START) * Math.round(Math.random() * 200),
    });
  }
});

registerServiceWorker();
