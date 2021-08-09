import React, {useState} from 'react'
import Switch from './Switch'

import {handleInputIncon} from './helper'

const InputSwitch = ({initialState = true, term = false, setter = () => null, state, children}) => {
  const [on, setOn] = useState(initialState)
  const [data, setData] = useState(state)
  const toggle = () => setOn(!on)

  return React.Children.map(children, child => {
    return React.cloneElement(child, {
      reverse: on,
      icon: term ? null : handleInputIncon(on),
      value: child.props.valueSetter(data[on]),
      optionSwitch: (
        <Switch
          term={term}
          value={on}
          onToggle={() => {
            setter()
            toggle()
            setData(state)
          }}
        />
      ),
      onChangeText: val => {
        return child.props.onChangeText(val, data[on])
      },
    })
  })
}

export default InputSwitch
