import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import DrawerNavigator from '../DrawerNavigator'
import colors from 'styles/colors'
import Header from './Header'

const Stack = createStackNavigator()

export const StackNavigator = () => (
  <Stack.Navigator headerMode="screen">
    <Stack.Screen
      name="Home"
      component={DrawerNavigator}
      options={{
        headerTitle: () => <Header />,
        headerStyle: {
          backgroundColor: colors.gray600,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleContainerStyle: {
          width: '100%',
          left: 0,
        },
      }}
    />
  </Stack.Navigator>
)

export default StackNavigator
