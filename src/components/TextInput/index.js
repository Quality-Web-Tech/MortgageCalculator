import React from 'react'
import {Text, View, TextInput as NativeInput, Keyboard, Pressable} from 'react-native'
import styles from 'styles/styles'
import colors from '../../styles/colors'

const TextInputContainer = ({
  label,
  icon,
  reverse = false,
  error,
  editable = true,
  containerStyle,
  optionSwitch,
  children,
}) => {
  return (
    <View style={[{marginVertical: 8}, containerStyle]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={styles.textInputLabel}>{label}</Text>
        {optionSwitch}
      </View>
      <View
        style={[
          {flexDirection: reverse ? 'row-reverse' : 'row'},
          styles.textInputContainer,
          error ? {borderColor: colors.error} : {},
          editable ? {} : {borderColor: colors.gray200, backgroundColor: colors.gray100},
        ]}
      >
        {icon}
        {children}
      </View>
    </View>
  )
}

const TextInput = ({clickable, inputStyle, inputPressableStyle, onChangeText = () => null, ...props}) => {
  return (
    <TextInputContainer {...props}>
      {clickable ? (
        // This component is for oppening a calendar input
        <Pressable style={[styles.textInput, {justifyContent: 'center'}]} onBlur={Keyboard.dismiss} {...props}>
          <Text style={[styles.textInputLabel, {fontSize: 18, color: colors.gray600}, inputPressableStyle]}>
            {props.value}
          </Text>
        </Pressable>
      ) : (
        <NativeInput
          style={[styles.textInput, inputStyle]}
          onBlur={Keyboard.dismiss}
          {...props}
          onChangeText={val => onChangeText(val)}
        />
      )}
    </TextInputContainer>
  )
}

export default TextInput
