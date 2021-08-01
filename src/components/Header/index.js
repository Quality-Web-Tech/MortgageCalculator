import React from 'react'
import {Text, View} from 'react-native'
import colors from '../../styles/colors'
import styles from '../../styles/styles'
import variables from '../../styles/variables'
import {Ionicons} from '@expo/vector-icons'

const Header = ({style, iconColor, textStyle, iconName, navigation}) => {
  return (
    <View style={[styles.headerContainer, style]}>
      <Ionicons
        name={iconName}
        size={variables.iconSizeMedium}
        color={colors[iconColor]}
        onPress={() => navigation.toggleDrawer()}
      />
      <Text style={[styles.headerTitle, textStyle]}>Mortgage Calculator</Text>
    </View>
  )
}

export default Header
