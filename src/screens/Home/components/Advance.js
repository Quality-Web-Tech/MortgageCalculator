import React, {useState} from 'react'
import {Keyboard, TouchableWithoutFeedback, View, Text, ScrollView} from 'react-native'
import colors from 'styles/colors'
import {FontAwesome5} from '@expo/vector-icons'
import variables from 'styles/variables'
import {Container, TextInput} from 'components'
import LoanTerm from './LoanTerm'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {
  useAdvanceDispatchMortgageCalculator,
  useAdvanceStateMortgageCalculator,
  updateHomeValue,
  updateDownPayment,
  updateMortgageAmount,
  updateLoanTerm,
  updateInterest,
  updatePMI,
  updatePropertyTax,
  updateHomeInsurance,
  updateHoaFees,
  updatePaymentFrequency,
  updateStartDate,
  updateOneTimePayment,
  updateBiWeeklyOrMonthlyPayment,
  updateQuarterlyPayment,
  updateYearlyPayment,
} from '../../../context/advanceMortgageCalculator'
import {formatDate, formatNumber, unformat} from '../../../utils/formatter'
import {INITIAL_STATE} from '../../../context/advanceInitialState'
import {debounce} from 'lodash/fp'
import fontFamily from '../../../styles/fontFamily'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import InputSwitch from './InputSwitch'
import {handleInputIncon} from './helper'

export default function Home() {
  const dispatch = useAdvanceDispatchMortgageCalculator()
  const state = useAdvanceStateMortgageCalculator()

  const [form, setForm] = useState(INITIAL_STATE)
  const [inputWithDate, setInputWithDate] = useState()
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const showDatePicker = (key, cb) => {
    setInputWithDate({key, cb})
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = date => {
    Keyboard.dismiss()
    const {key, cb} = inputWithDate
    key === 'startDate'
      ? handleOnChangeText(key, date, cb)
      : handleOnChangeText(
          key,
          {
            [key]: {
              ...form[key],
              startDate: date,
            },
          },
          cb,
        )
    hideDatePicker()
  }

  const onChangeHandler = React.useCallback(
    debounce(400, (value, dispatcher) => dispatcher(value, dispatch)),
    [],
  )

  const handleOnChangeText = (key, value, cb) => {
    typeof value === 'object' && !(value instanceof Date)
      ? setForm({...form, ...value})
      : setForm({...form, [key]: value})
    if (!cb) return
    onChangeHandler(value, cb)
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView>
          <Container>
            <TextInput
              value={formatNumber(form.homeValue)}
              label="Home Value"
              keyboardType="decimal-pad"
              icon={handleInputIncon(1)}
              onChangeText={value => {
                const numValue = unformat(value)
                const {
                  downPayment: {percent},
                } = form
                const mortgageAmount = numValue - numValue * (percent / 100)
                handleOnChangeText(
                  'homeValue',
                  {
                    homeValue: value,
                    mortgageAmount,
                    downPayment: {
                      percent,
                      amount: numValue - mortgageAmount,
                    },
                  },
                  updateHomeValue,
                )
              }}
            />

            <InputSwitch
              state={{
                true: 'percent',
                false: 'amount',
              }}
            >
              <TextInput
                label="Down Payment"
                keyboardType="decimal-pad"
                valueSetter={type => formatNumber(form.downPayment[type])}
                onChangeText={(value, type) => {
                  const {homeValue} = form

                  const unformatValue = unformat(value)
                  const numHomeValue = unformat(homeValue)
                  const amount = type === 'percent' ? (unformatValue / 100) * numHomeValue : unformatValue
                  const mortgageAmount = numHomeValue - amount
                  const percent = ((unformatValue / numHomeValue) * 100).toFixed(2)

                  handleOnChangeText(
                    'downPayment',
                    {
                      downPayment: {
                        amount: type !== 'amount' ? amount : value,
                        percent: type === 'percent' ? value : percent,
                      },
                      mortgageAmount,
                    },
                    updateDownPayment,
                  )
                }}
              />
            </InputSwitch>

            <TextInput
              label="Mortgage Amount"
              keyboardType="decimal-pad"
              value={formatNumber(form.mortgageAmount)}
              icon={handleInputIncon(1)}
              onChangeText={value => {
                const {homeValue} = form
                const numValue = unformat(value)
                const percent = (100 - (numValue / homeValue) * 100).toFixed(2)

                handleOnChangeText(
                  'mortgageAmount',
                  {
                    mortgageAmount: numValue,
                    downPayment: {
                      amount: homeValue - homeValue * (percent - 100),
                      percent,
                    },
                  },
                  updateMortgageAmount,
                )
              }}
            />

            <InputSwitch
              initialState={false}
              term
              state={{
                true: 'months',
                false: 'years',
              }}
            >
              <TextInput
                label="Length Of Loan"
                keyboardType="decimal-pad"
                showIcon={false}
                icon={handleInputIncon(0)}
                valueSetter={type => formatNumber(form.loanTerm[type])}
                onChangeText={(value, type) => {
                  const numValue = unformat(value)
                  const terms = {
                    years: type === 'years' ? value : Math.floor(numValue / 12),
                    months: type == 'months' ? value : numValue * 12,
                  }

                  handleOnChangeText('loanTerm', {loanTerm: terms}, updateLoanTerm)
                }}
              />
            </InputSwitch>

            <TextInput
              reverse
              value={formatNumber(form.interest)}
              label="Interest Rate"
              keyboardType="decimal-pad"
              icon={handleInputIncon(0)}
              onChangeText={value => handleOnChangeText('interest', value, updateInterest)}
            />

            <InputSwitch
              state={{
                true: 'percent',
                false: 'amount',
              }}
            >
              <TextInput
                label="PMI (Yearly)"
                keyboardType="decimal-pad"
                showIcon={false}
                icon={handleInputIncon(0)}
                valueSetter={type => formatNumber(form.pmi[type])}
                onChangeText={(value, type) => {
                  const numValue = unformat(value)
                  handleOnChangeText(
                    'pmi',
                    {
                      pmi: {
                        percent: type === 'percent' ? value : ((numValue / form.mortgageAmount) * 100).toFixed(2),
                        amount: type === 'amount' ? value : (numValue / 100) * form.mortgageAmount,
                      },
                    },
                    updatePMI,
                  )
                }}
              />
            </InputSwitch>

            <InputSwitch
              state={{
                true: 'percent',
                false: 'amount',
              }}
            >
              <TextInput
                label="Property Tax (Yearly)"
                keyboardType="decimal-pad"
                showIcon={false}
                icon={handleInputIncon(0)}
                valueSetter={type => formatNumber(form.propertyTax[type])}
                onChangeText={(value, type) => {
                  const numValue = unformat(value)
                  handleOnChangeText(
                    'propertyTax',
                    {
                      propertyTax: {
                        percent: type === 'percent' ? value : ((numValue / form.homeValue) * 100).toFixed(2),
                        amount: type === 'amount' ? value : (numValue / 100) * form.homeValue,
                      },
                    },
                    updatePropertyTax,
                  )
                }}
              />
            </InputSwitch>

            <InputSwitch
              initialState={false}
              state={{
                true: 'percent',
                false: 'amount',
              }}
            >
              <TextInput
                label="Home Insurance (Yearly)"
                keyboardType="decimal-pad"
                showIcon={false}
                icon={handleInputIncon(0)}
                valueSetter={type => formatNumber(form.homeInsurance[type])}
                onChangeText={(value, type) => {
                  const numValue = unformat(value)
                  handleOnChangeText(
                    'homeInsurance',
                    {
                      homeInsurance: {
                        percent: type === 'percent' ? value : ((numValue / form.homeValue) * 100).toFixed(2),
                        amount: type === 'amount' ? value : (numValue / 100) * form.homeValue,
                      },
                    },
                    updateHomeInsurance,
                  )
                }}
              />
            </InputSwitch>

            <TextInput
              value={formatNumber(form.hoaFees)}
              label="HOA Fees (Monthly)"
              keyboardType="decimal-pad"
              icon={handleInputIncon(1)}
              onChangeText={value => handleOnChangeText('hoaFees', value, updateHoaFees)}
            />

            <LoanTerm
              value={form.paymentFrequency}
              leftLabel="Payment Frequency"
              data={['Monthly', 'Bi-Weekly']}
              onChange={value => handleOnChangeText('paymentFrequency', value, updatePaymentFrequency)}
            />

            <TextInput
              reverse
              clickable={true}
              value={formatDate(form.startDate)}
              label="Start Date"
              icon={<FontAwesome5 name="calendar-alt" size={variables.iconSizeSmall} color={colors.gray400} />}
              onPress={() => showDatePicker('startDate', updateStartDate)}
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
                icon={handleInputIncon(1)}
                onChangeText={payment =>
                  handleOnChangeText('oneTime', {oneTime: {...form.oneTime, payment}}, updateOneTimePayment)
                }
              />

              <TextInput
                containerStyle={{width: '45%'}}
                inputPressableStyle={{fontSize: 12}}
                reverse
                clickable={true}
                value={formatDate(form.oneTime.startDate)}
                label="On"
                icon={handleInputIncon(2)}
                onPress={() => showDatePicker('oneTime', updateOneTimePayment)}
              />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
                containerStyle={{width: '45%'}}
                value={formatNumber(form.monthlyOrBiWeekly.payment)}
                label="Monthly or Bi-Weekly"
                keyboardType="decimal-pad"
                icon={handleInputIncon(1)}
                onChangeText={payment =>
                  handleOnChangeText(
                    'monthlyOrBiWeekly',
                    {monthlyOrBiWeekly: {...form.monthlyOrBiWeekly, payment}},
                    updateBiWeeklyOrMonthlyPayment,
                  )
                }
              />

              <TextInput
                containerStyle={{width: '45%'}}
                inputPressableStyle={{fontSize: 12}}
                reverse
                clickable={true}
                value={formatDate(form.monthlyOrBiWeekly.startDate)}
                label="Starting"
                icon={handleInputIncon(2)}
                onPress={() => showDatePicker('monthlyOrBiWeekly', updateBiWeeklyOrMonthlyPayment)}
              />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
                containerStyle={{width: '45%'}}
                value={formatNumber(form.quarterly.payment)}
                label="Quarterly"
                keyboardType="decimal-pad"
                icon={handleInputIncon(1)}
                onChangeText={payment =>
                  handleOnChangeText('quarterly', {quarterly: {...form.quarterly, payment}}, updateQuarterlyPayment)
                }
              />
              <TextInput
                containerStyle={{width: '45%'}}
                inputPressableStyle={{fontSize: 12}}
                reverse
                clickable={true}
                value={formatDate(form.quarterly.startDate) || ''}
                label="Starting"
                icon={handleInputIncon(2)}
                onPress={() => showDatePicker('quarterly', updateQuarterlyPayment)}
              />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
                containerStyle={{width: '45%'}}
                value={formatNumber(form.yearly.payment) || ''}
                label="Yearly"
                keyboardType="decimal-pad"
                icon={handleInputIncon(1)}
                onChangeText={payment =>
                  handleOnChangeText(
                    'yearly',
                    {
                      yearly: {...form.yearly, payment},
                    },
                    updateYearlyPayment,
                  )
                }
              />
              <TextInput
                containerStyle={{width: '45%'}}
                inputPressableStyle={{fontSize: 12}}
                reverse
                clickable={true}
                value={formatDate(form.yearly.startDate)}
                label="Starting"
                icon={handleInputIncon(2)}
                onPress={() => showDatePicker('yearly', updateYearlyPayment)}
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
