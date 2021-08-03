import React, {useState} from 'react'
import {Keyboard, TouchableWithoutFeedback, View, Text, ScrollView} from 'react-native'
import colors from 'styles/colors'
import {MaterialIcons, FontAwesome5} from '@expo/vector-icons'
import variables from 'styles/variables'
import {Container, TextInput} from 'components'
import LoanTerm from './LoanTerm'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {useBasicMortgageCalculator, updateBasicForm} from '../../../context/basicMortgageCalculator'
import {formatDate} from '../../../utils/formatter'
import {INITIAL_STATE} from '../../../context/advanceMortgageCalculator'
import {debounce} from 'lodash/fp'
import numbro from 'numbro'
import Switch from './Switch'
import fontFamily from '../../../styles/fontFamily'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

export default function Home() {
  const [, dispatch] = useBasicMortgageCalculator()

  const [input, setInput] = useState(INITIAL_STATE)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [pdForDownPayment, setPdForDownPayment] = useState(true)
  const [pdForTermLength, setPdForTermLength] = useState(false)
  const [pdForPMI, setPdForPMI] = useState(true)
  const [pdForPropertyTax, setPdForPropertyTax] = useState(false)
  const [pdForHomeInsurance, setPdForHomeInsurance] = useState(false)
  const [inputWithDate, setInputWithDate] = useState()

  const showDatePicker = key => {
    setInputWithDate(key)
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = date => {
    Keyboard.dismiss()

    if (inputWithDate) {
      setInput({
        ...input,
        [inputWithDate]: {
          ...input[inputWithDate],
          startDate: date,
        },
      })
    } else {
      handleChange('startDate', date)
    }

    hideDatePicker()
  }

  const onChangeHandler = React.useCallback(
    debounce(400, (...args) => updateBasicForm(...args)),
    [],
  )

  const handleChange = (label, value) => {
    if (typeof value === 'string' && !value) {
      value = label === 'homeValue' || label === 'hoaFess' ? '0' : ''
    }

    setInput({...input, [label]: value})
    // onChangeHandler(label, value, dispatch)
  }

  const handleInputSwitchOnPress = (setState, key) => () => {
    setState(previousState => {
      const newState = !previousState

      setInput({
        ...input,
        [key]: {
          ...input[key],
          value: input[key][newState],
        },
      })
      return newState
    })
  }

  const handleInputOnChangeText = (value, state, key) => {
    if (!value) value = state ? '' : '0'

    handleChange(`${key}`, {
      ...input[key],
      [state]: value,
      value,
    })
  }

  const handleInputIncon = state => {
    if (state === null) return null

    return state ? (
      <FontAwesome5 name="percent" size={variables.iconSizeExtraSmall} color={colors.gray400} />
    ) : (
      <MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />
    )
  }

  const handleInputValue = (state, key) =>
    state ? input[key].value : numbro(input[key].value).format({thousandSeparated: true})

  const handleInputWithDate = (key, value) => {
    if (typeof value === 'string' && !value) {
      value = key === 'oneTime' || key === 'monthlyOrBiWeekly' || key === 'quarterly' || key === 'yearly' ? '0' : ''
    }

    setInput({
      ...input,
      [key]: {
        ...input[key],
        payment: value,
      },
    })
  }

  // console.log(input.oneTime, inputWithDate)
  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView>
          <Container>
            <TextInput
              label="Home Value"
              keyboardType="decimal-pad"
              value={numbro(input.homeValue).format({thousandSeparated: true})}
              icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
              onChangeText={homeValue => handleChange('homeValue', homeValue)}
            />

            <TextInput
              label="Down Payment"
              keyboardType="decimal-pad"
              reverse={pdForDownPayment}
              optionSwitch={
                <Switch
                  value={pdForDownPayment}
                  onPress={handleInputSwitchOnPress(setPdForDownPayment, 'downPayment')}
                />
              }
              value={handleInputValue(pdForDownPayment, 'downPayment')}
              icon={handleInputIncon(pdForDownPayment)}
              onChangeText={value => handleInputOnChangeText(value, pdForDownPayment, 'downPayment')}
            />

            <TextInput
              label="Mortgage Amount"
              keyboardType="decimal-pad"
              value={numbro(input.mortgageAmount).format({thousandSeparated: true})}
              icon={handleInputIncon(0)}
              onChangeText={value => handleChange('mortgageAmount', value)}
            />

            <TextInput
              label="Length Of Loan"
              keyboardType="decimal-pad"
              optionSwitch={
                <Switch
                  term
                  value={pdForTermLength}
                  onPress={handleInputSwitchOnPress(setPdForTermLength, 'loanTerm')}
                />
              }
              value={handleInputValue(pdForTermLength, 'loanTerm')}
              onChangeText={value => handleInputOnChangeText(value, pdForTermLength, 'loanTerm')}
            />

            <TextInput
              reverse
              value={input.interest}
              label="Interest Rate"
              keyboardType="decimal-pad"
              icon={handleInputIncon(1)}
              onChangeText={interest => handleChange('interest', interest)}
            />

            <TextInput
              label="PMI (Yearly)"
              keyboardType="decimal-pad"
              reverse
              optionSwitch={<Switch value={pdForPMI} onPress={handleInputSwitchOnPress(setPdForPMI, 'pmi')} />}
              value={handleInputValue(pdForPMI, 'pmi')}
              icon={handleInputIncon(pdForPMI)}
              onChangeText={value => handleInputOnChangeText(value, pdForPMI, 'pmi')}
            />

            <TextInput
              label="Property Tax (Yearly)"
              keyboardType="decimal-pad"
              reverse
              optionSwitch={
                <Switch
                  value={pdForPropertyTax}
                  onPress={handleInputSwitchOnPress(setPdForPropertyTax, 'propertTax')}
                />
              }
              value={handleInputValue(pdForPropertyTax, 'propertTax')}
              icon={handleInputIncon(pdForPropertyTax)}
              onChangeText={value => handleInputOnChangeText(value, pdForPropertyTax, 'propertTax')}
            />

            <TextInput
              label="Home Insurance (Yearly)"
              keyboardType="decimal-pad"
              reverse
              optionSwitch={
                <Switch
                  value={pdForHomeInsurance}
                  onPress={handleInputSwitchOnPress(setPdForHomeInsurance, 'homeInsurance')}
                />
              }
              value={handleInputValue(pdForHomeInsurance, 'homeInsurance')}
              icon={handleInputIncon(pdForHomeInsurance)}
              onChangeText={value => handleInputOnChangeText(value, pdForHomeInsurance, 'homeInsurance')}
            />

            <TextInput
              value={numbro(input.hoaFess).format({thousandSeparated: true})}
              label="HOA Fees (Monthly)"
              keyboardType="decimal-pad"
              icon={handleInputIncon(0)}
              onChangeText={value => handleChange('hoaFess', value)}
            />

            <LoanTerm
              value={input.paymentFrequency}
              leftLabel="Payment Frequency"
              data={['Monthly', 'Bi-Weekly']}
              onChange={value => handleChange('paymentFrequency', value)}
            />

            <TextInput
              reverse
              clickable={true}
              value={formatDate(input.startDate)}
              label="Start Date"
              icon={<FontAwesome5 name="calendar-alt" size={variables.iconSizeSmall} color={colors.gray400} />}
              onPress={showDatePicker}
            />

            <Text style={{fontFamily: fontFamily.MONTSERRAT_BOLD, color: colors.gray600, marginVertical: 16}}>
              EXTRA PAYMENT
            </Text>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
                containerStyle={{width: '45%'}}
                value={numbro(input.oneTime.payment).format({thousandSeparated: true})}
                label="One Time"
                keyboardType="decimal-pad"
                icon={handleInputIncon(0)}
                onChangeText={value => handleInputWithDate('oneTime', value)}
              />
              <TextInput
                containerStyle={{width: '45%'}}
                inputPressableStyle={{fontSize: 12}}
                reverse
                clickable={true}
                value={formatDate(input.oneTime.startDate)}
                label="On"
                icon={<FontAwesome5 name="calendar-alt" size={variables.iconSizeSmall} color={colors.gray400} />}
                onPress={() => showDatePicker('oneTime')}
              />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
                containerStyle={{width: '45%'}}
                value={numbro(input.monthlyOrBiWeekly.payment).format({thousandSeparated: true})}
                label="Monthly or Bi-Weekly"
                keyboardType="decimal-pad"
                icon={handleInputIncon(0)}
                onChangeText={value => handleInputWithDate('monthlyOrBiWeekly', value)}
              />
              <TextInput
                containerStyle={{width: '45%'}}
                inputPressableStyle={{fontSize: 12}}
                reverse
                clickable={true}
                value={formatDate(input.monthlyOrBiWeekly.startDate)}
                label="On"
                icon={<FontAwesome5 name="calendar-alt" size={variables.iconSizeSmall} color={colors.gray400} />}
                onPress={() => showDatePicker('monthlyOrBiWeekly')}
              />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
                containerStyle={{width: '45%'}}
                value={numbro(input.quarterly.payment).format({thousandSeparated: true})}
                label="Quarterly"
                keyboardType="decimal-pad"
                icon={handleInputIncon(0)}
                onChangeText={value => handleInputWithDate('quarterly', value)}
              />
              <TextInput
                containerStyle={{width: '45%'}}
                inputPressableStyle={{fontSize: 12}}
                reverse
                clickable={true}
                value={formatDate(input.quarterly.startDate)}
                label="On"
                icon={<FontAwesome5 name="calendar-alt" size={variables.iconSizeSmall} color={colors.gray400} />}
                onPress={() => showDatePicker('quarterly')}
              />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
                containerStyle={{width: '45%'}}
                value={numbro(input.yearly.payment).format({thousandSeparated: true})}
                label="Yearly"
                keyboardType="decimal-pad"
                icon={handleInputIncon(0)}
                onChangeText={value => handleInputWithDate('yearly', value)}
              />
              <TextInput
                containerStyle={{width: '45%'}}
                inputPressableStyle={{fontSize: 12}}
                reverse
                clickable={true}
                value={formatDate(input.yearly.startDate)}
                label="On"
                icon={<FontAwesome5 name="calendar-alt" size={variables.iconSizeSmall} color={colors.gray400} />}
                onPress={() => showDatePicker('yearly')}
              />
            </View>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </Container>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}
