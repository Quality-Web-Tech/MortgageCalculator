import React from 'react'
import {ScrollView, View} from 'react-native'
import colors from 'styles/colors'
import {MaterialIcons} from '@expo/vector-icons'
import variables from 'styles/variables'
import {Container, TextInput} from 'components'
import {useAdvanceMortgageCalculator} from 'context/advanceMortgageCalculator'
import {formatDate, formatNumber} from 'utils/formatter'
import calculateDetailAdvance from '../../../utils/calculateDetailAdvance'
import moment from 'moment'
import numbro from 'numbro'

function Detail() {
  const [{advance}] = useAdvanceMortgageCalculator()
  const {
    homeValue,
    mortgageAmount,
    paymentFrequency,
    monthlyOrBiWeeklyExtraPayment,
    propertyTax,
    homeInsurance,
    pmi,
    hoaFees,
    totalPayment,
    numberOfPayments,
    startDate,
    endDate,
    downPayment,
    totalExtraPayment,
    principal,
    totalFees,
    totalAllPayments,
    totalInterest,
  } = calculateDetailAdvance(advance)

  return (
    <Container>
      <ScrollView>
        <TextInput
          label="Home Value"
          editable={false}
          value={formatNumber(homeValue)}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label="Mortgage Amount"
          editable={false}
          value={formatNumber(mortgageAmount)}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label={`${paymentFrequency.type} Principal & Interest`}
          editable={false}
          value={numbro(paymentFrequency.amount).format({thousandSeparated: true, mantissa: 2})}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label={`${paymentFrequency.type} Extra Payment`}
          editable={false}
          value={numbro(monthlyOrBiWeeklyExtraPayment).format({thousandSeparated: true, mantissa: 2})}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label={`${paymentFrequency.type} Property Tax`}
          editable={false}
          value={numbro(propertyTax).format({thousandSeparated: true, mantissa: 2})}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label={`${paymentFrequency.type} Home Insurance`}
          editable={false}
          value={numbro(homeInsurance).format({thousandSeparated: true, mantissa: 2})}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label={`${paymentFrequency.type} PMI (Until ${moment(new Date()).add(44, 'months').format('MMM, YYYY')})`}
          editable={false}
          value={numbro(pmi).format({thousandSeparated: true, mantissa: 2})}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label={`${paymentFrequency.type} HOA Fees`}
          editable={false}
          value={numbro(hoaFees).format({thousandSeparated: true, mantissa: 2})}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label="Total Monthly Payment"
          editable={false}
          value={numbro(totalPayment).format({thousandSeparated: true, mantissa: 2})}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label="Number Of Payments"
          editable={false}
          value={numbro(numberOfPayments).format({thousandSeparated: true})}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            containerStyle={{width: '45%'}}
            inputStyle={{fontSize: 14}}
            label="Start Date"
            editable={false}
            value={formatDate(startDate, 'MMM YYYY')}
          />
          <TextInput
            containerStyle={{width: '45%'}}
            inputStyle={{fontSize: 14}}
            label="Pay Off Date"
            editable={false}
            value={formatDate(endDate, 'MMM YYYY')}
          />
        </View>

        <TextInput
          label="Down Payment"
          editable={false}
          value={numbro(downPayment).format({thousandSeparated: true, mantissa: 2})}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label="Principal"
          editable={false}
          value={numbro(principal).format({thousandSeparated: true, mantissa: 2})}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label="Total Extra Payment"
          editable={false}
          value={numbro(totalExtraPayment).format({thousandSeparated: true, mantissa: 2})}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label="Total Interest Paid"
          editable={false}
          value={numbro(totalInterest).format({thousandSeparated: true, mantissa: 2})}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label="Total Tax, Insurance, PMI & Fees"
          editable={false}
          value={numbro(totalFees).format({thousandSeparated: true, mantissa: 2})}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label="Total Of All Payments"
          editable={false}
          value={numbro(totalAllPayments).format({thousandSeparated: true, mantissa: 2})}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />
      </ScrollView>
    </Container>
  )
}

export default React.memo(Detail)
