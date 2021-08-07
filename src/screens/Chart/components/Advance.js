import React, {useState} from 'react'
import {Text, View} from 'react-native'
import styles from 'styles/styles'
import {Container, FlatList} from 'components'
import {useAdvanceMortgageCalculator} from '../../../context/advanceMortgageCalculator'
import {formatNumber} from 'utils/formatter'
import {PieChart} from 'react-native-svg-charts'
import calculateAdvanceChart from '../../../utils/calculateAdvanceChart'
import numbro from 'numbro'

function ListItem({data}) {
  const {label, total, percent, icon} = data
  return (
    <View style={{flexDirection: 'row'}}>
      {icon}
      <View style={styles.chartExpenseContainer}>
        <Text style={styles.chartExpenseLabel}>{`${label} (${percent}%)`}</Text>
        <Text style={styles.chartExpenseTotal}>${numbro(total).format({thousandSeparated: true, mantissa: 2})}</Text>
      </View>
    </View>
  )
}

ListItem = React.memo(ListItem)

function Chart() {
  const [{advance}] = useAdvanceMortgageCalculator()
  const {interestPrincipalPercentage: data, totalPayment} = calculateAdvanceChart(advance)

  const [pieLayout, setPieLayout] = useState()

  const pieData = data.map((value, index) => ({
    value: value.percent,
    svg: {
      fill: value.color,
    },
    key: `pie-${index}`,
    // onPress: () => console.log('press', index), // can be used to update center pie charge labels
  }))

  return (
    <Container>
      <View
        onLayout={e => {
          setPieLayout(e.nativeEvent.layout)
        }}
        style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}
      >
        <PieChart innerRadius="55%" style={{height: 200, width: '100%'}} data={pieData} padAngle={0.02} />

        {pieLayout && (
          <>
            <Text style={[{top: pieLayout.height / 2 - 20}, styles.chartLabelHeader]}>Mortgage Cost</Text>
            <Text style={[styles.chartTotal, {top: pieLayout.height / 2 + 3}]}>
              ${numbro(totalPayment).format({thousandSeparated: true, mantissa: 2})}
            </Text>
          </>
        )}
      </View>

      <FlatList
        listItem={item => <ListItem data={item} />}
        style={{marginTop: 60}}
        data={data}
        keyExtractor={item => item.label}
      />
    </Container>
  )
}

export default React.memo(Chart)
