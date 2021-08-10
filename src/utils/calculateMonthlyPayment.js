const calculateMonthlyPaymentRaw = data => {
  let {mortgageAmount: p, interest: r, loanTerm: n} = data
  r = r / 100 / 12
  return (p * r) / (1 - Math.pow(1 + r, n * -1))
}

export {calculateMonthlyPaymentRaw}
