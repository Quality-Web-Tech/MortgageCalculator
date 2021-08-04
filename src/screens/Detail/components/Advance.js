import React from 'react'
import {ScrollView, View} from 'react-native'
import colors from 'styles/colors'
import {MaterialIcons} from '@expo/vector-icons'
import variables from 'styles/variables'
import {Container, TextInput} from 'components'
import {useAdvanceMortgageCalculator} from 'context/advanceMortgageCalculator'
import {formatDate, formatNumber} from 'utils/formatter'
import calculateDetail from '../../../utils/calculateDetailAdvance'
import moment from 'moment'

function Detail() {
  const [{advance}] = useAdvanceMortgageCalculator()
  const {
    homeValue,
    mortgageAmount,
    paymentFrequency,
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
    monthlyOrBiWeeklyExtraPayment,
  } = calculateDetail(advance)

  return (
    <Container>
      <ScrollView>
        <TextInput
          label="Mortgage Amount"
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
          value={formatNumber(paymentFrequency.amount)}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label={`${paymentFrequency.type} Extra Payment`}
          editable={false}
          value={formatNumber(monthlyOrBiWeeklyExtraPayment)}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label={`${paymentFrequency.type} Property Tax`}
          editable={false}
          value={formatNumber(propertyTax)}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label={`${paymentFrequency.type} Home Insurance`}
          editable={false}
          value={formatNumber(homeInsurance)}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label={`${paymentFrequency.type} PMI (Until ${moment(new Date()).add(44, 'months').format('MMM, YYYY')})`}
          editable={false}
          value={formatNumber(pmi)}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label={`${paymentFrequency.type} HOA Fees`}
          editable={false}
          value={formatNumber(hoaFees)}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label="Total Monthly Payment"
          editable={false}
          value={formatNumber(totalPayment)}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput label="Number Of Payments" editable={false} value={formatNumber(numberOfPayments)} />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            containerStyle={{width: '45%'}}
            inputStyle={{fontSize: 12}}
            label="Start Date"
            editable={false}
            value={formatDate(startDate)}
          />
          <TextInput
            containerStyle={{width: '45%'}}
            inputStyle={{fontSize: 12}}
            label="Pay Off Date"
            editable={false}
            value={formatDate(endDate)}
          />
        </View>

        <TextInput
          label="Down Payment"
          editable={false}
          value={formatNumber(downPayment)}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label="Principal"
          editable={false}
          value={formatNumber(principal)}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label="Total Extra Payment"
          editable={false}
          value={formatNumber(totalExtraPayment)}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label="Total Interest Paid"
          editable={false}
          value={formatNumber(totalInterest)}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label="Total Tax, Insurance, PMI & Fees"
          editable={false}
          value={formatNumber(totalFees)}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label="Total Of All Payments"
          editable={false}
          value={formatNumber(totalAllPayments)}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />
      </ScrollView>
    </Container>
  )
}

export default React.memo(Detail)
