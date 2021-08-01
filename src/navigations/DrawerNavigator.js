import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {Container, ScreenWrapper, Header} from '../components'
import {createDrawerNavigator} from '@react-navigation/drawer'
import StackNavigator from './StackNavigator'
import colors from '../styles/colors'
import fontFamily from '../styles/fontFamily'

const Drawer = createDrawerNavigator()

const SideBar = ({navigation}) => {
  return (
    <ScreenWrapper>
      <Container>
        <Header
          navigation={navigation}
          iconName="md-arrow-back"
          iconColor="gray600"
          style={{
            flexDirection: 'row',
            height: 42,
            position: 'absolute',
            backgroundColor: 'white',
            paddingHorizontal: 16,
            marginTop: 5,
            alignItems: 'center',
          }}
          textStyle={{
            color: colors.gray600,
          }}
        />
        <View style={{marginTop: 42}}>
          <TouchableOpacity style={{marginBottom: 16}}>
            <Text style={{fontSize: 14, color: colors.gray600, fontFamily: fontFamily.MONTSERRAT_SEMIBOLD}}>
              Advance Mortgage Calculator
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={{fontSize: 14, color: colors.gray600, fontFamily: fontFamily.MONTSERRAT_SEMIBOLD}}>About</Text>
          </TouchableOpacity>
        </View>
      </Container>
    </ScreenWrapper>
  )
}

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerContent={SideBar}
      drawerContentOptions={{
        inactiveTintColor: 'white',
        activeTintColor: 'black',
        activeBackgroundColor: 'white',
      }}
    >
      <Drawer.Screen name="Home" component={StackNavigator} options={{headerShown: false}} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
