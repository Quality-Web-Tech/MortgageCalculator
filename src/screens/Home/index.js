import React, {useState} from 'react'
import {Keyboard, TouchableWithoutFeedback} from 'react-native'
import colors from 'styles/colors'
import {MaterialIcons, FontAwesome5} from '@expo/vector-icons'
import variables from 'styles/variables'
import {Container, TextInput} from 'components'
import LoanTerm from './components/LoanTerm'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {useBasicMortgageCalculator, updateBasicForm} from '../../context/basicMortgageCalculator'
import {formatDate} from '../../utils/formatter'
import {INITIAL_STATE} from '../../context/basicMortgageCalculator'
import {debounce} from 'lodash/fp'
import numbro from 'numbro'

export default function Home() {
  const [, dispatch] = useBasicMortgageCalculator()

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [input, setInput] = useState(INITIAL_STATE)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = startDate => {
    Keyboard.dismiss()
    handleChange('startDate', startDate)
    hideDatePicker()
  }

  const onChangeHandler = React.useCallback(
    debounce(400, (...args) => updateBasicForm(...args)),
    [],
  )

  const handleChange = (label, value) => {
    if (!value) {
      value = label === 'mortgageAmount' ? '0' : ''
    }

    setInput({...input, [label]: value})
    onChangeHandler(label, value, dispatch)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        <TextInput
          label="Mortgage Amount"
          error={input.error.mortgageAmount}
          onFocus={() => handleChange('mortgageAmount', 0)}
          keyboardType="decimal-pad"
          value={numbro(input.mortgageAmount).format({thousandSeparated: true})}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
          onChangeText={mortgageAmount => handleChange('mortgageAmount', mortgageAmount)}
        />

        <LoanTerm
          leftLabel="Length of Loan"
          rightLabel="Years"
          loanTerm={input.loanTerm}
          onChangeTerm={loanTerm => handleChange('loanTerm', loanTerm)}
        />
        <TextInput
          reverse
          value={input.interest}
          label="Interest Rate"
          error={input.error.interest}
          keyboardType="decimal-pad"
          onFocus={() => handleChange('interest', '')}
          icon={<FontAwesome5 name="percent" size={variables.iconSizeExtraSmall} color={colors.gray400} />}
          onChangeText={interest => handleChange('interest', interest)}
        />

        <TextInput
          reverse
          clickable={true}
          value={formatDate(input.startDate)}
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
    </TouchableWithoutFeedback>
  )
}
