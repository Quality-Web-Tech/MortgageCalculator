import React from 'react'
import {Keyboard, TouchableWithoutFeedback, Text} from 'react-native'
import Basic from './components/Basic'
import Advance from './components/Advance'

export default function Home({route}) {
  const advanceMode = route.params.advanceMode
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {advanceMode ? <Advance /> : <Basic />}
    </TouchableWithoutFeedback>
  )
}
