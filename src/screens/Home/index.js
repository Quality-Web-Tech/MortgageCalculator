import React from 'react'
import colors from 'styles/colors'
import {MaterialIcons, FontAwesome5} from '@expo/vector-icons'
import variables from 'styles/variables'
import {Container, TextInput} from 'components'
import LoanTerm from './components/LoanTerm'

export default function Home() {
  return (
    <Container>
      <TextInput
        label="Mortgage Amount"
        icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        onChangeText={a => console.log(a)}
      />

      <LoanTerm leftLabel="Length of Loan" rightLabel="Years" />
      <TextInput
        reverse
        label="Interest Rate"
        icon={<FontAwesome5 name="percent" size={variables.iconSizeExtraSmall} color={colors.gray400} />}
      />

      <TextInput
        reverse
        label="Start Date"
        icon={<FontAwesome5 name="calendar-alt" size={variables.iconSizeSmall} color={colors.gray400} />}
        onChangeText={a => console.log(a)}
      />
    </Container>
  )
}
