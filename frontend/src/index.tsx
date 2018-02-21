import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { getMetadata } from './api';
import MetadataStore from './stores/MetadataStore';
import App from './App';

import './index.css';

getMetadata().then(metadata => {
  MetadataStore.setMetadata(metadata);

  ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
});

registerServiceWorker();
