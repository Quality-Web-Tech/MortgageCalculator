import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import StackNavigator from './StackNavigator'
import {StatusBar} from 'components'

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <StackNavigator />
    </NavigationContainer>
  )
}

export default RootNavigator
