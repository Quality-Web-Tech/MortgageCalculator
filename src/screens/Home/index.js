import React from 'react'
import {View} from 'react-native'
import colors from 'styles/colors'
import {MaterialIcons, FontAwesome5} from '@expo/vector-icons'
import variables from 'styles/variables'
import {TextInput} from 'components'

export default function Home() {
  return (
    <View style={{padding: 16, flex: 1}}>
      <TextInput
        label="Mortgage Amount"
        icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
      />

      <TextInput
        reverse
        label="Interest Rate"
        icon={<FontAwesome5 name="percent" size={variables.iconSizeSmall} color={colors.gray400} />}
      />

      <TextInput
        reverse
        label="Start Date"
        icon={<FontAwesome5 name="calendar-alt" size={variables.iconSizeSmall} color={colors.gray400} />}
      />
    </View>
  )
}
