import React from 'react'
import {View, Text} from 'react-native'
import {useNavigation, DrawerActions} from '@react-navigation/native'
import {MenuBar} from 'components'
import styles from 'styles/styles'
import colors from 'styles/colors'

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
