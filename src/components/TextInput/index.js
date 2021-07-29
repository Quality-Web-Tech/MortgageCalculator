import React from 'react'
import {Text, View, TextInput as NativeInput, Keyboard, Pressable} from 'react-native'
import styles from 'styles/styles'
import colors from '../../styles/colors'

const TextInputContainer = ({label, icon, reverse = false, error, children}) => {
  return (
    <View style={{marginVertical: 8}}>
      <Text style={styles.textInputLabel}>{label}</Text>
      <View
        style={[
          {flexDirection: reverse ? 'row-reverse' : 'row'},
          styles.textInputContainer,
          error ? {borderColor: colors.error} : {},
        ]}
      >
        {icon}
        {children}
      </View>
    </View>
  )
}

const TextInput = ({clickable, ...props}) => {
  return (
    <TextInputContainer {...props}>
      {clickable ? (
        <Pressable style={[styles.textInput, {justifyContent: 'center'}]} onBlur={Keyboard.dismiss} {...props}>
          <Text style={[styles.textInputLabel, {fontSize: 18, color: '#475569'}]}>{props.value}</Text>
        </Pressable>
      ) : (
        <NativeInput style={styles.textInput} onBlur={Keyboard.dismiss} {...props} />
      )}
    </TextInputContainer>
  )
}

export default TextInput
