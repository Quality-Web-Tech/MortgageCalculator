import React from 'react'
import {FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons'
import colors from '../styles/colors'

// P[r(1+r)^n/((1+r)^n)-1)]
// p - principle
// r - interest rate /= 1200
// n - 12 * loanTerm

const calcPercentage = (total, val) => Number(((val / total) * 100).toFixed(2))
const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

export default data => {
  const copiedData = {...data}

  let {mortgageAmount: principal, interest, loanTerm, startDate} = copiedData
  principal = Number(principal)
  interest = Number(interest)

  const p = principal
  const r = (interest /= 1200) // 12 months per year, monthly interest
  const n = loanTerm * 12 // months to be paid
  const interestPrincipalPercentage = []

  const monthlyPaymentRaw = (p * r) / (1 - Math.pow(1 + r, n * -1))
  const totalPayment = (monthlyPaymentRaw * n).toFixed(2)
  const totalInterest = (totalPayment - p).toFixed(2)

  const principalPercent = calcPercentage(totalPayment, principal)
  const interestPercent = calcPercentage(totalPayment, totalInterest)

  interestPrincipalPercentage.push({
    label: `Principal`,
    percent: principalPercent,
    total: principal,
    icon: <FontAwesome5 name="wallet" color={colors.green} size={18} />,
    color: colors.green,
  })
  interestPrincipalPercentage.push({
    label: `Interest`,
    percent: interestPercent,
    total: totalInterest,
    icon: <MaterialCommunityIcons name="percent" color={colors.orange} size={18} />,
    color: colors.orange,
  })

  return {
    totalPayment,
    interestPrincipalPercentage,
  }
}
