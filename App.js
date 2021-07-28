import React from 'react'
import AppLoading from 'expo-app-loading'
import useFonts from './src/hooks/useFonts'
import MortgageCalculator from './src/MortgageCalculator'

export default function App() {
  const [loaded] = useFonts()

  if (!loaded) {
    return <AppLoading />
  }

  return <MortgageCalculator />
}
