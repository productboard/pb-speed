import * as React from 'react';
import * as Highcharts from 'highcharts';

type TProps = {
  config: Highcharts.Options,
};

export default class Chart extends React.PureComponent<TProps> {
  el: HTMLDivElement | null = null;
  chart: Highcharts.ChartObject | null = null;

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const { config } = this.props;

    if (this.el) {
      this.chart = new Highcharts.Chart({
        ...config,
        chart: {
          ...config.chart,
          renderTo: this.el,
        }
      });
    }
  }

  render() {
    return <div ref={c => (this.el = c)} />;
  }
}