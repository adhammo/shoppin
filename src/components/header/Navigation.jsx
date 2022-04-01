import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

import { hasFailed } from 'redux/status'
import {
  getCategoriesStatus,
  getAllCategories,
} from 'redux/reducers/categoriesSlice'
import { capitalize } from 'util/stringOps'

import styles from 'styles/header/Navigation.module.css'

class Navigation extends PureComponent {
  render() {
    if (hasFailed(this.props.status)) return <nav></nav>
    return (
      <nav className={styles.nav}>
        <ul className={styles.list}>
          {this.props.categories.map(category => (
            <li key={category.name} className={styles.item}>
              <NavLink
                className={({ isActive }) =>
                  classNames(styles.link, { [styles.active]: isActive })
                }
                to={`/category/${category.name}`}
              >
                {capitalize(category.name)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  status: getCategoriesStatus(state),
  categories: getAllCategories(state),
})

export default connect(mapStateToProps)(Navigation)
