import calculateExtraPaymentsAndInterest from './calculateExtraPaymentAndInterest'
import moment from 'moment'

// P[r(1+r)^n/((1+r)^n)-1)]
// p - principle
// r - interest rate /= 1200
// n - 12 * loanTerm

export default data => {
  let {
    homeValue,
    monthlyPaymentRaw,
    paymentFrequency,
    mortgageAmount: p, // 12 months per year, monthly interest
    interest: r,
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
    numberOfPayments,
  } = data

  // const fixedMonthlyPayment = monthlyPaymentRaw.toFixed(2)
  // paymentFrequency =
  //   paymentFrequency === 'Monthly'
  //     ? {type: paymentFrequency, amount: Number(fixedMonthlyPayment).toFixed(2)}
  //     : {type: paymentFrequency, amount: Number(fixedMonthlyPayment / 2).toFixed(2)}

  // r = Number(r)
  // const monthlyOrBiWeeklyPayment = Number(monthlyOrBiWeekly.payment)
  // propertyTax = paymentFrequency.type === 'Monthly' ? propertyTax / 12 : propertyTax / 12 / 2
  // homeInsurance = paymentFrequency.type === 'Monthly' ? homeInsurance / 12 : homeInsurance / 12 / 2
  // pmi = paymentFrequency.type === 'Monthly' ? pmi / 12 : pmi / 12 / 2
  // hoaFees = paymentFrequency.type === 'Monthly' ? hoaFees : hoaFees / 2
  // const endDate = moment(startDate).add(loanTerm.years, 'years')

  // const totalPaymentMonthly =
  //   Number(paymentFrequency.amount) + monthlyOrBiWeeklyPayment + propertyTax + homeInsurance + pmi + hoaFees

  // const totalExtraPaymentAndInterest = calculateExtraPaymentsAndInterest(
  //   paymentFrequency,
  //   p,
  //   r,
  //   loanTerm.months,
  //   oneTime,
  //   monthlyOrBiWeekly,
  //   quarterly,
  //   yearly,
  //   monthlyPaymentRaw * loanTerm.months - p,
  // )

  // const downPayment = (homeValue - p).toFixed(2)
  // const totalTax = propertyTax * totalExtraPaymentAndInterest.months
  // const totalInsurance = homeInsurance * totalExtraPaymentAndInterest.months
  // const totalPMI = pmi * 45 // Default value is 44 months. In the actual app the default is 44 months
  // const totalFees = totalTax + totalInsurance + totalPMI

  // const totalAllPayments = totalFees + totalExtraPaymentAndInterest.totalInterest + p + Number(downPayment)

  return {
    ...data,
    // paymentFrequency,
    // principalAndInterest: 0,
    // monthlyOrBiWeeklyExtraPayment: monthlyOrBiWeeklyPayment,
    // propertyTax: propertyTax.toFixed(2),
    // homeInsurance: homeInsurance.toFixed(2),
    // pmi: pmi.toFixed(2),
    // hoaFees: hoaFees.toFixed(2),
    // totalPayment: totalPaymentMonthly,
    // numberOfPayments: loanTerm.months || numberOfPayments, // initial num payments is 360
    // endDate,
    // downPayment,
    // totalExtraPayment: totalExtraPaymentAndInterest.totalExtraPayment.toFixed(2),
    // principal: (p - totalExtraPaymentAndInterest.totalExtraPayment).toFixed(2),
    // totalInterest: totalExtraPaymentAndInterest.totalInterest.toFixed(2),
    // totalFees,
    // totalAllPayments: totalAllPayments.toFixed(2),
  }
}
