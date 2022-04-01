import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { hasFailed } from 'redux/status'
import {
  currencySelected,
  getCurrenciesStatus,
  getAllCurrencies,
  getSelectedCurrency,
  isCurrencySelected,
} from 'redux/reducers/currenciesSlice'

import styles from 'styles/overlays/Currency.module.css'
import ArrowIcon from 'icons/arrow.svg'

class Currency extends Component {
  constructor(props) {
    super(props)
    this.state = { overlayShown: false }
    this.buttonRef = createRef()
    this.overlayRef = createRef()
  }

  componentWillUnmount() {
    if (this.state.overlayShown) {
      document.removeEventListener('mousedown', this.hasClickedOutside)
    }
  }

  hasClickedOutside = e => {
    e.preventDefault()
    const clickedInside =
      this.overlayRef.current?.contains(e.target) ||
      this.buttonRef.current?.contains(e.target)
    if (!clickedInside) this.closeOverlay()
  }

  openOverlay = () => {
    this.setState({ overlayShown: true }, () => {
      document.addEventListener('mousedown', this.hasClickedOutside)
    })
  }

  closeOverlay = () => {
    this.setState({ overlayShown: false }, () => {
      document.removeEventListener('mousedown', this.hasClickedOutside)
    })
  }

  toggleOverlay = e => {
    e.preventDefault()
    if (!this.state.overlayShown) this.openOverlay()
    else this.closeOverlay()
  }

  render() {
    if (hasFailed(this.props.status)) return <div></div>
    return (
      <div className={styles.currency}>
        <button
          ref={this.buttonRef}
          className={classNames(styles.button, {
            [styles.active]: this.state.overlayShown,
          })}
          onClick={this.toggleOverlay}
          title="Currency"
        >
          <span className={styles.symbol}>{this.props.selected?.symbol}</span>
          <img className={styles.arrow} src={ArrowIcon} alt="Arrow Icon" />
        </button>
        {this.state.overlayShown && (
          <div ref={this.overlayRef} className={styles.overlay}>
            <div className={styles.choices}>
              {this.props.currencies.map(currency => {
                const selected = this.props.isSelected(currency)
                return (
                  <button
                    key={currency.label}
                    className={classNames(styles.choice, {
                      [styles.selected]: selected,
                    })}
                    onClick={e => {
                      e.preventDefault()
                      this.props.selectCurrency(currency)
                      this.closeOverlay()
                    }}
                    disabled={selected}
                  >
                    {`${currency.symbol} ${currency.label}`}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  status: getCurrenciesStatus(state),
  currencies: getAllCurrencies(state),
  selected: getSelectedCurrency(state),
  isSelected: currency => isCurrencySelected(state, currency),
})

const mapDispatchToProps = dispatch => ({
  selectCurrency: currency => dispatch(currencySelected(currency)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Currency)
