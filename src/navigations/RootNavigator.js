import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {StatusBar} from 'components'
import DrawerNavigator from './DrawerNavigator'

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <DrawerNavigator />
    </NavigationContainer>
  )
}

export default RootNavigator
