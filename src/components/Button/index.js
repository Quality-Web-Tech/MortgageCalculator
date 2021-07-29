import React, {useState} from 'react'
import {Text, Pressable} from 'react-native'
import fontFamily from 'styles/fontFamily'
import colors from 'styles/colors'
import themes from 'styles/themes'
import variables from 'styles/variables'

const TextInput = ({label}) => {
  const [selected, setSelected] = useState(false)
  return (
    <Pressable
      style={{
        borderWidth: 1,
        borderColor: themes.borderActive,
        width: 70,
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: selected ? colors.gray500 : colors.white,
      }}
      onPress={() => setSelected(true)}
    >
      <Text
        style={{
          fontFamily: fontFamily.MONTSERRAT_REGULAR,
          fontSize: variables.fontSizeMedium,
          color: selected ? colors.white : colors.gray500,
        }}
      >
        {label}
      </Text>
    </Pressable>
  )
}

export default TextInput
