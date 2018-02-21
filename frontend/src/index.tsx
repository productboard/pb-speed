import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import MetadataStore from './stores/MetadataStore';
import App from './App';

import './index.css';

MetadataStore.setMetadata({
  actions: ['PAGE_LOAD', 'YOUR_MUM'],
  spaces: [{ id: 1, name: 'pb' }, { id: 2, name: 'test' }],
});

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
