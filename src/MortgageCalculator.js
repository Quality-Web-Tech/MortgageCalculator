import React from 'react'
import {Text, View} from 'react-native'
import fontFamily from './styles/fontFamily'
import colors from './styles/colors'

export default function App({navigation}) {
  return (
    <View style={{borderWidth: 1, borderColor: 'red'}}>
      <Text
        style={{
          fontFamily: fontFamily.MONTSERRAT_REGULAR,
          fontSize: 14,
          color: colors.gray500,
        }}
      >
        Calculator Mortgage
      </Text>
    </View>
  )
}
