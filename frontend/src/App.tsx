import * as React from 'react';
import './App.css';
import DistributionChart from './charts/DistributionChart';
import OverviewChart from './charts/OverviewChart';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <DistributionChart
          chartData={[
            { count: 1, label: '0.1s' },
            { count: 5, label: '0.2s' },
            { count: 7, label: '0.3s' },
            { count: 4, label: '0.4s' },
          ]}
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
