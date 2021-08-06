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
import {NEW_FORM_INITIAL_STATE} from '../../../context/advanceMortgageCalculator'
import {debounce} from 'lodash/fp'
import numbro from 'numbro'
import Switch from './Switch'
import fontFamily from '../../../styles/fontFamily'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

const handleInputIncon = state => {
  if (state === null) return null

  return state ? (
    <FontAwesome5 name="percent" size={variables.iconSizeExtraSmall} color={colors.gray400} />
  ) : (
    <MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />
  )
}

// const calculateMortgageAmoit = state => {
//   let {homeValue, downPayment} = state

//   let {value: percent, percent: isPercent} = downPayment
//   homeValue = Number(homeValue.replace(/\,/g, ''))

//   if (isPercent) {
//     percent /= 100
//     mortgageAmount = homeValue - homeValue * percent
//   } else {
//     percent = Number(percent.replace(/\,/g, ''))
//     mortgageAmount = homeValue - percent
//   }

//   return {mortgageAmount, homeValue}
// }

const HDMInputSwitch = ({state, handleOnChangeText, children}) => {
  const [on, setOn] = useState(true)
  const [value, setValue] = useState(state)
  const toggle = () => {
    handleOnChangeText(!on, value)
    setOn(!on)
  }

  return React.Children.map(children, (child, index) => {
    return index !== 1
      ? React.cloneElement(child, {
          onChangeText: val => {
            return child.props.onChangeText(val, on, value, setValue)
          },
        })
      : React.cloneElement(child, {
          reverse: on,
          onToggle: toggle,
          icon: handleInputIncon(on),
          value: on ? value[on] : numbro(value[on] || 0).format({thousandSeparated: true}),
          onChangeText: val => {
            val = numbro.unformat(val)
            setValue({...value, [on]: val})
            return child.props.onChangeText(val, on, value, setValue)
          },
          optionSwitch: <Switch value={on} onToggle={toggle} />,
        })
  })
}

const InputSwitch = ({initialState = true, term = false, state, children}) => {
  const [on, setOn] = useState(initialState)
  const [data, setData] = useState(state)
  const toggle = () => setOn(!on)

  return React.Children.map(children, child => {
    return React.cloneElement(child, {
      reverse: on,
      icon: term ? null : handleInputIncon(on),
      value: String(data[on]),
      optionSwitch: <Switch term={term} value={on} onToggle={toggle} />,
      onChangeText: val => {
        const newState = {...data, [on]: val}
        setData(newState)
        return child.props.onChangeText(newState, on)
      },
    })
  })
}

export default function Home() {
  const [, dispatch] = useAdvanceMortgageCalculator()

  // const [input, setInput] = useState(NEW_FORM_INITIAL_STATE)
  const [form, setForm] = useState(NEW_FORM_INITIAL_STATE)
  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  // const [pdForDownPayment, setPdForDownPayment] = useState(true)
  // const [pdForTermLength, setPdForTermLength] = useState(false)
  // const [pdForPMI, setPdForPMI] = useState(true)
  // const [pdForPropertyTax, setPdForPropertyTax] = useState(false)
  // const [pdForHomeInsurance, setPdForHomeInsurance] = useState(false)
  // const [inputWithDate, setInputWithDate] = useState()

  // const showDatePicker = key => {
  //   setInputWithDate(key)
  //   setDatePickerVisibility(true)
  // }

  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false)
  // }

  // const handleConfirm = date => {
  //   Keyboard.dismiss()

  //   if (inputWithDate !== 'startDate') {
  //     let newInputState = {
  //       ...input,

  //       [inputWithDate]: {
  //         ...input[inputWithDate],
  //         startDate: date,
  //       },
  //     }

  //     newInputState = {...newInputState, homeValue: Number(input.homeValue.replace(/\,/g, ''))}
  //     setInput(newInputState)
  //     onChangeHandler(newInputState, dispatch)
  //   } else {
  //     handleChange('startDate', date)
  //   }
  //   hideDatePicker()
  // }

  // const onChangeHandler = React.useCallback(
  //   debounce(400, (...args) => updateAdvanceForm(...args)),
  //   [],
  // )

  // // Function that update the input state and global input
  // const handleChange = (key, value) => {
  //   let newInputState = {...input, [key]: value}

  //   // calculate new mortgage
  //   let {mortgageAmount, homeValue} = calculateMortgageAmoit(newInputState)

  //   setInput({...newInputState, mortgageAmount})
  //   // calling this it re-renders
  //   onChangeHandler({...newInputState, mortgageAmount, homeValue}, dispatch)
  // }

  // const handleInputSwitchOnPress = (setState, key, type) => () => {
  //   setState(previousState => {
  //     const newState = !previousState

  //     const newInputState = {
  //       ...input,
  //       [key]: {
  //         ...input[key],
  //         value: input[key][newState],
  //         [type]: newState,
  //       },
  //     }

  //     let {mortgageAmount, homeValue} = calculateMortgageAmoit(newInputState)
  //     if (key === 'downPayment') {
  //       // re-calculate new mortgage
  //       // need this for all switches
  //       onChangeHandler({...newInputState, mortgageAmount, homeValue}, dispatch)
  //     }

  //     setInput({...newInputState, mortgageAmount})
  //     return newState
  //   })
  // }

  // const handleExtraPaymentInput = (key, value) => {
  //   if (!value) value = '0'

  //   handleChange(`${key}`, {
  //     ...input[key],
  //     payment: value,
  //   })
  // }

  // const handleInputValue = (state, key, thousandSeparated = true) =>
  //   state ? input[key].value : numbro(input[key].value).format({thousandSeparated})

  const handleInputChange = (key, value) => {
    if (!value) value = '0'
    handleChange(key, value)
  }

  // const handleInputOnChangeTextWithSwitch = (key, value, state) => {
  //   if (!value) value = state && key !== 'loanTerm' ? '' : '0'

  //   handleChange(`${key}`, {
  //     ...input[key],
  //     [state]: value,
  //     value,
  //   })
  // }

  const onChangeHandler = React.useCallback(
    debounce(400, (...args) => updateAdvanceForm(...args)),
    [],
  )

  const handleOnChangeText = newdata => {
    const newState = {...form, ...newdata}
    // console.log(newState)
    setForm(newState)
    onChangeHandler(newState, dispatch)
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView>
          <Container>
            <HDMInputSwitch
              state={{true: '15.00', false: 45000}}
              handleOnChangeText={(on, value) => {
                const {homeValue} = form
                const diff = on ? (value[on] / 100) * homeValue : value[on]
                const mortgageAmount = homeValue - diff
                handleOnChangeText({
                  mortgageAmount,
                })
              }}
            >
              <TextInput
                label="Home Value"
                keyboardType="decimal-pad"
                value={numbro(form.homeValue || 0).format({thousandSeparated: true})}
                icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
                onChangeText={(homeValue, on, value) => {
                  homeValue = numbro.unformat(homeValue)
                  const diff = on ? (value[on] / 100) * homeValue : homeValue - value[!on]
                  const mortgageAmount = homeValue - diff

                  handleOnChangeText({
                    homeValue,
                    mortgageAmount,
                  })
                }}
              />

              <TextInput
                label="Down Payment"
                keyboardType="decimal-pad"
                onChangeText={(percent, on, value) => {
                  const {homeValue} = form
                  const diff = on ? (percent / 100) * homeValue : homeValue - value
                  const mortgageAmount = homeValue - diff
                  handleOnChangeText({
                    mortgageAmount,
                  })
                }}
              />

              <TextInput
                label="Mortgage Amount"
                keyboardType="decimal-pad"
                value={numbro(form.mortgageAmount || 0).format({thousandSeparated: true})}
                icon={handleInputIncon(0)}
                onChangeText={(mortgageAmount, on, value, setValue) => {
                  mortgageAmount = numbro.unformat(mortgageAmount)
                  const percent = (100 - (mortgageAmount / form.homeValue) * 100).toFixed(2)

                  setValue({...value, [on]: percent})
                  handleOnChangeText({
                    mortgageAmount,
                    downPayment: form.homeValue * percent - form.homeValue,
                  })
                }}
              />
            </HDMInputSwitch>

            <InputSwitch
              initialState={false}
              term
              state={{
                false: 30,
                true: 360,
              }}
            >
              <TextInput
                label="Length Of Loan"
                keyboardType="decimal-pad"
                showIcon={false}
                icon={handleInputIncon(0)}
                onChangeText={value => {
                  const {false: years, true: months} = value
                  handleOnChangeText({
                    loanTerm: {
                      years: Number(years),
                      months: Number(months),
                    },
                  })
                }}
              />
            </InputSwitch>

            <TextInput
              reverse
              value={form.interest}
              label="Interest Rate"
              keyboardType="decimal-pad"
              icon={handleInputIncon(1)}
              onChangeText={interest => handleOnChangeText({interest: Number(interest)})}
            />

            <InputSwitch
              term={false}
              state={{
                false: '1275.00',
                true: '0.50',
              }}
            >
              <TextInput
                label="PMI (Yearly)"
                keyboardType="decimal-pad"
                onChangeText={(value, selected) => {
                  const {false: dollar, true: percent} = value
                  handleOnChangeText({
                    pmi: Number(selected ? (percent / 100) * form.mortgageAmount : dollar),
                  })
                }}
              />
            </InputSwitch>

            <InputSwitch
              initialState={false}
              state={{
                false: '3000.00',
                true: '1.00',
              }}
            >
              <TextInput
                label="Property Tax (Yearly)"
                keyboardType="decimal-pad"
                onChangeText={(value, selected) => {
                  const {false: dollar, true: percent} = value
                  handleOnChangeText({
                    propertyTax: Number(selected ? (percent / 100) * form.homeValue : dollar),
                  })
                }}
              />
            </InputSwitch>

            <InputSwitch
              initialState={false}
              state={{
                false: '1500.00',
                true: '0.50',
              }}
            >
              <TextInput
                label="Home Insurance (Yearly)"
                keyboardType="decimal-pad"
                onChangeText={(value, selected) => {
                  const {false: dollar, true: percent} = value
                  handleOnChangeText({
                    homeInsurance: Number(selected ? (percent / 100) * form.homeValue : dollar),
                  })
                }}
              />
            </InputSwitch>

            <TextInput
              value={form.hoaFees}
              label="HOA Fees (Monthly)"
              keyboardType="decimal-pad"
              icon={handleInputIncon(null)}
              onChangeText={value => {
                handleOnChangeText({
                  hoaFees: Number(value),
                })
              }}
            />

            {/*<LoanTerm
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
            /> */}
          </Container>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}
