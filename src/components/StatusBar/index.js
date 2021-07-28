import React from 'react'
import {View, Platform} from 'react-native'
import {StatusBar as ExpoStatusBar} from 'expo-status-bar'
import styles from 'styles/styles'
import colors from '/styles/colors'

const StatusBar = () => {
  return (
    <>
      {/* Ios does not support setting status background color */}
      {Platform.OS === 'ios' && <View style={styles.statusBar} />}

      <ExpoStatusBar style="light" backgroundColor={colors.gray600} />
    </>
  )
}

export default StatusBar
