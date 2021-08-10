import React from 'react'
import {View, Text, useWindowDimensions, ScrollView} from 'react-native'
import styles from '../../../styles/styles'
import {Container, Picker, FlatList} from 'components'
import {formatNumber} from 'utils/formatter'
import {useAdvanceStateMortgageCalculator} from '../../../context/advanceMortgageCalculator'
import calculateAdvanceMonthlyYearlyPayment from '../../../utils/calculateAdvanceMonthlyYearlyPayment'

const headerFontSize = (width, size) => {
  if (width >= 380) return {}
  return {fontSize: size}
}

const listHeaderLabel = ['DATE', 'INTEREST', 'PRINCIPAL', 'EXTRA', 'OTHERS', 'TOTAL', 'BALANCE']

function ListHeader({term}) {
  const screenWidth = useWindowDimensions().width
  const headerFontSizeStyle = headerFontSize(screenWidth, 11)

  return (
    <View style={[styles.listTableHeaderContainer]}>
      {listHeaderLabel.map((label, index) => {
        return (
          <Text
            key={'header' + index}
            style={[
              styles.listTableHeader,
              index && {flex: 1},
              term === 'year' ? {width: 50} : {width: 75},
              headerFontSizeStyle,
            ]}
          >
            {label}
          </Text>
        )
      })}
    </View>
  )
}
ListHeader = React.memo(ListHeader)

function ListItem({term, data}) {
  const {label, interest, principal, total, balance, others, extraPayment} = data
  const lists = [label, interest, principal, extraPayment, others, total, balance]
  const screenWidth = useWindowDimensions().width
  const headerFontSizeStyle = headerFontSize(screenWidth, 12)
  return (
    <View style={styles.listItemTableContainer}>
      {lists.map((list, index) => {
        return (
          <Text
            key={'list' + index}
            style={[
              styles.listItemTable,
              index && {flex: 1},
              term === 'year' ? {width: 50} : {width: 75},
              headerFontSizeStyle,
            ]}
          >
            {!index ? list : formatNumber(list)}
          </Text>
        )
      })}
    </View>
  )
}

ListItem = React.memo(ListItem)

function Table() {
  const advance = useAdvanceStateMortgageCalculator()
  const tableData = calculateAdvanceMonthlyYearlyPayment(advance)
  const [term, setTerm] = React.useState('year')

  return (
    <Container>
      <Picker
        value={term}
        onChange={setTerm}
        items={[
          {label: 'Year', value: 'year'},
          {label: 'All', value: 'all'},
        ]}
      />
      <ScrollView horizontal={true}>
        <FlatList
          contentContainerStyle={{width: term === 'year' ? 530 : 560}}
          listItem={item => <ListItem term={term} data={item} />}
          data={tableData[term]}
          numColumns={1}
          keyExtractor={item => item.label.toString()}
          ListHeaderComponent={() => <ListHeader term={term} />}
          horizontal={false}
        />
      </ScrollView>
    </Container>
  )
}

export default React.memo(Table)
