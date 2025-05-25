import { Card, Col, Row, Statistic } from 'antd';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../utils/type';

const SummaryCards = () => {
  const statsDataRedux = useSelector((state: RootState) => state.sites.data);
  const statsData = useMemo(() => {
    const totals = {
      sites: statsDataRedux?.length,
      alarms: statsDataRedux?.reduce((sum, site) => sum + (Number(site.alarms) || 0), 0),
      devices: statsDataRedux?.reduce((sum, site) => sum + (Number(site.devices) || 0), 0),
      tickets: statsDataRedux?.reduce((sum, site) => sum + (Number(site.tickets) || 0), 0),
    };

    return [
      { title: 'Total Sites', value: totals.sites },
      { title: 'Total Alarms', value: totals.alarms },
      { title: 'Total Devices', value: totals.devices },
      { title: 'Total Tickets', value: totals.tickets },
    ];
  }, [statsDataRedux]);

  return (
    <div className='summary-card-wrapper mt-10'>
      <div className='cards'>
        <Row gutter={[12, 12]}>
          {statsData?.map((item, index) => (
            <Col key={index} xs={24} sm={12} md={12} lg={6}>
              <Card variant="outlined" className='shadow-md'>
                <Statistic title={item.title} value={item.value} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}


export default SummaryCards;