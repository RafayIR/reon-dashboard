import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactECharts from 'echarts-for-react';
import { loadSiteInsights } from '../../redux/actions/multiSiteAction';

interface SiteInsight {
  siteId: number;
  siteName: string;
  trend: number[];
  heatmapData: [number, number, number][];
}

const MultiSiteInsight = () => {
  const dispatch = useDispatch();
  const sites: SiteInsight[] = useSelector((state: any) => state.insights.sites);
  const heatmapData: [number, number, number][] = [];
  const siteNames: string[] = sites.map(site => site.siteName);
  const isMobile = window.innerWidth < 768;


  useEffect(() => {
    dispatch(loadSiteInsights());
  }, [dispatch]);


  const lineChartOption = {
    title: { text: 'Site Trends Comparison' },
    tooltip: { trigger: 'axis' },
    grid: {
      right: isMobile ? '5%' : '20%',
      top: isMobile ? 50 : 60,
    },
    legend: {
      data: sites.map(s => s.siteName),
      type: 'scroll',
      // orient: isMobile ? 'horizontal' : 'vertical',
      top: isMobile ? 'bottom' :'',
      left: isMobile ? 'center' : 'center',
    },
    xAxis: { type: 'category', data: ['T1', 'T2', 'T3', 'T4', 'T5'] },
    yAxis: { type: 'value' },
    series: sites.map(site => ({
      name: site.siteName,
      type: 'line',
      data: site.trend
    })),
  };



  sites.forEach((site, siteIndex) => {
    const row: number[] = new Array(3).fill(0);
    const count: number[] = new Array(3).fill(0);
    site.heatmapData.forEach(([, x, val]) => {
      row[x] += val;
      count[x] += 1;
    });
    row.forEach((val, xIndex) => {
      heatmapData.push([
        xIndex,
        siteIndex,
        count[xIndex] ? val / count[xIndex] : 0,
      ]);
    });
  });

  const heatmapOption = {
    title: { text: 'Site Performance Heatmap' },
    tooltip: { position: 'top' },
    grid: { height: '60%', top: '20%' },
    xAxis: { type: 'category', data: ['T1', 'T2', 'T3'], splitArea: { show: true } },
    yAxis: { type: 'category', data: siteNames, splitArea: { show: true } },
    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '5%',
    },
    series: [
      {
        name: 'Performance',
        type: 'heatmap',
        data: heatmapData,
        label: { show: true },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(0,0,0,0.5)',
          },
        },
      },
    ],
  };
  return (
    <div className='md:p-5'>
      <ReactECharts option={lineChartOption} style={{ height: 400 }} />
      <ReactECharts option={heatmapOption} style={{ height: 400, marginTop: 40 }} />
    </div>
  )
}

export default MultiSiteInsight;