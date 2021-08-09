import calculateExtraPaymentsAndInterest from './calculateExtraPaymentAndInterest'
import {unformat, formatDate} from '../utils/formatter'
import moment from 'moment'

export default data => {
  let {
    homeValue: hv,
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

  const isMonthly = paymentFrequency.type === 'Monthly' ? true : false
  const {formatted: homeValue} = unformat(hv)

  const monthlyOrBiWeeklyPayment = monthlyOrBiWeekly.payment
  propertyTax = isMonthly ? propertyTax / 12 : propertyTax / 26
  homeInsurance = isMonthly ? homeInsurance / 12 : homeInsurance / 26
  pmi = isMonthly ? (mortgageAmount * pmi) / 100 / 12 : (mortgageAmount * pmi) / 100 / 26
  hoaFees = isMonthly ? hoaFees : (hoaFees * 12) / 26

  const totalPaymentMonthly =
    paymentFrequency.amount + monthlyOrBiWeeklyPayment + propertyTax + homeInsurance + pmi + hoaFees
  const downPayment = homeValue - mortgageAmount // PMI not required if downpayment is 20%
  const pmiThreshhold = homeValue - homeValue * 0.2 // downpayment and loan princiapl paid reach 20% stop pmi

  const {totalExtraPayment, months, totalInterest, pmiDuration} = calculateExtraPaymentsAndInterest(
    paymentFrequency,
    mortgageAmount,
    interest,
    loanTerm,
    oneTime,
    monthlyOrBiWeekly,
    quarterly,
    yearly,
    pmiThreshhold,
  )

  const principal = mortgageAmount - totalExtraPayment

  const endDate = moment(startDate).add(isMonthly ? months - 1 : Math.ceil((months / 26) * 12) - 2, 'months') // Subracted extra month

  const totalFessMonths = isMonthly ? 0 : 2
  const totalTax = propertyTax * (months - totalFessMonths) // - 2 is an extra month being added to the calculateExtraPaymentsAndInterest
  const totalInsurance = homeInsurance * (months - totalFessMonths)
  const totalPMI = pmi * pmiDuration // Default value is 45 months, Biweel is 73
  const totalHoaFees = hoaFees * (months - totalFessMonths)
  const totalFees = totalTax + totalInsurance + totalPMI + totalHoaFees

  const totalAllPayments = totalFees + totalInterest + mortgageAmount + downPayment

  return [
    {
      label: 'Home Value',
      value: hv,
      id: 11,
    },
    {
      label: 'Mortgage Amount',
      value: mortgageAmount,
      id: 12,
    },
    {
      label: `${paymentFrequency.type} Principal & Interest`,
      value: paymentFrequency.amount,
      id: 13,
    },
    {
      label: `${paymentFrequency.type} Extra Payment`,
      value: monthlyOrBiWeeklyPayment,
      id: 14,
    },
    {
      label: `${paymentFrequency.type} Property Tax`,
      value: propertyTax,
      id: 15,
    },
    {
      label: `${paymentFrequency.type} Home Insurance`,
      value: homeInsurance,
      id: 16,
    },
    {
      label: `${paymentFrequency.type} PMI (Until ${moment(new Date())
        .add(pmiDuration - 1, 'months')
        .format('MMM, YYYY')})`,
      value: pmi,
      id: 17,
    },
    {
      label: `${paymentFrequency.type} HOA Fees`,
      value: hoaFees,
      id: 18,
    },
    {
      label: 'Total Monthly Payment',
      value: totalPaymentMonthly,
      id: 19,
    },
    {
      label: 'Number Of Payments',
      value: months,
      mantissa: 0,
      icon: null,
      id: 20,
    },
    {
      dates: [
        {
          label: 'Start Date',
          value: formatDate(startDate, 'MMM YYYY'),
          id: 21,
        },
        {
          label: 'Pay Off Date',
          value: formatDate(endDate, 'MMM YYYY'),
          id: 22,
        },
      ],
      date: true,
      id: 30,
    },
    {
      label: 'Down Payment',
      value: downPayment,
      id: 23,
    },
    {
      label: 'Principal',
      value: principal,
      id: 24,
    },
    {
      label: 'Total Extra Payment',
      value: totalExtraPayment,
      id: 25,
    },
    {
      label: 'Total Interest Paid',
      value: totalInterest,
      id: 26,
    },
    {
      label: 'Total Tax, Insurance, PMI & Fees',
      value: totalFees,
      id: 27,
    },
    {
      label: 'Total Of All Payments',
      value: totalAllPayments,
      id: 28,
    },
  ]
}
