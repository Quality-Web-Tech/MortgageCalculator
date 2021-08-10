export const INITIAL_STATE = {
  homeValue: 300000,
  downPayment: {
    percent: 15.0,
    amount: 45000.0,
  },
  mortgageAmount: 255000,
  loanTerm: {
    months: 360,
    years: 30,
  },
  interest: 5,
  pmi: {
    percent: 0.5,
    amount: 1275,
  },
  propertyTax: {
    percent: 1.0,
    amount: 3000,
  },
  homeInsurance: {
    percent: 0.5,
    amount: 1500,
  },
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
  monthlyPaymentRaw: 1368.8951386809565,
}
