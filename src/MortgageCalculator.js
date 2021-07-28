import {StatusBar} from 'expo-status-bar'
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import fontFamily from './styles/fontFamily'
import colors from './styles/colors'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{fontFamily: fontFamily.MONTSERRAT_BOLD, fontSize: 20, color: colors.green}}>
        Calculator Mortgage
      </Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
