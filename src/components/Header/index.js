import React from 'react'
import {Text, View} from 'react-native'
import colors from '../../styles/colors'
import styles from '../../styles/styles'
import variables from '../../styles/variables'
import {Ionicons} from '@expo/vector-icons'

const Header = ({label = 'Mortgage Calculator', style, iconColor, textStyle, iconName, onPress}) => {
  return (
    <View style={[styles.headerContainer, style]}>
      <Ionicons name={iconName} size={variables.iconSizeMedium} color={colors[iconColor]} onPress={onPress} />
      <Text style={[styles.headerTitle, textStyle]}>{label}</Text>
    </View>
  )
}

export default Header
