import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import route from 'router/route'
import { resolveStatus } from 'redux/status'
import {
  loadCategory,
  getCategoryStatus,
  getCategory,
} from 'redux/reducers/categorySlice'

import Category from 'components/category/Category'
import Loading from 'components/status/Loading'
import Error from 'components/status/Error'

class CategoryPage extends PureComponent {
  componentDidMount() {
    this.props.loadCategory()
  }

  componentDidUpdate(prevProps) {
    if (this.props.categoryName !== prevProps.categoryName) {
      this.props.loadCategory()
    }
  }

  render() {
    return resolveStatus(
      () => {
        if (this.props.category) return <Category {...this.props.category} />
        else return <Error message="Category was not found!" />
      },
      () => <Error message="Category failed to load!" />,
      () => <Loading />,
      this.props.categoryStatus
    )
  }
}

const mapParamsToProps = params => ({
  categoryName: params.categoryName,
})

const mapStateToProps = (state, props) => ({
  categoryStatus: getCategoryStatus(state),
  category: getCategory(state, props.categoryName),
})

const mapDispatchToProps = (dispatch, props) => ({
  loadCategory: () => dispatch(loadCategory(props.categoryName)),
})

export default compose(
  route(mapParamsToProps),
  connect(mapStateToProps, mapDispatchToProps)
)(CategoryPage)
