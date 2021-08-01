import React from 'react'
import variables from 'styles/variables'
import colors from 'styles/colors'
import {Ionicons} from '@expo/vector-icons'

const MenuBar = ({navigation}) => {
  return (
    <Ionicons
      name={false ? 'md-arrow-back' : 'ios-menu'}
      size={variables.iconSizeMedium}
      color={colors.white}
      // onPress={() => nav.dispatch(DrawerActions.toggleDrawer())}
    />
  )
}

export {MenuBar}
