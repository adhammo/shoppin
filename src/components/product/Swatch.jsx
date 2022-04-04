import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { readableColorIsBlack } from 'color2k'
import classNames from 'classnames'

import styles from 'styles/product/Swatch.module.css'

class Swatch extends PureComponent {
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
    return (
      <div className={styles.swatch}>
        {this.props.reactive
          ? this.props.items.map(item => {
              const selected = this.isItemSelected(item)
              return (
                <button
                  key={item.id}
                  title={item.displayValue}
                  className={classNames(styles.value, styles.reactive, {
                    [styles.small]: this.props.small,
                    [styles.dark]: !readableColorIsBlack(item.value),
                    [styles.selected]: selected,
                  })}
                  style={{
                    backgroundColor: item.value,
                  }}
                  onClick={e => {
                    e.preventDefault()
                    this.selectItem(item)
                  }}
                  disabled={selected}
                >
                  {item.displayValue}
                </button>
              )
            })
          : this.props.items.map(item => {
              const selected = this.isItemSelected(item)
              return (
                <div
                  key={item.id}
                  title={item.displayValue}
                  className={classNames(styles.value, {
                    [styles.small]: this.props.small,
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
  small: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  reactive: PropTypes.bool.isRequired,
  selectItem: function (props, propName) {
    if (props.reactive && typeof props[propName] !== 'function') {
      return new Error('Please provide a selectItem function!')
    }
  },
}

export default Swatch
