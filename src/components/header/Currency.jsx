import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { hasSucceeded } from 'redux/status'
import {
  listCurrencies,
  currencySelected,
  getCurrenciesStatus,
  getCurrencies,
  getSelectedCurrency,
  isCurrencySelected,
} from 'redux/reducers/currenciesSlice'

import styles from 'styles/header/Currency.module.css'
import ArrowIcon from 'icons/arrow.svg'

class Currency extends Component {
  constructor(props) {
    super(props)
    this.state = { overlayShown: false }
    this.buttonRef = createRef()
    this.overlayRef = createRef()
  }

  openOverlay = () => {
    this.setState({ overlayShown: true })
  }

  closeOverlay = () => {
    this.setState({ overlayShown: false })
  }

  toggleOverlay = e => {
    e.preventDefault()
    if (!this.state.overlayShown) this.openOverlay()
    else this.closeOverlay()
  }

  hasClickedOutside = e => {
    e.preventDefault()
    const clickedInside =
      this.overlayRef.current?.contains(e.target) ||
      this.buttonRef.current?.contains(e.target)
    if (!clickedInside) this.closeOverlay()
  }

  componentDidMount() {
    this.props.listCurrencies()
    if (this.state.overlayShown) {
      document.addEventListener('mousedown', this.hasClickedOutside)
    }
  }

  componentDidUpdate() {
    if (this.state.overlayShown) {
      document.addEventListener('mousedown', this.hasClickedOutside)
    } else {
      document.removeEventListener('mousedown', this.hasClickedOutside)
    }
  }

  componentWillUnmount() {
    if (this.state.overlayShown) {
      document.removeEventListener('mousedown', this.hasClickedOutside)
    }
  }

  render() {
    if (!hasSucceeded(this.props.currenciesStatus)) return <div></div>
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
          <span className={styles.symbol}>
            {this.props.selectedCurrency?.symbol}
          </span>
          <img className={styles.arrow} src={ArrowIcon} alt="Arrow Icon" />
        </button>
        {this.state.overlayShown && (
          <div ref={this.overlayRef} className={styles.overlay}>
            <div className={styles.choices}>
              {this.props.currencies.map(currency => {
                const selected = this.props.isCurrencySelected(currency)
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
  currenciesStatus: getCurrenciesStatus(state),
  currencies: getCurrencies(state),
  selectedCurrency: getSelectedCurrency(state),
  isCurrencySelected: currency => isCurrencySelected(state, currency),
})

const mapDispatchToProps = dispatch => ({
  listCurrencies: () => dispatch(listCurrencies()),
  selectCurrency: currency => dispatch(currencySelected(currency)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Currency)
