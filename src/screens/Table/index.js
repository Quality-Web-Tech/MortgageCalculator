import React from 'react'
import {View, Text} from 'react-native'
import styles from '../../styles/styles'
import {Container, Picker, FlatList} from 'components'
import {useBasicMortgageCalculator, updateTableCalculation} from 'context/basicMortgageCalculator'
import {formatNumber} from 'utils/formatter'
import {useFocusEffect} from '@react-navigation/native'

export default function Home() {
  const [{basic}, dispatch] = useBasicMortgageCalculator()
  const [term, setTerm] = React.useState('year')

  const ListItem = ({data}) => {
    const {label, interest, principal, total, balance} = data
    return (
      <View style={styles.listItemTableContainer}>
        <Text style={[styles.listItemTable, term === 'year' ? {width: 50} : {width: 75}]}>{label}</Text>
        <Text style={[styles.listItemTable, {flex: 1}]}>${formatNumber(interest)}</Text>
        <Text style={[styles.listItemTable, {flex: 1}]}>${formatNumber(principal)}</Text>
        <Text style={[styles.listItemTable, {flex: 1}]}>${formatNumber(total)}</Text>
        <Text style={[styles.listItemTable, {flex: 1}]}>${formatNumber(balance)}</Text>
      </View>
    )
  }

  const ListHeader = () => (
    <View style={[styles.listTableHeaderContainer]}>
      <Text style={[styles.listTableHeader, term === 'year' ? {width: 50} : {width: 75}]}>
        {term === 'year' ? 'Year' : 'Month'}
      </Text>
      <Text style={[styles.listTableHeader, {flex: 1}]}>INTEREST</Text>
      <Text style={[styles.listTableHeader, {flex: 1}]}>PRINCIPAL</Text>
      <Text style={[styles.listTableHeader, {flex: 1}]}>TOTAL</Text>
      <Text style={[styles.listTableHeader, {flex: 1}]}>BALANCE</Text>
    </View>
  )

  useFocusEffect(
    React.useCallback(() => {
      updateTableCalculation(dispatch)
    }, []),
  )

  return (
    <Container>
      <Picker value={term} onChange={setTerm} />
      <FlatList
        ListItem={ListItem}
        data={basic[term]}
        keyExtractor={item => item.label}
        ListHeaderComponent={ListHeader}
        horizontal={false}
      />
    </Container>
  )
}
