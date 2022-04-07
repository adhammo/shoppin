import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { readableColorIsBlack } from 'color2k'
import classNames from 'classnames'

import styles from 'styles/product/Swatch.module.css'

class Swatch extends PureComponent {
  render() {
    return (
      <div
        className={classNames(styles.swatch, {
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
                    [styles.dark]: !readableColorIsBlack(item.value),
                    [styles.selected]: selected,
                  })}
                  style={{
                    backgroundColor: item.value,
                  }}
                  onClick={e => {
                    e.preventDefault()
                    this.props.selectItem(item)
                  }}
                  disabled={selected}
                >
                  {item.displayValue}
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
                    [styles.dark]: !readableColorIsBlack(item.value),
                    [styles.selected]: selected,
                  })}
                  style={{
                    backgroundColor: item.value,
                  }}
                >
                  {item.displayValue}
                </div>
              )
            })}
      </div>
    )
  }
}

Swatch.propTypes = {
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

export default Swatch
