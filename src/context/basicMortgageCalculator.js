import React, {createContext, useReducer, useContext} from 'react'

const BasicMortgageCalculator = createContext()

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
  mortgageAmount: '100000',
  loanTerm: 30,
  interest: '2.00',
  startDate: new Date(),
  monthlyPaymentRaw: preCalculateMonthlyPaymentRaw({
    mortgageAmount: '100000',
    interest: '2.00',
    loanTerm: 30,
  }),
}

function BasicMortgageCalculatorProvider(props) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'UPDATE_BASIC_FORM': {
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
    {basic: INITIAL_STATE},
  )

  const value = [state, dispatch]

  return <BasicMortgageCalculator.Provider value={value} {...props} />
}

function useBasicMortgageCalculator() {
  const context = useContext(BasicMortgageCalculator)
  if (context === undefined) {
    throw new Error(`useBasicMortgageCalculator must be used within a BasicMortgageCalculator`)
  }
  return context
}

const updateBasicForm = (field, data, dispatch) => dispatch({type: 'UPDATE_BASIC_FORM', field, data})

export {BasicMortgageCalculatorProvider, useBasicMortgageCalculator, updateBasicForm}
