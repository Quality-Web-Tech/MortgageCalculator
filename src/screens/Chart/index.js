import React, {useState, useRef, useEffect, useLayoutEffect} from 'react'
import {Text, Dimensions} from 'react-native'
import colors from 'styles/colors'
import {MaterialIcons} from '@expo/vector-icons'
import variables from 'styles/variables'
import fontFamily from 'styles/fontFamily'
import {Container, TextInput} from 'components'
import {useBasicMortgageCalculator} from 'context/basicMortgageCalculator'
import {formatDate, formatNumber} from 'utils/formatter'
import {PieChart} from 'react-native-svg-charts'

// Re calculate if PieChart position has changed!!
const pieInfo = {
  height: 198.04444885253906,
  width: 349.8666687011719,
}

export default function Chart() {
  const deviceWidth = Dimensions.get('window').width

  const data = [50, 30, 15, 20]

  const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

  const pieData = data.map((value, index) => ({
    value,

    svg: {
      fill: randomColor(),
      onPress: () => console.log('press', index),
    },
    key: `pie-${index}`,
  }))

  return (
    <Container>
      <PieChart innerRadius="52%" style={{height: 200, marginTop: 10}} data={pieData} padAngle={0.02} />
      {pieInfo && (
        <Text
          style={{
            position: 'absolute',
            left: pieInfo.width / 2 - 7,
            top: pieInfo.height / 2 + 8,
            fontSize: 12,
            fontFamily: fontFamily.MONTSERRAT_BOLD,
            color: colors.gray600,
          }}
        >
          Mortgage Cost
        </Text>
      )}
    </Container>
  )
}
