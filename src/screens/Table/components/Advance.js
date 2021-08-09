import React from 'react'
import {View, ScrollView} from 'react-native'
import styles from '../../../styles/styles'
import {Container, Picker} from 'components'
import {useAdvanceMortgageCalculator} from '../../../context/advanceMortgageCalculator'
import calculateAdvanceMonthlyYearlyPayment from '../../../utils/calculateAdvanceMonthlyYearlyPayment'
import {Table, Row} from 'react-native-table-component'
import numbro from 'numbro'

const tableHead = ['DATE', 'INTEREST', 'PRINCIPAL', 'EXTRA', 'OTHERS', 'TOTAL', 'BALANCE']

function AdvanceTable() {
  const [{advance}] = useAdvanceMortgageCalculator()
  const [term, setTerm] = React.useState('year')
  const {data} = calculateAdvanceMonthlyYearlyPayment(advance)

  const widthArr = [term == 'year' ? 60 : 90, 85, 90, 80, 80, 80, 80]
  const tableData = []
  for (let i = 0; i < data[term].length; i += 1) {
    const rowData = []
    for (let j = 0; j < data[term][i].length; j += 1) {
      j === 0
        ? rowData.push(data[term][i][j])
        : rowData.push(`$${numbro(data[term][i][j]).format({thousandSeparated: true, mantissa: 2})}`)
    }
    tableData.push(rowData)
  }

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
        <View>
          <Table>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.listTableHeaderContainer}
              textStyle={[styles.listTableHeader]}
            />
          </Table>
          <ScrollView>
            <Table>
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={widthArr}
                  style={[styles.listItemTableContainer]}
                  textStyle={styles.listItemTable}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </Container>
  )
}

export default React.memo(AdvanceTable)
