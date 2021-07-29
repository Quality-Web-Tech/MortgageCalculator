import React, {useState} from 'react'
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

const LoanLength = ({leftLabel, rightLabel}) => {
  const [selected, setSelected] = useState(false)
  return (
    <View style={{marginVertical: 8}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Label label={leftLabel} />
        <Label label={rightLabel} />
      </View>
      <View style={{marginVertical: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button label={10} />
        <Button label={15} />
        <Button label={20} />
        <Button label={30} />
      </View>
    </View>
  )
}

export default LoanLength
