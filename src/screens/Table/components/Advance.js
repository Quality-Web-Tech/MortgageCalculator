import React from 'react'
import {View, ScrollView} from 'react-native'
import styles from '../../../styles/styles'
import {Container, Picker} from 'components'
import {useAdvanceMortgageCalculator} from '../../../context/advanceMortgageCalculator'
import calculateAdvanceMonthlyYearlyPayment from '../../../utils/calculateAdvanceMonthlyYearlyPayment'
import {Table, Row} from 'react-native-table-component'
import numbro from 'numbro'

const tableHead = ['DATE', 'INTEREST', 'PRINCIPAL', 'EXTRA', 'OTHERS', 'TOTAL', 'BALANCE']
const widthArr = [60, 85, 90, 80, 80, 80, 80]

function AdvanceTable() {
  const [{advance}] = useAdvanceMortgageCalculator()
  const {data} = calculateAdvanceMonthlyYearlyPayment(advance)

  const [term, setTerm] = React.useState('year')
  const tableData = []
  for (let i = 0; i < data.year.length; i += 1) {
    const rowData = []
    for (let j = 0; j < data.year[i].length; j += 1) {
      j === 0
        ? rowData.push(data.year[i][j])
        : rowData.push(`$${numbro(data.year[i][j]).format({thousandSeparated: true, mantissa: 2})}`)
    }
    tableData.push(rowData)
  }

  return (
    <Container>
      <Picker value={term} onChange={setTerm} />

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
