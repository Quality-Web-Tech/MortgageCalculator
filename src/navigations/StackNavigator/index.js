import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import TopTabNavigator from '../TopTabsNavigator'
import colors from 'styles/colors'
import {Header} from '../../components'

const Stack = createStackNavigator()

export const StackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Home"
        component={TopTabNavigator}
        options={{
          headerTitle: () => <Header navigation={navigation} iconName="ios-menu" iconColor="white" />,
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
}
export default StackNavigator
