import 'react-native-gesture-handler'
import React from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import AppLoading from 'expo-app-loading'
import {ErrorBoundary} from '/components'
import useFonts from './src/hooks/useFonts'
import RootNavigator from 'navigations/RootNavigator'

export default function App() {
  const [loaded] = useFonts()

  if (!loaded) {
    return <AppLoading />
  }

  return (
    <SafeAreaProvider>
      <ErrorBoundary errorMessage="Mortgage Calculator crash caught by Error Boundary.">
        <RootNavigator />
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}
