import React from 'react'
import {ScrollView, View} from 'react-native'
import colors from 'styles/colors'
import {MaterialIcons} from '@expo/vector-icons'
import variables from 'styles/variables'
import {Container, TextInput} from 'components'
import {useBasicMortgageCalculator} from 'context/basicMortgageCalculator'
import {formatDate, formatNumber} from 'utils/formatter'
import calculateDetail from '../../../utils/calculateDetail'

function Detail() {
  const [{basic}] = useBasicMortgageCalculator()
  const {mortgageAmount, startDate, endDate, loanTerm, monthlyPayment, totalPayment, totalInterest} =
    calculateDetail(basic)

  return (
    <Container>
      <ScrollView>
        <TextInput
          label="Mortgage Amount"
          editable={false}
          value={formatNumber(mortgageAmount)}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label="Monthly Payment"
          editable={false}
          value={formatNumber(monthlyPayment)}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput label="Number Of Payments" editable={false} value={formatNumber(loanTerm)} />

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
          label="Total Interest Paid"
          editable={false}
          value={formatNumber(totalInterest)}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />

        <TextInput
          label="Total payment"
          editable={false}
          value={formatNumber(totalPayment)}
          icon={<MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />}
        />
      </ScrollView>
    </Container>
  )
}

export default React.memo(Detail)
