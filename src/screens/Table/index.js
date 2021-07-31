import React from 'react'
import {View, Text} from 'react-native'
import styles from '../../styles/styles'
import {Container, Picker, FlatList} from 'components'
import {useBasicMortgageCalculator} from 'context/basicMortgageCalculator'
import {formatNumber} from 'utils/formatter'
import calculateMonthlyYearlyPayment from '../../utils/calculateMonthlyYearlyPayment'

function ListHeader({term}) {
  return (
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
}
ListHeader = React.memo(ListHeader)

function ListItem({term, data}) {
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

ListItem = React.memo(ListItem)

function Table() {
  const [{basic}] = useBasicMortgageCalculator()
  const {tableData} = calculateMonthlyYearlyPayment(basic)

  const [term, setTerm] = React.useState('year')

  return (
    <Container>
      <Picker value={term} onChange={setTerm} />
      <FlatList
        listItem={item => <ListItem term={term} data={item} />}
        data={tableData[term]}
        keyExtractor={item => item.label}
        ListHeaderComponent={() => <ListHeader term={term} />}
        horizontal={false}
      />
    </Container>
  )
}

export default React.memo(Table)
