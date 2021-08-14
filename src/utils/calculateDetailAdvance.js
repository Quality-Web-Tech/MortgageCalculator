import {formatDate} from '../utils/formatter'
import {calculateVariables} from './calculations'
import moment from 'moment'

export default data => {
  let {homeValue, mortgageAmount, startDate, downPayment} = data

  const {
    paymentFrequency,
    principal,
    totalPaymentMonthly,
    endDate,
    totalAllPayments,
    months,
    totalExtraPayment,
    totalInterest,
    totalFees,
    monthlyOrBiWeeklyPayment,
    pmiDuration,
    propertyTax,
    homeInsurance,
    hoaFees,
    pmi,
  } = calculateVariables(data)

  return [
    {
      label: 'Home Value',
      value: homeValue,
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
      alert: downPayment.percent < 20 ? '' : 'PMI not required',
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
      value: downPayment.amount,
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
