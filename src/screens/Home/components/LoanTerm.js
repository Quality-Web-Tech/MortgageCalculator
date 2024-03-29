import React from 'react'
import {Text, View} from 'react-native'
import fontFamily from 'styles/fontFamily'
import colors from 'styles/colors'
import {Button} from 'components'

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

const LoanTerm = ({leftLabel, rightLabel, value, onChange, data = [10, 15, 20, 30], ...props}) => {
  const selectValue = value => {
    onChange(value)
  }
  return (
    <View style={{marginVertical: 8}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Label label={leftLabel} />
        <Label label={rightLabel} />
      </View>
      <View style={{marginVertical: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
        {data.map(item => (
          <Button key={item} label={item} active={item === value} onPress={() => selectValue(item)} {...props} />
        ))}
      </View>
    </View>
  )
}

export default LoanTerm
