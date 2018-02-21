import * as React from 'react';
import Chart from '../libs/Chart';

const configBase = {
  chart: {
    type: 'spline',
  },
  title: undefined,
};

type TProps = {
  chartData: Array<{count: number, label: string}>,
};

export default class DistributionChart extends React.Component<TProps> {
  generateConfig() {
    const { chartData } = this.props;

    const categories = chartData.map(d => d.label);
    const data = chartData.map(d => d.count);

    return {
      ...configBase,
      xAxis: { categories },
      series: [{
        data
      }],
    };
  }

  render() {
    return <Chart config={this.generateConfig()} />;
  }
}
