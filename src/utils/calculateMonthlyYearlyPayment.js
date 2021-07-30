const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const calcMonthlyAndYearly = data => {
  const copyData = {...data}

  let {mortgageAmount: principal, interest, loanTerm, startDate, monthlyPayment} = copyData

  let balance = Number(principal)
  interest = Number(interest) / 1200 //monthly interest
  let startMonth = startDate.getMonth()
  let currentYear = startDate.getFullYear()
  let term = loanTerm * 12

  let yearInterest = 0
  let yearPrincipal = 0
  let yearTotal = 0

  const calculatedData = {
    month: [],
    year: [],
  }

  while (startMonth < 12 && term > 0) {
    let ip = balance * interest
    let mmip = monthlyPayment - ip
    balance = balance - mmip

    // accumulate yearly
    yearInterest += ip
    yearPrincipal += mmip
    yearTotal += ip + mmip

    // accumulate monthly
    calculatedData.month.push({
      label: `${months[startMonth]}/${currentYear}`,
      interest: ip.toFixed(2),
      principal: mmip.toFixed(2),
      total: (ip + mmip).toFixed(2),
      balance: balance < 0 ? 0 : balance.toFixed(2),
    })

    startMonth += 1
    term -= 1

    // Save data before exiting
    if (term === 0) {
      calculatedData.year.push({
        label: currentYear.toString(),
        interest: yearInterest.toFixed(2),
        principal: yearPrincipal.toFixed(2),
        total: yearTotal.toFixed(2),
        balance: balance < 0 ? 0 : balance.toFixed(2),
      })
    }

    // Save monthly and yearly and reset variables
    if (startMonth === 12) {
      calculatedData.year.push({
        label: currentYear.toString(),
        interest: yearInterest.toFixed(2),
        principal: yearPrincipal.toFixed(2),
        total: yearTotal.toFixed(2),
        balance: balance.toFixed(2),
      })
      yearInterest = 0
      yearTotal = 0
      yearPrincipal = 0
      startMonth = 0
      currentYear += 1
    }
  }

  return {
    ...data,
    ...calculatedData,
  }
}

export default calcMonthlyAndYearly
