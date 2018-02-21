import * as React from 'react';
import './App.css';
import DistributionChart from './components/DistributionChart';
import OverviewChart from './components/OverviewChart';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <DistributionChart
          chartData={[
            { count: 1, duration: 3 },
            { count: 5, duration: 12 },
            { count: 7, duration: 22 },
            { count: 4, duration: 17 },
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
