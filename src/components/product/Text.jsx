import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from 'styles/product/Text.module.css'

class Text extends PureComponent {
  componentDidMount() {
    if (this.props.items[0]) this.selectItem(this.props.items[0])
  }

  isItemSelected = item => {
    return this.props.selected === item.id
  }

  selectItem = item => {
    this.props.selectItem(item.id)
  }

  render() {
    return (
      <div className={styles.text}>
        {this.props.items.map(item => {
          const selected = this.isItemSelected(item)
          return (
            <button
              key={item.id}
              title={item.displayValue}
              className={classNames(styles.value, {
                [styles.selected]: selected,
              })}
              onClick={e => {
                e.preventDefault()
                this.selectItem(item)
              }}
              disabled={selected}
            >
              {item.value}
            </button>
          )
        })}
      </div>
    )
  }
}

Text.propTypes = {
  items: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  selectItem: PropTypes.func.isRequired,
}

export default Text
