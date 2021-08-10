const calulateTotalMonthlyPayments = (data, key) => {
  let {paymentFrequency, propertyTax, homeInsurance, pmi, hoaFees} = data

  propertyTax = paymentFrequency === 'Monthly' ? propertyTax.amount / 12 : propertyTax.amount / 12 / 2
  homeInsurance = paymentFrequency === 'Monthly' ? homeInsurance.amount / 12 : homeInsurance.amount / 12 / 2
  let pmiMonthly = paymentFrequency === 'Monthly' ? pmi.amount / 12 : pmi.amount / 12 / 2
  hoaFees = paymentFrequency === 'Monthly' ? hoaFees : hoaFees / 2

  const total = propertyTax + homeInsurance + pmiMonthly + hoaFees

  if (key === 'pmi') {
    return [total, pmiMonthly]
  }

  return propertyTax + homeInsurance + pmiMonthly + hoaFees
}

export {calulateTotalMonthlyPayments}
