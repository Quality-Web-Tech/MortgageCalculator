import React from 'react'
import calculateExtraPaymentsAndInterest from './calculateExtraPaymentAndInterest'
import {FontAwesome5, MaterialCommunityIcons, Fontisto} from '@expo/vector-icons'
import colors from '../styles/colors'
import {calculateMonthlyPayment} from '../utils/calculateMonthlyPayment'

const calcPercentage = (total, val) => Number(((val / total) * 100).toFixed(2))

export default data => {
  let {
    homeValue,
    paymentFrequency: payFrequency,
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
    startDate,
  } = data
  const paymentFrequency = calculateMonthlyPayment(payFrequency, mortgageAmount, interest, loanTerm.months)
  const isMonthly = paymentFrequency.type === 'Monthly' ? true : false

  propertyTax = isMonthly ? propertyTax.amount / 12 : propertyTax.amount / 26
  homeInsurance = isMonthly ? homeInsurance.amount / 12 : homeInsurance.amount / 26
  pmi =
    downPayment.percent < 20
      ? isMonthly
        ? (mortgageAmount * pmi.percent) / 1200
        : (mortgageAmount * pmi.percent) / 2600
      : 0
  hoaFees = isMonthly ? hoaFees : (hoaFees * 12) / 26
  const pmiThreshhold = homeValue - homeValue * 0.2 // downpayment and loan princiapl paid reach 20% stop pmi

  const {totalExtraPayment, months, totalInterest, pmiDuration} = calculateExtraPaymentsAndInterest(
    paymentFrequency,
    mortgageAmount,
    interest,
    oneTime,
    monthlyOrBiWeekly,
    quarterly,
    yearly,
    pmiThreshhold,
    startDate,
  )

  const principal = mortgageAmount - totalExtraPayment

  const totalFessMonths = isMonthly ? 0 : 3

  const totalTax = propertyTax * (months - totalFessMonths)
  const totalInsurance = homeInsurance * (months - totalFessMonths)
  const totalPMI = pmi * pmiDuration
  const totalHoaFees = hoaFees * (months - totalFessMonths)
  const totalFees = totalTax + totalInsurance + totalPMI + totalHoaFees
  const totalAllPayments = totalFees + totalInterest + mortgageAmount + downPayment.amount

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
