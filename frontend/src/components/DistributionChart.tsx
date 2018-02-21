import * as React from 'react';
import Chart from '../libs/Chart';

const configBase = {
  chart: {
    type: 'spline',
  },
  xAxis: {
    min: 0,
    max: 30,
  },
  title: undefined,
};

type TProps = {
  chartData: Array<{
    count: number; // y-axis
    duration: number // x-axis
  }>;
};

export default class DistributionChart extends React.Component<TProps> {
  generateConfig() {
    const { chartData } = this.props;

    const data = chartData
      .sort((a, b) => a.duration - b.duration)
      .map((d): [number, number] => [d.duration, d.count]);

    return {
      ...configBase,
      series: [
        {
          data,
        },
      ],
    };
  }

  render() {
    return <Chart config={this.generateConfig()} />;
  }
}
