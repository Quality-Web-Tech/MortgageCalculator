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
const dataForYear = (currentYear, yearInterest, yearPrincipal, yearTotal, balance) => {
  return {
    label: currentYear.toString(),
    interest: yearInterest.toFixed(2),
    principal: yearPrincipal.toFixed(2),
    total: yearTotal.toFixed(2),
    balance: balance < 0 ? 0 : balance.toFixed(2),
  }
}

const calcMonthlyAndYearly = data => {
  const copyData = {...data}
  let {mortgageAmount: principal, interest, loanTerm, startDate, monthlyPaymentRaw} = copyData

  let balance = Number(principal)
  interest /= 1200 // 12 months per year, monthly interest
  let term = loanTerm * 12

  let startMonth = startDate.getMonth()
  let currentYear = startDate.getFullYear()

  let yearInterest = 0
  let yearPrincipal = 0
  let yearTotal = 0

  const tableData = {
    month: [],
    year: [],
  }

  while (startMonth < 12 && term > 0) {
    let ip = balance * interest
    let mmip = monthlyPaymentRaw - ip
    balance = balance - mmip

    // accumulate yearly
    yearInterest += ip
    yearPrincipal += mmip
    yearTotal += ip + mmip

    // accumulate monthly
    tableData.month.push(dataForMonth(startMonth, currentYear, ip, mmip, balance))

    startMonth += 1
    term -= 1

    // Save data before exiting
    if (term === 0) {
      tableData.year.push(dataForYear(currentYear, yearInterest, yearPrincipal, yearTotal, balance))
    }

    // Save monthly and yearly and reset variables
    if (startMonth === 12) {
      tableData.year.push(dataForYear(currentYear, yearInterest, yearPrincipal, yearTotal, balance))

      yearInterest = 0
      yearTotal = 0
      yearPrincipal = 0
      startMonth = 0
      currentYear += 1
    }
  }

  return {
    tableData: tableData,
  }
}

export default calcMonthlyAndYearly
