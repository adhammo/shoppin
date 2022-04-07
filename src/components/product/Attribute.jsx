import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Swatch from './Swatch'
import Text from './Text'

class Attribute extends PureComponent {
  componentDidMount() {
    if (this.props.reactive && this.props.items[0]) {
      this.selectItem(this.props.items[0])
    }
  }

  isItemSelected = item => {
    return this.props.selected === item.id
  }

  selectItem = item => {
    if (this.props.reactive) this.props.selectItem(item.id)
  }

  render() {
    switch (this.props.type) {
      case 'text':
        return (
          <Text
            tiny={this.props.tiny}
            small={this.props.small}
            reactive={this.props.reactive}
            items={this.props.items}
            selected={this.props.selected}
            isItemSelected={this.isItemSelected}
            selectItem={this.selectItem}
          />
        )
      case 'swatch':
        return (
          <Swatch
            tiny={this.props.tiny}
            small={this.props.small}
            reactive={this.props.reactive}
            items={this.props.items}
            selected={this.props.selected}
            isItemSelected={this.isItemSelected}
            selectItem={this.selectItem}
          />
        )
      default:
        return <></>
    }
  }
}

Attribute.propTypes = {
  tiny: PropTypes.bool.isRequired,
  small: PropTypes.bool.isRequired,
  reactive: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  selectItem: function (props, propName) {
    if (props.reactive && typeof props[propName] !== 'function') {
      return new Error('Please provide a selectItem function!')
    }
  },
}

Attribute.defaultProps = {
  small: false,
  tiny: false,
  reactive: false,
}

export default Attribute
