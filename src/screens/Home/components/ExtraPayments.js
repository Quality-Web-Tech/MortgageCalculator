import React from 'react'
import {View} from 'react-native'
import {formatDate, formatNumber} from '../../../utils/formatter'
import {handleInputIncon} from './helper'
import {TextInput} from 'components'

export default function ExtraPeyment({form, data, onDateSelect, handleOnChangeText}) {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <TextInput
        containerStyle={{width: '45%'}}
        value={formatNumber(form[data.key].payment)}
        label={data.leftLabel}
        keyboardType="decimal-pad"
        icon={handleInputIncon(1)}
        onChangeText={handleOnChangeText}
      />

      <TextInput
        containerStyle={{width: '45%'}}
        inputPressableStyle={{fontSize: 12}}
        reverse
        clickable={true}
        value={formatDate(form[data.key].startDate)}
        label={data.rightLabel}
        icon={handleInputIncon(2)}
        onPress={onDateSelect}
      />
    </View>
  )
}
