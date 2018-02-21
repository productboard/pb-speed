import * as React from 'react';
import { observer } from 'mobx-react';

import MetadataStore from '../stores/MetadataStore';
import FilterStore from '../stores/FilterStore';

class Filter extends React.Component {
  renderActionsFilter = () => {
    return (
      <select
        value={FilterStore.action || ''}
        onChange={ev => {
          FilterStore.setAction(ev.target.value);
        }}
      >
        {!FilterStore.action && <option value="" disabled />}
        {MetadataStore.actions.map(action => (
          <option key={action} value={action}>
            {action}
          </option>
        ))}
      </select>
    );
  };

  renderSpacesFilter = () => {
    return (
      <select
        value={FilterStore.spaceId || ''}
        onChange={ev => {
          const value = ev.target.value;
          FilterStore.setSpace(value ? Number(value) : null);
        }}
      >
        <option value="">All spaces</option>
        {MetadataStore.spaces.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    );
  };

  render() {
    return (
      <div>
        {this.renderActionsFilter()}
        {this.renderSpacesFilter()}
      </div>
    );
  }
}

export default observer(Filter);
