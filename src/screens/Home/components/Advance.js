import React, {useState} from 'react'
import {Keyboard, TouchableWithoutFeedback, View, Text, ScrollView} from 'react-native'
import colors from 'styles/colors'
import {MaterialIcons, FontAwesome5} from '@expo/vector-icons'
import variables from 'styles/variables'
import {Container, TextInput} from 'components'
import LoanTerm from './LoanTerm'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {useAdvanceMortgageCalculator, updateAdvanceForm} from '../../../context/advanceMortgageCalculator'
import {formatDate} from '../../../utils/formatter'
import {FORM_INITIAL_STATE} from '../../../context/advanceMortgageCalculator'
import {debounce} from 'lodash/fp'
import numbro from 'numbro'
import Switch from './Switch'
import fontFamily from '../../../styles/fontFamily'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

const calculateMortgageAmoit = state => {
  let {homeValue, downPayment} = state

  let {value: percent, percent: isPercent} = downPayment
  homeValue = Number(homeValue.replace(/\,/g, ''))
  let dp

  if (isPercent) {
    percent /= 100
    mortgageAmount = homeValue - homeValue * percent
  } else {
    percent = Number(percent.replace(/\,/g, ''))
    mortgageAmount = homeValue - percent
  }

  return {mortgageAmount, homeValue}
}

export default function Home() {
  const [, dispatch] = useAdvanceMortgageCalculator()

  const [input, setInput] = useState(FORM_INITIAL_STATE)
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

    if (inputWithDate !== 'startDate') {
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
    debounce(400, (...args) => updateAdvanceForm(...args)),
    [],
  )

  // Function that update the input state and global input
  const handleChange = (key, value) => {
    let newInputState = {...input, [key]: value}

    // calculate new mortgage
    let {mortgageAmount, homeValue} = calculateMortgageAmoit(newInputState)

    setInput({...newInputState, mortgageAmount})
    onChangeHandler({...newInputState, mortgageAmount, homeValue}, dispatch)
  }

  const handleInputSwitchOnPress = (setState, key, type) => () => {
    setState(previousState => {
      const newState = !previousState

      const newInputState = {
        ...input,
        [key]: {
          ...input[key],
          value: input[key][newState],
          [type]: newState,
        },
      }

      if (key === 'downPayment') {
        // re-calculate new mortgage
        let {mortgageAmount, homeValue} = calculateMortgageAmoit(newInputState)
        onChangeHandler({...newInputState, mortgageAmount, homeValue}, dispatch)
      }

      setInput(newInputState)
      return newState
    })
  }

  const handleExtraPaymentInput = (key, value) => {
    if (!value) value = '0'

    handleChange(`${key}`, {
      ...input[key],
      payment: value,
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

  const handleInputValue = (state, key, thousandSeparated = true) =>
    state ? input[key].value : numbro(input[key].value).format({thousandSeparated})

  const handleInputChange = (key, value) => {
    if (!value) value = '0'
    handleChange(key, value)
  }

  const handleInputOnChangeTextWithSwitch = (key, value, state) => {
    if (!value) value = state && key !== 'loanTerm' ? '' : '0'

    handleChange(`${key}`, {
      ...input[key],
      [state]: value,
      value,
    })
  }

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
              onChangeText={homeValue => handleInputChange('homeValue', homeValue)}
            />

            <TextInput
              label="Down Payment"
              keyboardType="decimal-pad"
              reverse={pdForDownPayment}
              optionSwitch={
                <Switch
                  value={pdForDownPayment}
                  onPress={handleInputSwitchOnPress(setPdForDownPayment, 'downPayment', 'percent')}
                />
              }
              value={handleInputValue(pdForDownPayment, 'downPayment')}
              icon={handleInputIncon(pdForDownPayment)}
              onChangeText={value => handleInputOnChangeTextWithSwitch('downPayment', value, pdForDownPayment)}
            />

            <TextInput
              label="Mortgage Amount"
              keyboardType="decimal-pad"
              value={numbro(input.mortgageAmount).format({thousandSeparated: true})}
              icon={handleInputIncon(0)}
              onChangeText={value => handleInputChange('mortgageAmount', value)}
            />

            <TextInput
              label="Length Of Loan"
              keyboardType="decimal-pad"
              optionSwitch={
                <Switch
                  term
                  value={pdForTermLength}
                  onPress={handleInputSwitchOnPress(setPdForTermLength, 'loanTerm', 'year')}
                />
              }
              value={handleInputValue(pdForTermLength, 'loanTerm')}
              onChangeText={value => handleInputOnChangeTextWithSwitch('loanTerm', value, pdForTermLength)}
            />

            <TextInput
              reverse
              value={input.interest === '0' ? '' : input.interest}
              label="Interest Rate"
              keyboardType="decimal-pad"
              icon={handleInputIncon(1)}
              onChangeText={interest => handleInputChange('interest', interest)}
            />

            <TextInput
              label="PMI (Yearly)"
              keyboardType="decimal-pad"
              reverse={pdForPMI}
              optionSwitch={
                <Switch value={pdForPMI} onPress={handleInputSwitchOnPress(setPdForPMI, 'pmi', 'percent')} />
              }
              value={handleInputValue(pdForPMI, 'pmi')}
              icon={handleInputIncon(pdForPMI)}
              onChangeText={value => handleInputOnChangeTextWithSwitch('pmi', value, pdForPMI)}
            />

            <TextInput
              label="Property Tax (Yearly)"
              keyboardType="decimal-pad"
              reverse={pdForPropertyTax}
              optionSwitch={
                <Switch
                  value={pdForPropertyTax}
                  onPress={handleInputSwitchOnPress(setPdForPropertyTax, 'propertyTax', 'percent')}
                />
              }
              value={handleInputValue(pdForPropertyTax, 'propertyTax')}
              icon={handleInputIncon(pdForPropertyTax)}
              onChangeText={value => handleInputOnChangeTextWithSwitch('propertyTax', value, pdForPropertyTax)}
            />

            <TextInput
              label="Home Insurance (Yearly)"
              keyboardType="decimal-pad"
              reverse={pdForHomeInsurance}
              optionSwitch={
                <Switch
                  value={pdForHomeInsurance}
                  onPress={handleInputSwitchOnPress(setPdForHomeInsurance, 'homeInsurance', 'percent')}
                />
              }
              value={handleInputValue(pdForHomeInsurance, 'homeInsurance')}
              icon={handleInputIncon(pdForHomeInsurance)}
              onChangeText={value => handleInputOnChangeTextWithSwitch('homeInsurance', value, pdForHomeInsurance)}
            />

            <TextInput
              value={numbro(input.hoaFees).format({thousandSeparated: true})}
              label="HOA Fees (Monthly)"
              keyboardType="decimal-pad"
              icon={handleInputIncon(0)}
              onChangeText={value => handleInputChange('hoaFees', value)}
            />

            <LoanTerm
              value={input.paymentFrequency}
              leftLabel="Payment Frequency"
              data={['Monthly', 'Bi-Weekly']}
              onChange={value => handleInputChange('paymentFrequency', value)}
            />

            <TextInput
              reverse
              clickable={true}
              value={formatDate(input.startDate)}
              label="Start Date"
              icon={<FontAwesome5 name="calendar-alt" size={variables.iconSizeSmall} color={colors.gray400} />}
              onPress={() => showDatePicker('startDate')}
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
                onChangeText={value => handleExtraPaymentInput('oneTime', value)}
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
                onChangeText={value => handleExtraPaymentInput('monthlyOrBiWeekly', value)}
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
                onChangeText={value => handleExtraPaymentInput('quarterly', value)}
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
                onChangeText={value => handleExtraPaymentInput('yearly', value)}
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
