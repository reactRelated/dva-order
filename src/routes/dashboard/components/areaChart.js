import { Stat } from 'g2';
import createG2 from 'g2-react';
function areaChart({data,height,forceFit}) {

  const Chart = createG2(chart => {
    chart.col('世界', {
      type: 'linear',
      tickInterval: 5
    });
    chart.areaStack().position('year*value').color('country');
    chart.render();
  });

  return ( <Chart
    data={data}
    height={height}
    forceFit={forceFit} />);
}

export default areaChart
