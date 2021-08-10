import React from 'react'
import calculateExtraPaymentsAndInterest from './calculateExtraPaymentAndInterest'
import {FontAwesome5, MaterialCommunityIcons, Fontisto} from '@expo/vector-icons'
import colors from '../styles/colors'
import moment from 'moment'
import {unformat} from '../utils/formatter'

const calcPercentage = (total, val) => Number(((val / total) * 100).toFixed(2))

export default data => {
  let {
    paymentFrequency,
    mortgageAmount, // 12 months per year, monthly interest
    interest,
    loanTerm,
    monthlyOrBiWeekly,
    propertyTax,
    homeInsurance,
    pmi,
    hoaFees,
    downPayment,
    oneTime,
    quarterly,
    yearly,
  } = data

  propertyTax = paymentFrequency.type === 'Monthly' ? propertyTax.amount / 12 : propertyTax.amount / 12 / 2
  homeInsurance = paymentFrequency.type === 'Monthly' ? homeInsurance.amount / 12 : homeInsurance.amount / 12 / 2
  pmi = paymentFrequency.type === 'Monthly' ? pmi.amount / 12 : pmi.amount / 12 / 2
  hoaFees = paymentFrequency.type === 'Monthly' ? hoaFees : hoaFees / 2

  const totalExtraPaymentAndInterest = calculateExtraPaymentsAndInterest(
    paymentFrequency,
    mortgageAmount,
    interest,
    loanTerm,
    oneTime,
    monthlyOrBiWeekly,
    quarterly,
    yearly,
  )

  const principal = mortgageAmount - totalExtraPaymentAndInterest.totalExtraPayment

  const totalTax = propertyTax * totalExtraPaymentAndInterest.months
  const totalInsurance = homeInsurance * totalExtraPaymentAndInterest.months
  const totalPMI = pmi * 45 // Default value is 44 months. In the actual app the default is 44 months
  const totalFees = totalTax + totalInsurance + totalPMI + hoaFees * loanTerm.months
  const totalAllPayments = totalFees + totalExtraPaymentAndInterest.totalInterest + mortgageAmount + downPayment.amount

  const interestPrincipalPercentage = []

  const principalPercent = calcPercentage(totalAllPayments, principal)
  const interestPercent = calcPercentage(totalAllPayments, totalExtraPaymentAndInterest.totalInterest)
  const downPaymentPercent = calcPercentage(totalAllPayments, downPayment.amount)
  const totalFeesPercent = calcPercentage(totalAllPayments, totalFees)

  interestPrincipalPercentage.push({
    label: `Principal`,
    percent: principalPercent,
    total: principal,
    icon: <FontAwesome5 name="piggy-bank" color={colors.green} size={18} />,
    color: colors.green,
  })
  interestPrincipalPercentage.push({
    label: `Interest`,
    percent: interestPercent,
    total: totalExtraPaymentAndInterest.totalInterest,
    icon: <MaterialCommunityIcons name="percent" color={colors.orange} size={18} />,
    color: colors.orange,
  })

  interestPrincipalPercentage.push({
    label: `Down Payment`,
    percent: downPaymentPercent,
    total: downPayment.amount,
    icon: <Fontisto name="wallet" color={colors.cyan} size={18} />,
    color: colors.cyan,
  })

  interestPrincipalPercentage.push({
    label: `Tax, Insurance, PMI & Fess`,
    percent: totalFeesPercent,
    total: totalFees,
    icon: <FontAwesome5 name="wallet" color={colors.pink} size={18} />,
    color: colors.pink,
  })

  return {
    totalPayment: totalAllPayments,
    interestPrincipalPercentage,
  }
}
