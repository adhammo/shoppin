import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import route from 'router/route'
import {
  getCategoriesStatus,
  getCategory,
} from 'redux/reducers/categoriesSlice'

import Category from 'components/category/Category'
import Loading from 'components/status/Loading'
import Error from 'components/status/Error'

class CategoryPage extends PureComponent {
  render() {
    if (this.props.status === 'succeeded') {
      if (this.props.category) return <Category {...this.props.category} />
      else return <Error />
    } else if (this.props.status === 'failed') {
      return <Error />
    } else {
      return <Loading />
    }
  }
}

const mapParamsToProps = params => ({
  name: params.categoryName,
})

const mapStateToProps = (state, props) => ({
  status: getCategoriesStatus(state),
  category: getCategory(state, props.name),
})

export default compose(
  route(mapParamsToProps),
  connect(mapStateToProps)
)(CategoryPage)
