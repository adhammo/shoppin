import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Swatch from './Swatch'
import Text from './Text'

class Attribute extends PureComponent {
  render() {
    switch (this.props.type) {
      case 'text':
        return (
          <Text
            items={this.props.items}
            selected={this.props.selected}
            reactive={this.props.reactive}
            selectItem={this.props.selectItem}
          />
        )
      case 'swatch':
        return (
          <Swatch
            items={this.props.items}
            selected={this.props.selected}
            reactive={this.props.reactive}
            selectItem={this.props.selectItem}
          />
        )
      default:
        return <></>
    }
  }
}

Attribute.propTypes = {
  type: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  reactive: PropTypes.bool.isRequired,
  selectItem: function (props, propName) {
    if (props.reactive && typeof props[propName] !== 'function') {
      return new Error('Please provide a selectItem function!')
    }
  },
}

Attribute.defaultProps = {
  reactive: false,
}

export default Attribute
