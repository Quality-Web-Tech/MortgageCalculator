import React, {createContext, useReducer, useContext} from 'react'
import isValidNumber from '../utils/isValidNumber'
const BasicMortgageCalculator = createContext()

const basicMortgageCalculatorForm = {
  mortgageAmount: '100000',
  loanTerm: 30,
  interest: '5.00',
  startDate: new Date(),
  error: {
    mortgageAmount: false,
    interest: false,
  },
}

function BasicMortgageCalculatorProvider(props) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'UPDATE_BASIC_FORM': {
          if (action.field === 'startDate' || action.field === 'loanTerm')
            return {...state, basic: {...state.basic, [action.field]: action.data}}

          if (!isValidNumber(action.data))
            return {
              ...state,
              basic: {...state.basic, [action.field]: action.data, error: {...state.basic.error, [action.field]: true}},
            }

          return {
            ...state,
            basic: {...state.basic, [action.field]: action.data, error: {...state.basic.error, [action.field]: false}},
          }
        }

        default: {
          throw new Error(`Unhandled action type: ${action.type}`)
        }
      }
    },
    {basic: basicMortgageCalculatorForm},
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
