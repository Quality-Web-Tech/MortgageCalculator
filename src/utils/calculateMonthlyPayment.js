const calculateMonthlyPayment = (frequency, p, r, n) => {
  r = r / 100 / 12
  const amount = (p * r) / (1 - Math.pow(1 + r, n * -1))

  return frequency === 'Monthly' ? {type: frequency, amount} : {type: frequency, amount: amount / 2}
}

export {calculateMonthlyPayment}
