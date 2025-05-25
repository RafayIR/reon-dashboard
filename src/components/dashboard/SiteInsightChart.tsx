import React from 'react';
import ReactECharts from 'echarts-for-react';

interface SiteInsightChartProps {
  siteName?: string;
  insightData?: number[];
}

const SiteInsightChart: React.FC<SiteInsightChartProps> = ({
  siteName,
  insightData
}) => {
  const options = {
    title: {
      text: `${siteName} Insights`,
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Insight',
        type: 'line',
        data: insightData,
        smooth: true,
      },
    ],
  };

  return (
    <ReactECharts option={options} style={{ height: '400px' }} />
  );
};

export default SiteInsightChart;
