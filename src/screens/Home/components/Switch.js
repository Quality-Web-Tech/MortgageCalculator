import React, {useState} from 'react'
import {View, Text, Switch as NativeSwitch} from 'react-native'
import colors from 'styles/colors'
import {MaterialIcons, FontAwesome5} from '@expo/vector-icons'
import variables from 'styles/variables'
import fontFamily from '../../../styles/fontFamily'

export default function Switch({term, value, onToggle}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {term ? (
        <Text
          style={{fontSize: 14, fontFamily: fontFamily.MONTSERRAT_BOLD, color: value ? colors.gray300 : colors.gray600}}
        >
          Yr
        </Text>
      ) : (
        <MaterialIcons
          name="attach-money"
          size={variables.iconSizeSmall}
          color={value ? colors.gray300 : colors.gray600}
        />
      )}
      <NativeSwitch
        trackColor={{false: colors.gray600, true: colors.gray600}}
        thumbColor={colors.gray200}
        ios_backgroundColor={colors.gray600}
        onValueChange={onToggle}
        value={value}
        style={{transform: [{scaleX: 0.6}, {scaleY: 0.6}]}}
      />
      {term ? (
        <Text
          style={{
            fontSize: 14,
            fontFamily: fontFamily.MONTSERRAT_BOLD,
            color: !value ? colors.gray300 : colors.gray600,
          }}
        >
          Mth
        </Text>
      ) : (
        <FontAwesome5 name="percent" size={variables.iconSizeXXSmall} color={value ? colors.gray600 : colors.gray300} />
      )}
    </View>
  )
}
