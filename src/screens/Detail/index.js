import React from 'react'
import {Keyboard, TouchableWithoutFeedback} from 'react-native'
import Basic from './components/Basic'
import Advance from './components/Advance'

export default function Detail({route}) {
  const advanceMode = route.params.advanceMode
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {advanceMode ? <Advance /> : <Basic />}
    </TouchableWithoutFeedback>
  )
}
