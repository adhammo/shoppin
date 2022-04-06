import React from 'react'

import styles from 'styles/pages/HomePage.module.css'

function HomePage() {
  return (
    <div className={styles.home}>
      <div className={styles.content}>
        <h1>Hello There! 👋</h1>
        <p>
          My name is <strong>Adham Mohamed</strong>, go check my{' '}
          <a href="https://github.com/adhammo" target="_blank" rel="noreferrer">
            GitHub
          </a>
          .
        </p>
        <p>
          This is a shopping website made with React.js as a task for{' '}
          <a href="https://scandiweb.com/" target="_blank" rel="noreferrer">
            Scandiweb
          </a>
          .
        </p>
        <p>
          It uses Apollo to fetch data from a GraphQL endpoint, populating a responsive
          UI, while using Redux to manage its state and React Router for a SPA
          experience.
        </p>
        <p>
          You can find the code for this task{' '}
          <a
            href="https://github.com/adhammo/shoppin"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          .
        </p>
      </div>
    </div>
  )
}

export default HomePage
