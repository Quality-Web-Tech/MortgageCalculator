import React, {useState} from 'react'
import colors from 'styles/colors'
import {MaterialIcons, FontAwesome5} from '@expo/vector-icons'
import variables from 'styles/variables'
import {TextInput} from 'components'
import {INITIAL_STATE} from '../../../context/advanceMortgageCalculator'
import numbro from 'numbro'
import Switch from './Switch'

export default function AdvanceInput({state}) {
  const [input, setInput] = useState(INITIAL_STATE)
  const [pdForDownPayment, setPdForDownPayment] = useState(true)

  return (
    <TextInput
      label="Down Payment"
      keyboardType="decimal-pad"
      reverse={pdForDownPayment}
      optionSwitch={
        <Switch
          value={pdForDownPayment}
          onPress={() => {
            setPdForDownPayment(previousState => {
              const newState = !previousState
              // Update value when switching
              setInput({
                ...input,
                downPayment: {
                  ...input.downPayment,
                  value: input.downPayment[newState],
                },
              })
              return newState
            })
          }}
        />
      }
      value={
        pdForDownPayment ? input.downPayment.value : numbro(input.downPayment.value).format({thousandSeparated: true})
      }
      icon={
        pdForDownPayment ? (
          <FontAwesome5 name="percent" size={variables.iconSizeExtraSmall} color={colors.gray400} />
        ) : (
          <MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />
        )
      }
      onChangeText={downPayment => {
        if (!downPayment) downPayment = pdForDownPayment ? '' : '0'

        handleChange('downPayment', {...input['downPayment'], [pdForDownPayment]: downPayment, value: downPayment})
      }}
    />
  )
}
