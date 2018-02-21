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

  trackAction({
    action: 'DATA_LOADED',
    duration: (Date.now() - TIME_START) * 9,
  });

  ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);

  trackAction({
    action: 'CHARTS_RENDERED',
    duration: (Date.now() - TIME_START) * 9,
  });
});

registerServiceWorker();
