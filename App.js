import React from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import AppLoading from 'expo-app-loading'
import useFonts from './src/hooks/useFonts'
import MortgageCalculator from './src/MortgageCalculator'

export default function App() {
  const [loaded] = useFonts()

  if (!loaded) {
    return <AppLoading />
  }

  return (
    <SafeAreaProvider>
      <MortgageCalculator />
    </SafeAreaProvider>
  )
}
