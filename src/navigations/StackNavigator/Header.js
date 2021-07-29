import React from 'react'
import {View, Text} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {MenuBar} from 'components'
import styles from 'styles/styles'

const Header = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.headerContainer}>
      <MenuBar />
      <Text style={styles.headerTitle}>Mortgage Calculator</Text>
    </View>
  )
}

export default Header
