import * as React from 'react';
import Chart from '../libs/Chart';
import sharedTooltipOptions from '../libs/sharedTooltipOptions';

const config = {
  chart: {
    type: 'spline',
  },
  title: undefined,
  tooltip: sharedTooltipOptions,
  series: [
    {
      name: 'Median',
      data: [
        29.9,
        71.5,
        106.4,
        129.2,
        144.0,
        176.0,
        135.6,
        148.5,
        216.4,
        194.1,
        205.6,
        254.4,
      ],
    },
    {
      name: '90% percentile',
      data: [
        46.9,
        73.5,
        108.4,
        133.2,
        144,
        187,
        145.6,
        148.5,
        231.4,
        196.1,
        209.6,
        268.4,
      ],
    },
    {
      name: '95% percentile',
      data: [
        51.9,
        76.5,
        114.4,
        133.2,
        146,
        191,
        154.6,
        154.5,
        237.4,
        201.1,
        220.6,
        270.4,
      ],
    },
  ],
};

export default class OverviewChart extends React.Component {
  render() {
    return <Chart config={config} />;
  }
}
