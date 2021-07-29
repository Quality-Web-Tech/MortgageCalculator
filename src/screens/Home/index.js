import React, {useState} from 'react'
import {Keyboard} from 'react-native'
import colors from 'styles/colors'
import {MaterialIcons, FontAwesome5} from '@expo/vector-icons'
import variables from 'styles/variables'
import {Container, TextInput} from 'components'
import LoanTerm from './components/LoanTerm'
import moment from 'moment'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {useBasicMortgageCalculator, updateBasicForm} from '../../context/basicMortgageCalculator'

export default function Home() {
  const [{basic}, dispatch] = useBasicMortgageCalculator()

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = startDate => {
    Keyboard.dismiss()
    updateBasicForm('startDate', startDate, dispatch)

    hideDatePicker()
  }

  return (
    <Container>
      <TextInput
        label="Mortgage Amount"
        error={basic.error.mortgageAmount}
        value={basic.mortgageAmount}
        icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        onChangeText={mortgageAmount => updateBasicForm('mortgageAmount', mortgageAmount, dispatch)}
      />

      <LoanTerm
        leftLabel="Length of Loan"
        rightLabel="Years"
        loanTerm={basic.loanTerm}
        onChangeTerm={loanTerm => updateBasicForm('loanTerm', loanTerm, dispatch)}
      />
      <TextInput
        reverse
        value={basic.interest}
        label="Interest Rate"
        error={basic.error.interest}
        icon={<FontAwesome5 name="percent" size={variables.iconSizeExtraSmall} color={colors.gray400} />}
        onChangeText={interest => updateBasicForm('interest', interest, dispatch)}
      />

      <TextInput
        reverse
        clickable={true}
        value={moment(basic.startDate).format('MMMM DD, YYYY')}
        label="Start Date"
        icon={<FontAwesome5 name="calendar-alt" size={variables.iconSizeSmall} color={colors.gray400} />}
        onPress={showDatePicker}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Container>
  )
}
