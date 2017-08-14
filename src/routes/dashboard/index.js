import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
/*import { color } from 'utils'
import { Loader } from 'components'*/


const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

function Dashboard ({ dashboard, loading }) {
  /*const { weather, sales, quote, numbers, recentSales, comments, completed, browser, cpu, user } = dashboard
  const numberCards = numbers.map((item, key) => (<Col key={key} lg={6} md={12}>
    <NumberCard {...item} />
  </Col>))*/

  return (
    <div>
      <h1>mrchen</h1>
    </div>
  )
}

/*Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}*/

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard)
