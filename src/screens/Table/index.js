import React from 'react'
import {View, Text, FlatList} from 'react-native'
import styles from '../../styles/styles'
import {Container, Picker} from 'components'
import {useBasicMortgageCalculator, updateTableCalculation} from 'context/basicMortgageCalculator'
import {formatNumber} from 'utils/formatter'
import {useFocusEffect} from '@react-navigation/native'

const ListItem = ({data}) => {
  const {label, interest, principal, total, balance} = data
  return (
    <View style={styles.listItemTableContainer}>
      <Text style={styles.listItemTable}>{label}</Text>
      <Text style={styles.listItemTable}>${formatNumber(interest)}</Text>
      <Text style={styles.listItemTable}>${formatNumber(principal)}</Text>
      <Text style={styles.listItemTable}>${formatNumber(total)}</Text>
      <Text style={styles.listItemTable}>${formatNumber(balance)}</Text>
    </View>
  )
}

const ListHeader = () => (
  <View style={styles.listTableHeaderContainer}>
    <Text style={styles.listTableHeader}>YEAR</Text>
    <Text style={styles.listTableHeader}>INTEREST</Text>
    <Text style={styles.listTableHeader}>PRINCIPAL</Text>
    <Text style={styles.listTableHeader}>TOTAL</Text>
    <Text style={styles.listTableHeader}>BALANCE</Text>
  </View>
)

export default function Home() {
  const [{basic}, dispatch] = useBasicMortgageCalculator()
  const [term, setTerm] = React.useState('year')

  const renderItem = ({item}) => <ListItem data={item} />

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
