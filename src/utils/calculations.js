const calulateTotalMonthlyPayments = (data, key) => {
  let {paymentFrequency, mortgageAmount, propertyTax, homeInsurance, pmi, hoaFees} = data

  pmi = typeof pmi === 'object' ? pmi.true : pmi
  propertyTax = paymentFrequency === 'Monthly' ? propertyTax / 12 : propertyTax / 12 / 2
  homeInsurance = paymentFrequency === 'Monthly' ? homeInsurance / 12 : homeInsurance / 12 / 2
  let pmiMonthly =
    paymentFrequency === 'Monthly' ? (mortgageAmount * pmi) / 100 / 12 : (mortgageAmount * pmi) / 100 / 12 / 2
  hoaFees = paymentFrequency === 'Monthly' ? hoaFees : hoaFees / 2

  const total = propertyTax + homeInsurance + pmiMonthly + hoaFees

  if (key === 'pmi') {
    return [total, pmiMonthly]
  }

  return propertyTax + homeInsurance + pmiMonthly + hoaFees
}

export {calulateTotalMonthlyPayments}
