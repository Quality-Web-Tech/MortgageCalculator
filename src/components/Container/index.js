import React from 'react'
import {View} from 'react-native'
import colors from 'styles/colors'
import styles from 'styles/styles'

const Container = ({style = {}, ...props}) => {
  return <View style={[styles.p4, styles.flex1, {backgroundColor: colors.white}, style]} {...props} />
}

export default Container
