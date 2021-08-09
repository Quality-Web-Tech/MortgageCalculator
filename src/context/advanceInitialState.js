import {calculateMonthlyPaymentRaw} from '../utils/calculateMonthlyPayment'

export default {
  homeValue: 300000,
  downPayment: 45000,
  mortgageAmount: 255000,
  loanTerm: {
    months: 360,
    years: 30,
  },
  interest: 5,
  pmi: {
    true: 0.5,
    false: 1275,
    isPercent: true,
    value: 0.5,
  },
  propertyTax: 3000,
  homeInsurance: 1500,
  hoaFees: 0,
  paymentFrequency: 'Monthly',
  startDate: new Date(),
  oneTime: {
    payment: 0,
    startDate: new Date(),
  },
  monthlyOrBiWeekly: {
    payment: 0,
    startDate: new Date(),
  },
  quarterly: {
    payment: 0,
    startDate: new Date(),
  },
  yearly: {
    payment: 0,
    startDate: new Date(),
  },
  monthlyPaymentRaw: calculateMonthlyPaymentRaw({
    mortgageAmount: 255000,
    interest: 5 / 100 / 12, // 5%
    loanTerm: 360,
  }),
}
