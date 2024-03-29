import React from 'react'
import {View, Text, useWindowDimensions, ScrollView} from 'react-native'
import styles from '../../../styles/styles'
import {Container, Picker, FlatList} from 'components'
import {useBasicMortgageCalculator} from 'context/basicMortgageCalculator'
import {formatNumber} from 'utils/formatter'
import calculateMonthlyYearlyPayment from '../../../utils/calculateMonthlyYearlyPayment'

const headerFontSize = (width, size) => {
  if (width >= 380) return {}
  return {fontSize: size}
}

function ListHeader({term}) {
  const screenWidth = useWindowDimensions().width
  const headerFontSizeStyle = headerFontSize(screenWidth, 11)

  return (
    <View style={[styles.listTableHeaderContainer]}>
      <Text style={[styles.listTableHeader, term === 'year' ? {width: 50} : {width: 75}, headerFontSizeStyle]}>
        {term === 'year' ? 'YEAR' : 'MONTH'}
      </Text>
      <Text style={[styles.listTableHeader, {flex: 1}, headerFontSizeStyle]}>INTEREST</Text>
      <Text style={[styles.listTableHeader, {flex: 1}, headerFontSizeStyle]}>PRINCIPAL</Text>
      <Text style={[styles.listTableHeader, {flex: 1}, headerFontSizeStyle]}>TOTAL</Text>
      <Text style={[styles.listTableHeader, {flex: 1}, headerFontSizeStyle]}>BALANCE</Text>
    </View>
  )
}
ListHeader = React.memo(ListHeader)

function ListItem({term, data}) {
  const {label, interest, principal, total, balance} = data
  const screenWidth = useWindowDimensions().width
  const headerFontSizeStyle = headerFontSize(screenWidth, 12)
  return (
    <View style={styles.listItemTableContainer}>
      <Text style={[styles.listItemTable, term === 'year' ? {width: 50} : {width: 75}, headerFontSizeStyle]}>
        {label}
      </Text>
      <Text style={[styles.listItemTable, {flex: 1}, headerFontSizeStyle]}>${formatNumber(interest)}</Text>
      <Text style={[styles.listItemTable, {flex: 1}, headerFontSizeStyle]}>${formatNumber(principal)}</Text>
      <Text style={[styles.listItemTable, {flex: 1}, headerFontSizeStyle]}>${formatNumber(total)}</Text>
      <Text style={[styles.listItemTable, {flex: 1}, headerFontSizeStyle]}>${formatNumber(balance)}</Text>
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
      <ScrollView horizontal={true}>
        <FlatList
          contentContainerStyle={{width: 450}}
          listItem={item => <ListItem term={term} data={item} />}
          data={tableData[term]}
          numColumns={1}
          keyExtractor={item => item.label}
          ListHeaderComponent={() => <ListHeader term={term} />}
          horizontal={false}
        />
      </ScrollView>
    </Container>
  )
}

export default React.memo(Table)
