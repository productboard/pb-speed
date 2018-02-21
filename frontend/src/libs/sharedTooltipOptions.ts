import { TooltipOptions } from 'highcharts';

const options: TooltipOptions = {
  formatter(this: any) {
      const lines = this.points.map((self: any) => self.series.name + ': ' + self.y);

      return `<b>${this.x}</b><br />${lines.join('<br />')}`;
  },
  shared: true,
};

export default options;
