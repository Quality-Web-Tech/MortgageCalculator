import React, {useState} from 'react'
import {Text, View, FlatList} from 'react-native'
import styles from 'styles/styles'
import {Container} from 'components'
import {useBasicMortgageCalculator} from 'context/basicMortgageCalculator'
import {formatNumber} from 'utils/formatter'
import {PieChart} from 'react-native-svg-charts'

const ListItem = ({data}) => {
  const {label, total, percent, icon} = data
  return (
    <View style={{flexDirection: 'row'}}>
      {icon}
      <View style={styles.chartExpenseContainer}>
        <Text style={styles.chartExpenseLabel}>{`${label} (${percent}%)`}</Text>
        <Text style={styles.chartExpenseTotal}>${formatNumber(total)}</Text>
      </View>
    </View>
  )
}

export default function Chart() {
  const [{basic}] = useBasicMortgageCalculator()
  const {interestPrincipalPercentage: data, totalPayment} = basic

  const [pieLayout, setPieLayout] = useState()

  const pieData = data.map((value, index) => ({
    value: value.percent,
    svg: {
      fill: value.color,
    },
    key: `pie-${index}`,
    // onPress: () => console.log('press', index), // can be used to update center pie charge labels
  }))

  const renderItem = ({item}) => <ListItem data={item} />

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
            <Text style={[styles.chartTotal, {top: pieLayout.height / 2 + 3}]}>${formatNumber(totalPayment)}</Text>
          </>
        )}
      </View>

      <FlatList
        style={{marginTop: 60}}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.label}
        horizontal={false}
      />
    </Container>
  )
}
