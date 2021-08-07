import React from 'react'
import calculateExtraPaymentsAndInterest from './calculateExtraPaymentAndInterest'
import {FontAwesome5, MaterialCommunityIcons, Fontisto} from '@expo/vector-icons'
import colors from '../styles/colors'
import moment from 'moment'

const calcPercentage = (total, val) => Number(((val / total) * 100).toFixed(2))

export default data => {
  let {
    homeValue,
    monthlyPaymentRaw,
    paymentFrequency,
    mortgageAmount, // 12 months per year, monthly interest
    interest,
    loanTerm,
    monthlyOrBiWeekly,
    propertyTax,
    homeInsurance,
    pmi,
    hoaFees,
    startDate,
    oneTime,
    quarterly,
    yearly,
  } = data

  paymentFrequency =
    paymentFrequency === 'Monthly'
      ? {type: paymentFrequency, amount: monthlyPaymentRaw}
      : {type: paymentFrequency, amount: monthlyPaymentRaw / 2}

  pmi = typeof pmi === 'object' ? pmi.true : pmi

  const monthlyOrBiWeeklyPayment = monthlyOrBiWeekly.payment
  propertyTax = paymentFrequency.type === 'Monthly' ? propertyTax / 12 : propertyTax / 12 / 2
  homeInsurance = paymentFrequency.type === 'Monthly' ? homeInsurance / 12 : homeInsurance / 12 / 2
  pmi = paymentFrequency.type === 'Monthly' ? (mortgageAmount * pmi) / 100 / 12 : (homeValue * pmi) / 100 / 12 / 2
  hoaFees = paymentFrequency.type === 'Monthly' ? hoaFees : hoaFees / 2

  const totalPaymentMonthly =
    paymentFrequency.amount + monthlyOrBiWeeklyPayment + propertyTax + homeInsurance + pmi + hoaFees
  const endDate = moment(startDate).add(loanTerm.years, 'years')
  const downPayment = homeValue - mortgageAmount

  const totalExtraPaymentAndInterest = calculateExtraPaymentsAndInterest(
    paymentFrequency,
    mortgageAmount,
    interest,
    loanTerm.months,
    oneTime,
    monthlyOrBiWeekly,
    quarterly,
    yearly,
    monthlyPaymentRaw * loanTerm.months - mortgageAmount,
  )

  const principal = mortgageAmount - totalExtraPaymentAndInterest.totalExtraPayment

  const totalTax = propertyTax * totalExtraPaymentAndInterest.months
  const totalInsurance = homeInsurance * totalExtraPaymentAndInterest.months
  const totalPMI = pmi * 45 // Default value is 44 months. In the actual app the default is 44 months
  const totalFees = totalTax + totalInsurance + totalPMI + hoaFees * loanTerm.months
  const totalAllPayments = totalFees + totalExtraPaymentAndInterest.totalInterest + mortgageAmount + downPayment

  const interestPrincipalPercentage = []

  const principalPercent = calcPercentage(totalAllPayments, principal)
  const interestPercent = calcPercentage(totalAllPayments, totalExtraPaymentAndInterest.totalInterest)
  const downPaymentPercent = calcPercentage(totalAllPayments, downPayment)
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
    total: downPayment,
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
