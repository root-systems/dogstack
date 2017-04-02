import React from 'react'
import { createComponent } from 'react-fela'

import styles from '../styles/layout'

export default function Layout (props) {
  const Container = createComponent(styles.container, 'div')

  return <Container>
    { props.children }
  </Container>
}
