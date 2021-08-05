import React, {createContext, useReducer, useContext} from 'react'

const AdvanceMortgageCalculator = createContext()

const preCalculateMonthlyPaymentRaw = data => {
  let {mortgageAmount: p, interest: r, loanTerm: n} = data
  return (p * r) / (1 - Math.pow(1 + r, n * -1))
}

export const FORM_INITIAL_STATE = {
  homeValue: '300000',
  downPayment: {
    true: '15.00',
    false: '45000',
    value: '15.00',
    percent: true,
  },
  mortgageAmount: '255000',
  loanTerm: {
    true: '360',
    false: '30',
    value: '30',
    year: false,
  },
  interest: '5.00',
  pmi: {
    true: '0.50',
    false: '1275',
    value: '0.50',
    percent: true,
  },
  propertyTax: {
    true: '1.00',
    false: '3000',
    value: '3000',
    percent: false,
  },
  homeInsurance: {
    true: '0.50',
    false: '1500',
    value: '1500',
    percent: false,
  },
  hoaFees: '0',
  paymentFrequency: 'Monthly',
  startDate: new Date(),
  oneTime: {
    payment: '0.00',
    startDate: new Date(),
  },
  monthlyOrBiWeekly: {
    payment: '0.00',
    startDate: new Date(),
  },
  quarterly: {
    payment: '0.00',
    startDate: new Date(),
  },
  yearly: {
    payment: '0.00',
    startDate: new Date(),
  },

  monthlyPaymentRaw: preCalculateMonthlyPaymentRaw({
    mortgageAmount: '100000',
    interest: '2.00',
    loanTerm: 30,
  }),
}

export const INITIAL_STATE = {
  homeValue: 300000,
  downPayment: 45000,
  mortgageAmount: 255000,
  loanTerm: {
    years: 30,
    months: 360,
  },
  interest: 5.0,
  pmi: 1275,
  propertyTax: 3000,
  homeInsurance: 1500,
  hoaFees: 0,
  paymentFrequency: 'Monthly',
  numberOfPayments: 360,
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

  monthlyPaymentRaw: preCalculateMonthlyPaymentRaw({mortgageAmount: 255000, interest: 5 / 100 / 12, loanTerm: 360}),
}

function AdvanceMortgageCalculatorProvider(props) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'UPDATE_ADVANCE_FORM': {
          let {
            homeValue,
            mortgageAmount,
            interest,
            loanTerm: lt,
            paymentFrequency,
            monthlyOrBiWeekly,
            propertyTax: pt,
            homeInsurance: hi,
            pmi,
            hoaFees,
            startDate,
            oneTime,
            quarterly,
            yearly,
          } = action.form

          mortgageAmount = Number(mortgageAmount)
          const interestForRaw = Number(interest / 100 / 12) // 12 months per year, monthly interest
          hoaFees = Number(hoaFees)

          const loanTerm = {
            years: Number(lt.year ? lt.true / 12 : lt.false),
            months: Number(lt.year ? lt.true : lt.false * 12),
          }

          propertyTax = pt.percent ? (pt.true / 100) * homeValue : pt.false
          homeInsurance = hi.percent ? (hi.true / 100) * homeValue : hi.false
          pmi = pmi.percent ? (pmi.true / 100) * mortgageAmount : pmi.false
          monthlyOrBiWeekly = {...monthlyOrBiWeekly, payment: Number(monthlyOrBiWeekly.payment)}

          const monthlyPaymentRaw = preCalculateMonthlyPaymentRaw({
            mortgageAmount,
            loanTerm: loanTerm.months,
            interest: interestForRaw,
          })

          return {
            advance: {
              homeValue,
              monthlyPaymentRaw,
              loanTerm,
              mortgageAmount,
              paymentFrequency,
              monthlyOrBiWeekly,
              propertyTax,
              homeInsurance,
              pmi,
              hoaFees,
              startDate,
              oneTime,
              quarterly,
              yearly,
              interest,
            },
          }
        }

        default: {
          throw new Error(`Unhandled action type: ${action.type}`)
        }
      }
    },
    {advance: INITIAL_STATE},
  )

  const value = [state, dispatch]

  return <AdvanceMortgageCalculator.Provider value={value} {...props} />
}

function useAdvanceMortgageCalculator() {
  const context = useContext(AdvanceMortgageCalculator)
  if (context === undefined) {
    throw new Error(`useAdvanceMortgageCalculator must be used within a AdvanceMortgageCalculator`)
  }
  return context
}

const updateAdvanceForm = (form, dispatch) => dispatch({type: 'UPDATE_ADVANCE_FORM', form})

export {AdvanceMortgageCalculatorProvider, useAdvanceMortgageCalculator, updateAdvanceForm}
