import React from 'react'
import {ScrollView, View} from 'react-native'
import colors from 'styles/colors'
import {MaterialIcons} from '@expo/vector-icons'
import variables from 'styles/variables'
import {Container, TextInput} from 'components'
import {useAdvanceStateMortgageCalculator} from '../../../context/advanceMortgageCalculator'
import calculateDetailAdvance from '../../../utils/calculateDetailAdvance'
import numbro from 'numbro'

function Detail() {
  const advance = useAdvanceStateMortgageCalculator()

  const data = calculateDetailAdvance(advance)

  return (
    <Container>
      <ScrollView>
        {data.map(({label, value, mantissa = 2, icon = true, dates, date, id, alert}) => {
          return date ? (
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}} key={id}>
              {dates.map(({label, value}) => (
                <TextInput
                  key={label}
                  containerStyle={{width: '45%'}}
                  inputStyle={{fontSize: 14}}
                  label={label}
                  editable={false}
                  value={value}
                />
              ))}
            </View>
          ) : (
            <TextInput
              key={id}
              label={label}
              editable={false}
              value={alert || numbro(value).format({thousandSeparated: true, mantissa})}
              icon={
                icon && !alert ? (
                  <MaterialIcons name="attach-money" size={variables.iconSizeMedium} color={colors.gray400} />
                ) : null
              }
            />
          )
        })}
      </ScrollView>
    </Container>
  )
}

export default React.memo(Detail)
