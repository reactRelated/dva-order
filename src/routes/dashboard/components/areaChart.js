import { Stat } from 'g2';
import createG2 from 'g2-react';
function areaChart({data,width,height,forceFit}) {

  const Chart = createG2(chart => {
    chart.col('世界', {
      type: 'linear',
      tickInterval: 25
    });
    chart.areaStack().position('year*value').color('country');
    chart.render();
  });

  return ( <Chart
    data={data}
    width={width}
    height={height}
    forceFit={forceFit} />);
}

export default areaChart
