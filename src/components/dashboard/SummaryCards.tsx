import { Card, Col, Row, Statistic } from 'antd';


const SummaryCards = () => {

  const statsData = [
    { title: 'Total Sites', value: 6 },
    { title: 'Total Alarms', value: 6 },
    { title: 'Total Devices', value: 6 },
    { title: 'Total Tickets', value: 6 },
  ];

  return (
    <div className='summary-card-wrapper mt-10'>
      <div className='cards'>
        <Row gutter={[12, 12]}>
          {statsData.map((item, index) => (
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