import React from 'react'
import {Text, View, TextInput as NativeInput, Keyboard} from 'react-native'
import fontFamily from 'styles/fontFamily'
import colors from 'styles/colors'
import themes from 'styles/themes'
import variables from 'styles/variables'

const TextInput = ({label, icon, reverse = false, ...props}) => {
  return (
    <View style={{marginVertical: 8}}>
      <Text
        style={{
          fontFamily: fontFamily.MONTSERRAT_REGULAR,
          fontSize: 14,
          color: colors.gray500,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          flexDirection: reverse ? 'row-reverse' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 60,
          marginVertical: 8,
          borderWidth: 1,
          borderColor: themes.borderActive,
          borderRadius: 8,
          padding: 16,
        }}
      >
        {icon}
        <NativeInput
          style={{
            flex: 1,
            height: 30,
            marginLeft: 4,
            fontSize: variables.fontSizeMedium,
            fontFamily: fontFamily.MONTSERRAT_REGULAR,
            color: colors.gray600,
          }}
          onBlur={Keyboard.dismiss}
          {...props}
        />
      </View>
    </View>
  )
}

export default TextInput
