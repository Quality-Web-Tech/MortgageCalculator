import React, {createContext, useReducer, useContext} from 'react'

const AdvanceMortgageCalculator = createContext()

const preCalculateMonthlyPaymentRaw = data => {
  const copiedData = {...data}
  let {mortgageAmount, interest, loanTerm} = copiedData

  const p = Number(mortgageAmount)
  const r = Number(interest) / 100 / 12 // 12 months per year, monthly interest
  const n = loanTerm * 12 // months to be paid

  return (p * r) / (1 - Math.pow(1 + r, n * -1))
}

const newStateWithMonthlyPaymentRaw = (state, action) => {
  const newState = {
    ...state,
    basic: {...state.basic, [action.field]: action.data},
  }

  const monthlyPaymentRaw = preCalculateMonthlyPaymentRaw(newState.basic)

  return {...newState, basic: {...newState.basic, monthlyPaymentRaw}}
}

export const INITIAL_STATE = {
  homeValue: '300000',
  downPayment: '15.00',
  mortgageAmount: '255000',
  loanTerm: 30,
  interest: '5.00',
  pmi: '0.50',
  propertTax: '3000',
  homeInsurance: '1500',
  hoaFess: '0.00',
  paymentFrequency: 'monthly',
  startDate: new Date(),
  extraPayment: {
    oneTime: {
      payment: '0.00',
      startDate: new Date(),
    },
    monthlyOrBiWeekly: {
      payment: '0.00',
      startDate: new Date(),
    },
    quarterky: {
      payment: '0.00',
      startDate: new Date(),
    },
    yearly: {
      payment: '0.00',
      startDate: new Date(),
    },
  },
  monthlyPaymentRaw: preCalculateMonthlyPaymentRaw({
    mortgageAmount: '100000',
    interest: '2.00',
    loanTerm: 30,
  }),
}

function AdvanceMortgageCalculatorProvider(props) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'UPDATE_ADVANCE_FORM': {
          if (action.field === 'startDate' || action.field === 'loanTerm') {
            return newStateWithMonthlyPaymentRaw(state, action)
          }

          action.data = action.data.replace(/\,/g, '') // remove all comma
          return newStateWithMonthlyPaymentRaw(state, action)
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
    throw new Error(`useBasicMortgageCalculator must be used within a BasicMortgageCalculator`)
  }
  return context
}

const updateAdvanceForm = (field, data, dispatch) => dispatch({type: 'UPDATE_ADVANCE_FORM', field, data})

export {AdvanceMortgageCalculatorProvider, useAdvanceMortgageCalculator, updateAdvanceForm}
