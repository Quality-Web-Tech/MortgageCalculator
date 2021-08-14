import calculateExtraPaymentsAndInterest from './calculateExtraPaymentAndInterest'
import moment from 'moment'

const calulateTotalMonthlyPayments = (data, key) => {
  let {paymentFrequency, propertyTax, homeInsurance, pmi, hoaFees} = data

  propertyTax = paymentFrequency === 'Monthly' ? propertyTax.amount / 12 : propertyTax.amount / 12 / 2
  homeInsurance = paymentFrequency === 'Monthly' ? homeInsurance.amount / 12 : homeInsurance.amount / 12 / 2
  let pmiMonthly = paymentFrequency === 'Monthly' ? pmi.amount / 12 : pmi.amount / 12 / 2
  hoaFees = paymentFrequency === 'Monthly' ? hoaFees : hoaFees / 2

  const total = propertyTax + homeInsurance + pmiMonthly + hoaFees

  if (key === 'pmi') {
    return [total, pmiMonthly]
  }

  return propertyTax + homeInsurance + pmiMonthly + hoaFees
}

const calculateMonthlyPayment = (frequency, p, r, n) => {
  r = r / 100 / 12
  const amount = (p * r) / (1 - Math.pow(1 + r, n * -1))

  return frequency === 'Monthly' ? {type: frequency, amount} : {type: frequency, amount: amount / 2}
}

const calculateVariables = data => {
  let {
    homeValue,
    mortgageAmount,
    interest,
    loanTerm,
    monthlyOrBiWeekly,
    propertyTax,
    paymentFrequency: payFrequency,
    homeInsurance,
    pmi,
    hoaFees,
    startDate,
    oneTime,
    quarterly,
    yearly,
    downPayment,
  } = data

  const paymentFrequency = calculateMonthlyPayment(payFrequency, mortgageAmount, interest, loanTerm.months)
  const isMonthly = paymentFrequency.type === 'Monthly' ? true : false
  const monthlyOrBiWeeklyPayment = monthlyOrBiWeekly.payment
  propertyTax = isMonthly ? propertyTax.amount / 12 : propertyTax.amount / 26

  homeInsurance = isMonthly ? homeInsurance.amount / 12 : homeInsurance.amount / 26

  pmi =
    downPayment.percent < 20
      ? isMonthly
        ? (mortgageAmount * pmi.percent) / 1200
        : (mortgageAmount * pmi.percent) / 2600
      : 0
  hoaFees = isMonthly ? hoaFees : (hoaFees * 12) / 26

  const totalPaymentMonthly =
    paymentFrequency.amount + monthlyOrBiWeeklyPayment + propertyTax + homeInsurance + pmi + hoaFees
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

  const endDateEx = isMonthly ? months : Math.floor((months / 26) * 12) - 1
  const endDate = moment(startDate).add(endDateEx, 'months') // Subracted extra month

  const totalFessMonths = isMonthly ? 0 : 3

  const totalTax = propertyTax * (months - totalFessMonths)
  const totalInsurance = homeInsurance * (months - totalFessMonths)
  const totalPMI = pmi * pmiDuration
  const totalHoaFees = hoaFees * (months - totalFessMonths)
  const totalFees = totalTax + totalInsurance + totalPMI + totalHoaFees // PMI not required if downpayment is 20%
  const totalAllPayments = totalFees + totalInterest + mortgageAmount + downPayment.amount

  return {
    paymentFrequency,
    principal,
    totalPaymentMonthly,
    endDate,
    totalAllPayments,
    months,
    totalExtraPayment,
    totalInterest,
    totalFees,
    totalAllPayments,
    monthlyOrBiWeeklyPayment,
    pmiDuration,
    propertyTax,
    homeInsurance,
    hoaFees,
    pmi,
  }
}

export {calulateTotalMonthlyPayments, calculateMonthlyPayment, calculateVariables}
