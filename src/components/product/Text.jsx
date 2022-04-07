import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from 'styles/product/Text.module.css'

class Text extends PureComponent {
  render() {
    return (
      <div
        className={classNames(styles.text, {
          [styles.tiny]: this.props.tiny,
          [styles.small]: this.props.small,
        })}
      >
        {this.props.reactive
          ? this.props.items.map(item => {
              const selected = this.props.isItemSelected(item)
              return (
                <button
                  key={item.id}
                  title={item.displayValue}
                  className={classNames(styles.value, styles.reactive, {
                    [styles.selected]: selected,
                  })}
                  onClick={e => {
                    e.preventDefault()
                    this.props.selectItem(item)
                  }}
                  disabled={selected}
                >
                  {item.value}
                </button>
              )
            })
          : this.props.items.map(item => {
              const selected = this.props.isItemSelected(item)
              return (
                <div
                  key={item.id}
                  title={item.displayValue}
                  className={classNames(styles.value, {
                    [styles.selected]: selected,
                  })}
                >
                  {item.value}
                </div>
              )
            })}
      </div>
    )
  }
}

Text.propTypes = {
  tiny: PropTypes.bool.isRequired,
  small: PropTypes.bool.isRequired,
  reactive: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  isItemSelected: PropTypes.func.isRequired,
  selectItem: function (props, propName) {
    if (props.reactive && typeof props[propName] !== 'function') {
      return new Error('Please provide a selectItem function!')
    }
  },
}

export default Text
