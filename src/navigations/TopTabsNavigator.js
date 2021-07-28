import React from 'react'
import {View, Text} from 'react-native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import colors from 'styles/colors'
import fontFamily from 'styles/fontFamily'
import MortgageCalculator from '../MortgageCalculator'

const Tab = createMaterialTopTabNavigator()

const Tester = () => (
  <View>
    <Text>Tester</Text>
  </View>
)

const TopTabNavigator = ({navigation, route}) => {
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
          bottom: 1,
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
      <Tab.Screen name="INPUT" component={MortgageCalculator} />
      <Tab.Screen name="DETAIL" component={Tester} />
      <Tab.Screen name="TABLE" component={Tester} />
      <Tab.Screen name="CHART" component={Tester} />
    </Tab.Navigator>
  )
}

export default TopTabNavigator
