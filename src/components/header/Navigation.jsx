import classNames from 'classnames'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import {
  getCategoriesStatus,
  getAllCategories,
} from 'redux/reducers/categoriesSlice'

import styles from 'styles/header/Navigation.module.css'

class Navigation extends PureComponent {
  render() {
    if (this.props.status !== 'succeeded') return <nav></nav>
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
                {category.name.replace(/^\w/, c => c.toUpperCase())}
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
