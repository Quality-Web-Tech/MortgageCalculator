import React, {createContext, useReducer, useContext} from 'react'
import advanceReducer from './advanceReducer'
import NEW_FORM_INITIAL_STATE from './advanceInitialState'

const AdvanceStateMortgageCalculator = createContext()
const AdvanceDispatchMortgageCalcualator = createContext()

function AdvanceMortgageCalculatorProvider({children}) {
  const [state, dispatch] = useReducer(advanceReducer, NEW_FORM_INITIAL_STATE)

  return (
    <AdvanceStateMortgageCalculator.Provider value={state}>
      <AdvanceDispatchMortgageCalcualator.Provider value={dispatch}>
        {children}
      </AdvanceDispatchMortgageCalcualator.Provider>
    </AdvanceStateMortgageCalculator.Provider>
  )
}

function useAdvanceStateMortgageCalculator() {
  const context = useContext(AdvanceStateMortgageCalculator)
  if (context === undefined) {
    throw new Error(`useAdvanceStateMortgageCalculator must be used within a useAdvanceStateMortgageCalculator`)
  }
  return context
}

function useAdvanceDispatchMortgageCalculator() {
  const context = useContext(AdvanceDispatchMortgageCalcualator)
  if (context === undefined) {
    throw new Error(`useAdvanceDispatchMortgageCalculator must be used within a AdvanceDispatchMortgageCalcualator`)
  }
  return context
}

const updateAdvanceForm = (form, dispatch) => dispatch({type: 'UPDATE_ADVANCE_FORM', form})

export {
  AdvanceMortgageCalculatorProvider,
  useAdvanceStateMortgageCalculator,
  useAdvanceDispatchMortgageCalculator,
  updateAdvanceForm,
}
