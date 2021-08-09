import React, {useState} from 'react'
import {Keyboard, TouchableWithoutFeedback, View, Text, ScrollView} from 'react-native'
import colors from 'styles/colors'
import {MaterialIcons, FontAwesome5} from '@expo/vector-icons'
import variables from 'styles/variables'
import {Container, TextInput} from 'components'
import LoanTerm from './LoanTerm'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {useAdvanceMortgageCalculator, updateAdvanceForm} from '../../../context/advanceMortgageCalculator'
import {formatDate, formatNumber, unformat} from '../../../utils/formatter'
import {NEW_FORM_INITIAL_STATE} from '../../../context/advanceMortgageCalculator'
import {debounce} from 'lodash/fp'
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
          value: formatNumber(value[on]),
          onChangeText: val => {
            const {orig} = unformat(val)

            setValue({...value, [on]: orig})
            return child.props.onChangeText(orig, on, val, setValue)
          },
          optionSwitch: <Switch value={on} onToggle={toggle} />,
        })
  })
}

const InputSwitch = ({initialState = true, term = false, setter = () => null, state, children}) => {
  const [on, setOn] = useState(initialState)
  const [data, setData] = useState(state)
  const toggle = () => setOn(!on)

  return React.Children.map(children, child => {
    return React.cloneElement(child, {
      reverse: on,
      icon: term ? null : handleInputIncon(on),
      value: formatNumber(data[on]),
      optionSwitch: (
        <Switch
          term={term}
          value={on}
          onToggle={() => {
            setter()
            toggle()
            setData(state)
          }}
        />
      ),
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

  const [form, setForm] = useState(NEW_FORM_INITIAL_STATE)
  const [inputWithDate, setInputWithDate] = useState()
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

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
      let newInputState = {
        [inputWithDate]: {
          ...form[inputWithDate],
          startDate: date,
        },
      }

      handleOnChangeText(newInputState)
    } else {
      handleOnChangeText({startDate: date})
    }
    hideDatePicker()
  }

  const onChangeHandler = React.useCallback(
    debounce(400, (...args) => updateAdvanceForm(...args)),
    [],
  )

  const handleOnChangeText = newdata => {
    const newState = {...form, ...newdata}

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
                value={formatNumber(form.homeValue)}
                icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
                onChangeText={(homeValue, on, value) => {
                  const {orig, formatted} = unformat(homeValue)

                  const diff = on ? (value[on] / 100) * formatted : formatted - value[!on]
                  const mortgageAmount = formatted - diff

                  handleOnChangeText({
                    homeValue: orig,
                    mortgageAmount,
                  })
                }}
              />

              <TextInput
                label="Down Payment"
                keyboardType="decimal-pad"
                onChangeText={(percent, on, value) => {
                  const {homeValue} = form
                  const {formatted} = unformat(value)
                  const diff = on ? (percent / 100) * homeValue : formatted

                  const mortgageAmount = homeValue - diff
                  handleOnChangeText({
                    mortgageAmount,
                  })
                }}
              />

              <TextInput
                label="Mortgage Amount"
                keyboardType="decimal-pad"
                value={formatNumber(form.mortgageAmount)}
                icon={handleInputIncon(0)}
                onChangeText={(mortgageAmount, on, value, setValue) => {
                  const {orig, formatted} = unformat(mortgageAmount)
                  const percent = (100 - (formatted / form.homeValue) * 100).toFixed(2)

                  setValue({...value, [on]: percent})
                  handleOnChangeText({
                    mortgageAmount: orig,
                    downPayment: form.homeValue * percent - form.homeValue,
                  })
                }}
              />
            </HDMInputSwitch>

            <InputSwitch
              initialState={false}
              term
              state={{
                true: form.loanTerm.months,
                false: form.loanTerm.years,
              }}
            >
              <TextInput
                label="Length Of Loan"
                keyboardType="decimal-pad"
                showIcon={false}
                icon={handleInputIncon(0)}
                onChangeText={(value, on) => {
                  const {false: years, true: months} = value

                  const terms = {
                    years: Number(!on ? years : Math.floor(months / 12)),
                    months: Number(on ? months : years * 12),
                  }

                  handleOnChangeText({loanTerm: terms})
                }}
              />
            </InputSwitch>

            <TextInput
              reverse
              value={formatNumber(form.interest)}
              label="Interest Rate"
              keyboardType="decimal-pad"
              icon={handleInputIncon(1)}
              onChangeText={interest => handleOnChangeText({interest: interest})}
            />

            <TextInput
              label="PMI (Yearly)"
              keyboardType="decimal-pad"
              reverse={form.pmi.isPercent}
              optionSwitch={
                <Switch
                  value={form.pmi.isPercent}
                  onToggle={() => {
                    const {isPercent} = form.pmi
                    handleOnChangeText({
                      pmi: {
                        ...form.pmi,
                        isPercent: !isPercent,
                        value: isPercent ? (form.pmi.true / 100) * form.mortgageAmount : form.pmi.true,
                      },
                    })
                  }}
                />
              }
              value={formatNumber(form.pmi.value)}
              icon={handleInputIncon(form.pmi.isPercent)}
              onChangeText={value =>
                handleOnChangeText({
                  pmi: {
                    ...form.pmi,
                    [form.pmi.isPercent]: value,
                    value,
                  },
                })
              }
            />

            <InputSwitch
              initialState={false}
              state={{
                false: 3000,
                true: 1,
              }}
            >
              <TextInput
                label="Property Tax (Yearly)"
                keyboardType="decimal-pad"
                onChangeText={(value, selected) => {
                  const {false: dollar, true: percent} = value
                  handleOnChangeText({
                    propertyTax: selected ? (percent / 100) * form.homeValue : dollar,
                  })
                }}
              />
            </InputSwitch>

            <InputSwitch
              initialState={false}
              state={{
                false: 1500,
                true: 0.5,
              }}
            >
              <TextInput
                label="Home Insurance (Yearly)"
                keyboardType="decimal-pad"
                onChangeText={(value, selected) => {
                  const {false: dollar, true: percent} = value
                  handleOnChangeText({
                    homeInsurance: selected ? (percent / 100) * form.homeValue : dollar,
                  })
                }}
              />
            </InputSwitch>

            <TextInput
              value={formatNumber(form.hoaFees)}
              label="HOA Fees (Monthly)"
              keyboardType="decimal-pad"
              icon={handleInputIncon(null)}
              onChangeText={value => {
                handleOnChangeText({
                  hoaFees: value,
                })
              }}
            />

            <LoanTerm
              value={form.paymentFrequency}
              leftLabel="Payment Frequency"
              data={['Monthly', 'Bi-Weekly']}
              onChange={value =>
                handleOnChangeText({
                  paymentFrequency: value,
                })
              }
            />

            <TextInput
              reverse
              clickable={true}
              value={formatDate(form.startDate)}
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
                value={formatNumber(form.oneTime.payment)}
                label="One Time"
                keyboardType="decimal-pad"
                icon={handleInputIncon(0)}
                onChangeText={value => handleOnChangeText({oneTime: {...form.oneTime, payment: value}})}
              />

              <TextInput
                containerStyle={{width: '45%'}}
                inputPressableStyle={{fontSize: 12}}
                reverse
                clickable={true}
                value={formatDate(form.oneTime.startDate)}
                label="On"
                icon={<FontAwesome5 name="calendar-alt" size={variables.iconSizeSmall} color={colors.gray400} />}
                onPress={() => showDatePicker('oneTime')}
              />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
                containerStyle={{width: '45%'}}
                value={formatNumber(form.monthlyOrBiWeekly.payment)}
                label="Monthly or Bi-Weekly"
                keyboardType="decimal-pad"
                icon={handleInputIncon(0)}
                onChangeText={value =>
                  handleOnChangeText({monthlyOrBiWeekly: {...form.monthlyOrBiWeekly, payment: value}})
                }
              />

              <TextInput
                containerStyle={{width: '45%'}}
                inputPressableStyle={{fontSize: 12}}
                reverse
                clickable={true}
                value={formatDate(form.monthlyOrBiWeekly.startDate)}
                label="Starting"
                icon={<FontAwesome5 name="calendar-alt" size={variables.iconSizeSmall} color={colors.gray400} />}
                onPress={() => showDatePicker('monthlyOrBiWeekly')}
              />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
                containerStyle={{width: '45%'}}
                value={formatNumber(form.quarterly.payment)}
                label="Quarterly"
                keyboardType="decimal-pad"
                icon={handleInputIncon(0)}
                onChangeText={value => handleOnChangeText({quarterly: {...form.quarterly, payment: value}})}
              />
              <TextInput
                containerStyle={{width: '45%'}}
                inputPressableStyle={{fontSize: 12}}
                reverse
                clickable={true}
                value={formatDate(form.quarterly.startDate) || ''}
                label="Starting"
                icon={<FontAwesome5 name="calendar-alt" size={variables.iconSizeSmall} color={colors.gray400} />}
                onPress={() => showDatePicker('quarterly')}
              />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
                containerStyle={{width: '45%'}}
                value={formatNumber(form.yearly.payment) || ''}
                label="Yearly"
                keyboardType="decimal-pad"
                icon={handleInputIncon(0)}
                onChangeText={value =>
                  handleOnChangeText({
                    yearly: {...form.yearly, payment: value},
                  })
                }
              />
              <TextInput
                containerStyle={{width: '45%'}}
                inputPressableStyle={{fontSize: 12}}
                reverse
                clickable={true}
                value={formatDate(form.yearly.startDate) || ''}
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
