import * as React from 'react';
import './App.css';
import { autorun } from 'mobx';
import { getData } from './api';

import FilterStore from './stores/FilterStore';

import Filter from './components/Filter';
import DistributionChart from './components/DistributionChart';
import OverviewChart from './components/OverviewChart';

const logo = require('./logo.svg');

class App extends React.Component {
  state = { data: [] };

  constructor(props: any) {
    super(props);

    autorun(() => {
      if (!FilterStore.action) {
        return;
      }

      getData({
        action: FilterStore.action,
        spaceId: FilterStore.spaceId,
      }).then(({ data }) => this.setState({data}));
    });
  }

  render() {
    return (
      <div className="App">
        <Filter />
        <DistributionChart
          chartData={this.state.data}
        />
        <OverviewChart />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
