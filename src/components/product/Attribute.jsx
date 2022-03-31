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
            selectItem={this.props.selectItem}
          />
        )
      case 'swatch':
        return (
          <Swatch
            items={this.props.items}
            selected={this.props.selected}
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
  selectItem: PropTypes.func.isRequired,
}

export default Attribute
