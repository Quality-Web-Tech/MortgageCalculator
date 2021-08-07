import React, {createContext, useReducer, useContext} from 'react'

const AdvanceMortgageCalculator = createContext()

const preCalculateMonthlyPaymentRaw = data => {
  let {mortgageAmount: p, interest: r, loanTerm: n} = data
  return (p * r) / (1 - Math.pow(1 + r, n * -1))
}

export const NEW_FORM_INITIAL_STATE = {
  homeValue: 300000,
  downPayment: 45000,
  mortgageAmount: 255000,
  loanTerm: {
    months: 360,
    years: 30,
  },
  interest: 5,
  pmi: {
    true: 0.5,
    false: 1275,
    isPercent: true,
    value: 0.5,
  },
  propertyTax: 3000,
  homeInsurance: 1500,
  hoaFees: 0,
  paymentFrequency: 'Monthly',
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
  monthlyPaymentRaw: preCalculateMonthlyPaymentRaw({
    mortgageAmount: 255000,
    interest: 5 / 100 / 12, // 5%
    loanTerm: 360,
  }),
}

function AdvanceMortgageCalculatorProvider(props) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'UPDATE_ADVANCE_FORM': {
          let {mortgageAmount, loanTerm, interest, pmi} = action.form

          const interestForRaw = interest / 100 / 12 // 12 months per year, monthly interest
          const monthlyPaymentRaw = preCalculateMonthlyPaymentRaw({
            mortgageAmount,
            loanTerm: loanTerm.months,
            interest: interestForRaw,
          })

          return {
            ...state,
            advance: {
              ...action.form,
              monthlyPaymentRaw,
              pmi: pmi.true,
            },
          }
        }

        default: {
          throw new Error(`Unhandled action type: ${action.type}`)
        }
      }
    },
    {advance: NEW_FORM_INITIAL_STATE},
  )

  const value = [state, dispatch] // this Re-renders

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
