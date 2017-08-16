import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { color } from '../../utils'
import { Loader } from '../../components'
import {  User } from './components'
import styles from './index.less'
import createG2 from 'g2-react';
import { Stat } from 'g2';

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

function Dashboard ({ dashboard, loading }) {
  const { area,user } = dashboard
 /* const numberCards = numbers.map((item, key) => (<Col key={key} lg={6} md={12}>
    <NumberCard {...item} />
  </Col>))*/
  const Chart = createG2(chart => {
    chart.col('世界', {
      type: 'linear',
      tickInterval: 5
    });
    chart.areaStack().position('year*value').color('country');
    chart.render();
  });
  return (
    <div>
      <Loader spinning={loading.models.dashboard} />
      <Row gutter={24}>
        {/*{numberCards}*/}
        <Col lg={16} md={24}>
          <Card
            title="数据统计"
            bordered={false} >
            <Chart
              data={area.data}
              width={area.width}
              height={area.height}
              forceFit={area.forceFit} />
          </Card>
        </Col>
        <Col lg={8} md={24}>
          <Card
            bordered={false} >
            <User {...user}   bodyStyle={{ ...bodyStyle.bodyStyle, padding: 0 }}/>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard)
