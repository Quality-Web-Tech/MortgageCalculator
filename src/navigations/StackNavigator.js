import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import TopTabNavigator from './TopTabsNavigator'
import colors from 'styles/colors'
import {Header} from '../components'
import About from '../screens/About'

const Stack = createStackNavigator()

export const StackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Home"
        component={TopTabNavigator}
        options={{
          swipeEnabled: true,
          headerTitle: () => <Header iconName="ios-menu" iconColor="white" onPress={() => navigation.toggleDrawer()} />,
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

      <Stack.Screen
        name="AdvanceHome"
        component={TopTabNavigator}
        options={{
          headerLeft: null,
          gestureEnabled: false,
          headerTitle: () => (
            <Header
              label="Advance Mortgage Calculator"
              iconName="md-arrow-back"
              iconColor="white"
              onPress={() => navigation.goBack()}
            />
          ),
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

      <Stack.Screen
        name="About"
        component={About}
        options={{
          headerLeft: null,
          gestureEnabled: false,
          headerTitle: () => (
            <Header label="About" iconName="md-arrow-back" iconColor="white" onPress={() => navigation.goBack()} />
          ),
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
