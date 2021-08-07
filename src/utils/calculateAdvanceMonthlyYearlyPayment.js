import moment from 'moment'
import {calulateTotalMonthlyPayments} from './calculations'
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const dataForMonth = (startMonth, currentYear, ip, mmip, balance) => {
  return {
    label: `${months[startMonth]}/${currentYear}`,
    interest: ip.toFixed(2),
    principal: mmip.toFixed(2),
    total: (ip + mmip).toFixed(2),
    balance: balance < 0 ? 0 : balance.toFixed(2),
  }
}
const dataForYear = (currentYear, yearInterest, yearPrincipal, totalExtraPayments, others, yearTotal, balance) => {
  return [
    currentYear,
    yearInterest.toFixed(2),
    yearPrincipal.toFixed(2),
    totalExtraPayments,
    others,
    yearTotal,
    balance,
  ]
}

const calcMonthlyAndYearly = data => {
  const copyData = {...data}
  let {
    mortgageAmount: principal,
    interest,
    loanTerm,
    startDate,
    monthlyPaymentRaw,
    oneTime,
    monthlyOrBiWeekly,
    quarterly,
    yearly,
  } = copyData

  let balance = Number(principal)
  interest /= 1200 // 12 months per year, monthly interest
  let term = loanTerm.months //* 12
  let n = 0 // variable to keep track each months

  const [monthlyPayment, pmiMonthly] = calulateTotalMonthlyPayments(data, 'pmi')

  let startMonth = startDate.getMonth()
  let currentYear = startDate.getFullYear()

  // Extra payments
  let {payment: oPayment, startDate: oDate} = oneTime
  let {payment: bPayment, startDate: bDate} = monthlyOrBiWeekly
  let {payment: qPayment, startDate: qDate} = quarterly
  let {payment: yPayment, startDate: yDate} = yearly

  oDate = moment(oDate)
  bDate = moment(bDate)
  qDate = moment(qDate)
  yDate = moment(yDate)

  const oneTimeStartDate = oDate.diff(startDate, 'months')
  const biWeeklyStartDate = bDate.diff(startDate, 'months')
  const quarterlyStartDate = qDate.diff(startDate, 'months')
  const yearlyStartDate = yDate.diff(startDate, 'months')

  let totalExtraPayments = 0

  let yearInterest = 0
  let yearPrincipal = 0
  let yearTotal = 0
  let others = 0

  let previousBalance = 0

  const tableData = {
    month: [],
    year: [],
  }
  yPayment = 100

  while (startMonth < 12 && term > 0) {
    let ip = balance * interest // interest based on balance
    let mmip = monthlyPaymentRaw - ip // principal that goes to balance

    // check if one of extra payments is due
    // extra payments to mmip
    if (oneTimeStartDate === n && oPayment) {
      mmip = mmip + oPayment
      totalExtraPayments += oPayment
    }

    if (biWeeklyStartDate <= n && bPayment) {
      mmip = mmip + bPayment
      totalExtraPayments += bPayment
    }

    if (quarterlyStartDate <= n && n % 3 && qPayment) {
      mmip = mmip + qPayment
      totalExtraPayments += qPayment
    }

    if (yearlyStartDate <= n && n % 12 === 0 && yPayment) {
      mmip = mmip + yPayment
      totalExtraPayments += yPayment
    }

    // update yearly data
    yearInterest += ip
    yearPrincipal += mmip
    others += n < 44 ? monthlyPayment : monthlyPayment - pmiMonthly // hoe, insurance, property tax
    yearTotal = yearInterest + yearPrincipal + others // overall total fees

    startMonth += 1
    term -= 1
    n += 1

    // save previous balance
    previousBalance = balance
    // update the balance - principal + extra
    balance = balance - mmip

    // Save monthly data
    // tableData.month.push(dataForMonth(startMonth, currentYear, ip, mmip, balance))

    //notes Principal is adding extra 100 fro line 98 ...
    // Save yearly and reset variables
    if (startMonth === 12 || balance <= 0) {
      balance <= 0 &&
        console.log(currentYear, yearInterest, mmip, yearPrincipal, totalExtraPayments, others, yearTotal, balance)

      if (balance <= 0) {
        dataForYear(currentYear, yearInterest, yearPrincipal, totalExtraPayments, others, yearTotal, 0)
      }

      tableData.year.push(
        dataForYear(currentYear, yearInterest, yearPrincipal, totalExtraPayments, others, yearTotal, balance),
      )

      yearInterest = 0
      yearTotal = 0
      yearPrincipal = 0
      totalExtraPayments = 0
      others = 0
      startMonth = 0
      currentYear += 1
    }

    if (balance <= 0) break
  }

  return {
    data: tableData,
  }
}

export default calcMonthlyAndYearly

// Save data before exiting
// if (term === 0) {
//   tableData.year.push(
//     dataForYear(currentYear, yearInterest, yearPrincipal, totalExtraPayments, others, yearTotal, balance),
//   )
// }

// n > 350 &&
//   n < 355 &&
//   console.log(currentYear, startMonth, ip, mmip, balance, currentYear, totalExtraPayments, yearPrincipal)

// if (mmip + totalExtraPayments >= balance) {
//   console.log(currentYear, startMonth, ip, mmip, balance, currentYear, totalExtraPayments, yearPrincipal)
//   // tableData.year.push(dataForYear(currentYear, ip, balance, totalExtraPayments, others, yearTotal, 0))
//   break
// }
