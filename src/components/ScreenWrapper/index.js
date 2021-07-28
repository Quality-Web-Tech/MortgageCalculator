import React from 'react'
import {View} from 'react-native'
import {SafeAreaInsetsContext} from 'react-native-safe-area-context'
import styles from 'styles/styles'

/**
 * Takes safe area insets and returns padding to use for a View
 *
 * @param {Object} insets
 * @returns {Object}
 */
function getSafeAreaPadding(insets) {
  return {
    paddingTop: insets.top,
  }
}

const ScreenWrapper = ({style = {}, ...props}) => {
  return (
    <SafeAreaInsetsContext.Consumer>
      {insets => {
        return <View style={[style, styles.flex1, getSafeAreaPadding(insets)]} {...props} />
      }}
    </SafeAreaInsetsContext.Consumer>
  )
}

export default ScreenWrapper
