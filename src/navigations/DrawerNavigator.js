import React from 'react'
import {View, Text} from 'react-native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import TopTabsNavigator from './TopTabsNavigator'

const Drawer = createDrawerNavigator()

export const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerPosition="left"
    drawerContent={props => (
      <View style={{flex: 1, borderWidth: 1, borderColor: 'red'}}>
        <Text>Hi ho</Text>
      </View>
    )}
    drawerContentOptions={{
      inactiveTintColor: 'white',
      activeTintColor: 'black',
      activeBackgroundColor: 'white',
    }}
  >
    <Drawer.Screen name="Home" component={TopTabsNavigator} options={{headerShown: false}} />
  </Drawer.Navigator>
)

export default DrawerNavigator
