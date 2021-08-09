import React from 'react'
import {Platform} from 'react-native'
import colors from 'styles/colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import themes from '../../styles/themes'
import fontFamily from '../../styles/fontFamily'
import RNPickerSelect from 'react-native-picker-select'

export default function Picker({
  value,
  onChange,
  items = [
    {label: 'Year', value: 'year'},
    {label: 'Month', value: 'month'},
  ],
}) {
  return (
    <RNPickerSelect
      onValueChange={value => onChange(value)}
      style={{
        inputAndroid: {
          color: colors.gray600,
        },
        viewContainer: {
          borderWidth: 1,
          borderColor: themes.borderActive,
          borderRadius: 10,
          paddingVertical: 14,
          paddingHorizontal: 10,
          justifyContent: 'center',
        },
        iconContainer: {
          top: Platform.OS === 'ios' ? -3 : 8,
          right: Platform.OS === 'ios' ? 0 : 8,
        },
        inputIOS: {
          fontSize: 14,
          fontFamily: fontFamily.MONTSERRAT_SEMIBOLD,
          color: colors.gray600,
        },
      }}
      value={value}
      items={items}
      Icon={() => {
        return <MaterialCommunityIcons name="chevron-down" size={26} color="gray" />
      }}
    />
  )
}
