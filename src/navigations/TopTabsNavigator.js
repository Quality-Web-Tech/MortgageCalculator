import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import colors from 'styles/colors'
import fontFamily from 'styles/fontFamily'
import Home from 'screens/Home'
import Detail from 'screens/Detail'
import Table from 'screens/Table'
import Chart from 'screens/Chart'

const Tab = createMaterialTopTabNavigator()

const TopTabNavigator = ({route}) => {
  return (
    <Tab.Navigator
      // initialRouteName="DETAIL"
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
      <Tab.Screen
        name="INPUT"
        component={Home}
        initialParams={{
          advanceMode: route.name === 'AdvanceHome',
        }}
      />
      <Tab.Screen
        name="DETAIL"
        component={Detail}
        initialParams={{
          advanceMode: route.name === 'AdvanceHome',
        }}
      />
      <Tab.Screen
        name="TABLE"
        component={Table}
        initialParams={{
          advanceMode: route.name === 'AdvanceHome',
        }}
      />
      <Tab.Screen
        name="CHART"
        component={Chart}
        initialParams={{
          advanceMode: route.name === 'AdvanceHome',
        }}
      />
    </Tab.Navigator>
  )
}

export default TopTabNavigator
