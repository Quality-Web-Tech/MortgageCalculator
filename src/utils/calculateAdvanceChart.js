import React from 'react'
import {FontAwesome5, MaterialCommunityIcons, Fontisto} from '@expo/vector-icons'
import colors from '../styles/colors'
import {calculateVariables} from './calculations'

const calcPercentage = (total, val) => Number(((val / total) * 100).toFixed(2))

export default data => {
  let {downPayment} = data

  const {principal, totalAllPayments, totalInterest, totalFees} = calculateVariables(data)

  const interestPrincipalPercentage = []

  const principalPercent = Number(calcPercentage(totalAllPayments, principal).toFixed(1))
  const interestPercent = Number(calcPercentage(totalAllPayments, totalInterest).toFixed(1))
  const downPaymentPercent = Number(calcPercentage(totalAllPayments, downPayment.amount).toFixed(1))
  const totalFeesPercent = Number(calcPercentage(totalAllPayments, totalFees).toFixed(1))

  interestPrincipalPercentage.push({
    label: `Principal`,
    percent: principalPercent,
    total: principal,
    icon: <FontAwesome5 name="piggy-bank" color={colors.green} size={16} />,
    color: colors.green,
  })
  interestPrincipalPercentage.push({
    label: `Interest`,
    percent: interestPercent,
    total: totalInterest,
    icon: <MaterialCommunityIcons name="percent" color={colors.orange} size={16} />,
    color: colors.orange,
  })

  interestPrincipalPercentage.push({
    label: `Down Payment`,
    percent: downPaymentPercent,
    total: downPayment.amount,
    icon: <Fontisto name="wallet" color={colors.cyan} size={16} />,
    color: colors.cyan,
  })

  interestPrincipalPercentage.push({
    label: `Tax, Insurance, PMI & Fess`,
    percent: totalFeesPercent,
    total: totalFees,
    icon: <FontAwesome5 name="wallet" color={colors.pink} size={16} />,
    color: colors.pink,
  })

  return {
    totalPayment: totalAllPayments,
    interestPrincipalPercentage,
  }
}
