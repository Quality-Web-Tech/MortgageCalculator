import React from 'react'
import {MaterialIcons, FontAwesome5} from '@expo/vector-icons'
import variables from 'styles/variables'
import colors from 'styles/colors'

const handleInputIncon = state => {
  if (state === null) return null

  return state === 0 ? (
    <FontAwesome5 name="percent" size={variables.iconSizeExtraSmall} color={colors.gray400} />
  ) : state === 1 ? (
    <MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />
  ) : state === 2 ? (
    <FontAwesome5 name="calendar-alt" size={variables.iconSizeSmall} color={colors.gray400} />
  ) : null
}

export {handleInputIncon}
