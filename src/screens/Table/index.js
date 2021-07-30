import React, {useEffect} from 'react'
import {View, Text, Platform, FlatList, StyleSheet} from 'react-native'
import colors from 'styles/colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import variables from 'styles/variables'
import themes from '../../styles/themes'
import fontFamily from '../../styles/fontFamily'
import {Container, Picker} from 'components'
import {useBasicMortgageCalculator, updateTableCalculation} from 'context/basicMortgageCalculator'
import {formatDate, formatNumber} from 'utils/formatter'
import {useFocusEffect} from '@react-navigation/native'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    year: 2021,
    interest: 994.91,
    principal: 1222.8,
    total: 2217.72,
    balance: 98777.2,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    year: 2022,
    interest: 1952.87,
    principal: 2482.56,
    total: 4435.43,
    balance: 96294.63,
  },
]

const Item = ({data}) => {
  const {label, interest, principal, total, balance} = data
  return (
    <View style={{flexDirection: 'row', paddingBottom: 6, justifyContent: 'space-between'}}>
      <Text style={styles.title}>{label}</Text>
      <Text style={styles.title}>${formatNumber(interest)}</Text>
      <Text style={styles.title}>${formatNumber(principal)}</Text>
      <Text style={styles.title}>${formatNumber(total)}</Text>
      <Text style={styles.title}>${formatNumber(balance)}</Text>
    </View>
  )
}

const ListHeader = () => (
  <View style={{paddingTop: 26, paddingBottom: 12, flexDirection: 'row', justifyContent: 'space-between'}}>
    <Text style={{fontSize: 14, fontFamily: fontFamily.MONTSERRAT_SEMIBOLD, color: colors.gray600}}>YEAR</Text>
    <Text style={{fontSize: 14, fontFamily: fontFamily.MONTSERRAT_SEMIBOLD, color: colors.gray600}}>INTEREST</Text>
    <Text style={{fontSize: 14, fontFamily: fontFamily.MONTSERRAT_SEMIBOLD, color: colors.gray600}}>PRINCIPAL</Text>
    <Text style={{fontSize: 14, fontFamily: fontFamily.MONTSERRAT_SEMIBOLD, color: colors.gray600}}>TOTAL</Text>
    <Text style={{fontSize: 14, fontFamily: fontFamily.MONTSERRAT_SEMIBOLD, color: colors.gray600}}>BALANCE</Text>
  </View>
)

export default function Home() {
  const [{basic}, dispatch] = useBasicMortgageCalculator()
  const {mortgageAmount, loanTerm, interest, startDate} = basic

  const [term, setTerm] = React.useState('year')

  const renderItem = ({item}) => <Item data={item} />

  useFocusEffect(
    React.useCallback(() => {
      console.log('rerender inside Table2 ')
      updateTableCalculation(dispatch)
    }, []),
  )

  return (
    <Container>
      <Picker value={term} onChange={setTerm} />
      <FlatList
        data={basic[term]}
        renderItem={renderItem}
        keyExtractor={item => item.label}
        ListHeaderComponent={ListHeader}
        horizontal={false}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    fontFamily: fontFamily.MONTSERRAT_REGULAR,
    color: colors.gray600,
  },
})
