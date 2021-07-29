import React from 'react'
import {Text, View} from 'react-native'
import fontFamily from 'styles/fontFamily'
import colors from 'styles/colors'
import {Button} from 'components'

const terms = [10, 15, 20, 30]

const Label = ({label}) => (
  <Text
    style={{
      fontFamily: fontFamily.MONTSERRAT_REGULAR,
      fontSize: 14,
      color: colors.gray500,
    }}
  >
    {label}
  </Text>
)

const LoanTerm = ({leftLabel, rightLabel, loanTerm, onChangeTerm}) => {
  const selectYearTerm = year => {
    onChangeTerm(year)
  }
  return (
    <View style={{marginVertical: 8}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Label label={leftLabel} />
        <Label label={rightLabel} />
      </View>
      <View style={{marginVertical: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
        {terms.map(year => (
          <Button key={year} label={year} active={year === loanTerm} onPress={() => selectYearTerm(year)} />
        ))}
      </View>
    </View>
  )
}

export default LoanTerm
