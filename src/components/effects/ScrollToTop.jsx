import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import route from 'router/route'
import { overlayChanged } from 'redux/reducers/cartSlice'

class ScrollToTop extends PureComponent {
  onScroll = () => {
    window.scrollTo(0, 0)
    this.props.hideOverlay()
  }

  componentDidMount() {
    this.onScroll()
  }

  componentDidUpdate() {
    this.onScroll()
  }

  render() {
    return <></>
  }
}

const mapParamsToProps = (params, path) => ({
  pathName: path.pathname,
})

const mapDispatchToProps = dispatch => ({
  hideOverlay: () => dispatch(overlayChanged({ visible: false })),
})

export default compose(
  route(mapParamsToProps),
  connect(() => ({}), mapDispatchToProps)
)(ScrollToTop)
