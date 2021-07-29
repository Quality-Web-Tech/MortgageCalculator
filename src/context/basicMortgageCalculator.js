import React, {createContext, useReducer, useContext} from 'react'

const BasicMortgageCalculator = createContext()

const basicMortgageCalculatorForm = {
  mortgageAmount: '100000',
  loanTerm: 30,
  interest: '5.00',
  startDate: new Date(),
}

function BasicMortgageCalculatorProvider(props) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'UPDATE_BASIC_FORM': {
          return {...state, basic: action.data}
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

const updateBasicForm = (data, dispatch) => dispatch({type: 'UPDATE_BASIC_FORM', data})

export {BasicMortgageCalculatorProvider, useBasicMortgageCalculator, updateBasicForm}
