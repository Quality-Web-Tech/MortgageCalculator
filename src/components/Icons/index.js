import React from 'react'
import variables from 'styles/variables'
import colors from 'styles/colors'
import {Ionicons} from '@expo/vector-icons'
import {useNavigation, DrawerActions} from '@react-navigation/native'

const MenuBar = () => {
  const navigation = useNavigation()

  return (
    <Ionicons
      name="ios-menu"
      size={variables.iconSizeMedium}
      color={colors.white}
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
    />
  )
}

export {MenuBar}
