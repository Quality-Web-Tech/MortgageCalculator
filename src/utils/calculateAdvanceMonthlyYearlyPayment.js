import moment from 'moment'
import {calulateTotalMonthlyPayments} from './calculations'
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const dataForMonth = (startMonth, currentYear, ip, mmip, totalExtraYearPayments, others, total, balance) => {
  return [
    `${months[startMonth || 0]}, ${currentYear}`,
    ip.toFixed(2),
    mmip.toFixed(2),
    totalExtraYearPayments,
    others,
    total,
    balance < 0 ? 0 : balance.toFixed(2),
  ]
}
const dataForYear = (currentYear, yearInterest, yearPrincipal, totalExtraYearPayments, others, yearTotal, balance) => {
  return [
    currentYear,
    yearInterest.toFixed(2),
    yearPrincipal.toFixed(2),
    totalExtraYearPayments,
    others,
    yearTotal,
    balance,
  ]
}

const calcMonthlyAndYearly = data => {
  let {
    mortgageAmount: balance,
    interest,
    loanTerm,
    startDate,
    monthlyPaymentRaw,
    oneTime,
    monthlyOrBiWeekly,
    quarterly,
    yearly,
  } = data

  interest /= 1200 // 12 months per year, monthly interest
  let term = loanTerm.months //* 12
  let n = 0 // variable to keep track each months

  const [monthlyPayment, pmiMonthly] = calulateTotalMonthlyPayments(data, 'pmi')
  console.log(monthlyPayment, pmiMonthly)
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

  let totalExtraYearPayments = 0
  let totalExtraMonthPayments = 0

  let yearInterest = 0
  let yearPrincipal = 0
  let yearTotal = 0
  let yearOthers = 0

  let monthTotal = 0
  let monthOthers = 0

  let previousMonthBalance = 0
  let previousYearPrincipal = 0

  const tableData = {
    all: [],
    year: [],
  }
  // yPayment = 100

  while (startMonth < 12 && term > 0) {
    let ip = balance * interest // interest based on balance
    let mmip = monthlyPaymentRaw - ip // principal that goes to balance
    let pincipalWithoutExtraPayment = mmip

    // check if one of extra payments is due
    // extra payments to mmip
    if (oneTimeStartDate === n && oPayment) {
      mmip = mmip + oPayment
      totalExtraYearPayments += oPayment
      totalExtraMonthPayments += oPayment
    }

    if (biWeeklyStartDate <= n && bPayment) {
      mmip = mmip + bPayment

      totalExtraYearPayments += totalExtraYearPayments >= balance ? 0 : bPayment
      totalExtraMonthPayments += bPayment
    }

    if (quarterlyStartDate <= n && n % 3 === 0 && qPayment) {
      mmip = mmip + qPayment
      totalExtraYearPayments += totalExtraYearPayments >= balance ? 0 : qPayment
      totalExtraMonthPayments += qPayment
    }

    if (yearlyStartDate <= n && n % 12 === 0 && yPayment) {
      mmip = mmip + yPayment
      totalExtraYearPayments += totalExtraYearPayments >= balance ? 0 : yPayment
      totalExtraMonthPayments += yPayment
    }

    let othersFess = n < 44 ? monthlyPayment : monthlyPayment - pmiMonthly // hoe, insurance, property tax

    // update yearly data
    yearInterest += ip
    yearPrincipal += pincipalWithoutExtraPayment
    yearOthers += othersFess
    yearTotal = yearInterest + yearPrincipal + yearOthers + totalExtraYearPayments // overall total fees

    monthOthers = othersFess
    monthTotal = monthOthers + mmip + ip

    // save previous balance
    previousMonthBalance = balance
    // update the balance - principal + extra
    balance = balance - mmip

    previousYearPrincipal = balance <= 0 && pincipalWithoutExtraPayment
    // recheck for month if balance is less than the pincipal + extra payment
    if (pincipalWithoutExtraPayment >= previousMonthBalance + totalExtraMonthPayments) {
      pincipalWithoutExtraPayment = previousMonthBalance
      totalExtraMonthPayments = 0
      monthTotal = othersFess + previousMonthBalance + ip
    }

    // Save monthly data
    tableData.all.push(
      dataForMonth(
        startMonth,
        currentYear,
        ip,
        pincipalWithoutExtraPayment,
        totalExtraMonthPayments,
        monthOthers,
        monthTotal,
        balance,
      ),
    )

    startMonth += 1
    term -= 1
    n += 1

    // Save yearly and reset variables
    if (startMonth === 12 || balance <= 0) {
      if (balance <= 0) {
        tableData.year.push(
          dataForYear(
            currentYear,
            yearInterest,
            yearPrincipal - previousYearPrincipal + previousMonthBalance,
            totalExtraYearPayments,
            yearOthers,
            yearTotal - previousYearPrincipal + previousMonthBalance,
            balance <= 0 ? 0 : balance,
          ),
        )
      } else {
        tableData.year.push(
          dataForYear(
            currentYear,
            yearInterest,
            yearPrincipal,
            totalExtraYearPayments,
            yearOthers,
            yearTotal,
            balance <= 0 ? 0 : balance,
          ),
        )
      }

      yearInterest = 0
      yearTotal = 0
      yearPrincipal = 0
      totalExtraYearPayments = 0
      previousYearPrincipal = 0
      yearOthers = 0
      startMonth = 0
      currentYear += 1
    }

    if (balance <= 0) {
      break
    }

    // reset month variables
    totalExtraMonthPayments = 0
    monthOthers = 0
  }

  return {
    data: tableData,
  }
}

export default calcMonthlyAndYearly
