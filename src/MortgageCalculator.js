import {StatusBar} from 'expo-status-bar'
import React from 'react'
import {Text} from 'react-native'
import {Container} from './components'
import fontFamily from './styles/fontFamily'
import colors from './styles/colors'

export default function App() {
  return (
    <Container style={{borderWidth: 1, borderColor: 'red'}}>
      <Text
        style={{
          fontFamily: fontFamily.MONTSERRAT_REGULAR,
          fontSize: 14,
          color: colors.gray500,
        }}
      >
        Calculator Mortgage
      </Text>
      <StatusBar style="auto" />
    </Container>
  )
}
