import React from 'react'
import {View, Text} from 'react-native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import colors from 'styles/colors'
import fontFamily from 'styles/fontFamily'
import Home from 'screens/Home'
import Detail from 'screens/Detail'
import Table from 'screens/Table'

const Tab = createMaterialTopTabNavigator()

const Tester = () => (
  <View>
    <Text>Tester</Text>
  </View>
)

const TopTabNavigator = () => {
  return (
    <Tab.Navigator
      lazy
      tabBarOptions={{
        inactiveTintColor: colors.gray400,
        activeTintColor: colors.white,

        indicatorStyle: {
          borderWidth: 2,
          width: 55,
          left: '6%',
          bottom: 2,
          borderRadius: 2,
          borderColor: colors.white,
        },
        labelStyle: {
          fontSize: 12,
          fontFamily: fontFamily.MONTSERRAT_BOLD,
        },
        style: {
          backgroundColor: colors.gray600,
        },
      }}
    >
      <Tab.Screen name="INPUT" component={Home} />
      <Tab.Screen name="DETAIL" component={Detail} />
      <Tab.Screen name="TABLE" component={Table} />
      <Tab.Screen name="CHART" component={Tester} />
    </Tab.Navigator>
  )
}

export default TopTabNavigator
