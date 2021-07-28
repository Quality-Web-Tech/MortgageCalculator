import React from 'react'
import {View} from 'react-native'
import ScreenWrapper from '../ScreenWrapper'
import styles from '/styles/styles'

const Container = ({style = {}, ...props}) => {
  return (
    <ScreenWrapper>
      <View style={[styles.p3, styles.flex1, style]} {...props} />
    </ScreenWrapper>
  )
}

export default Container
