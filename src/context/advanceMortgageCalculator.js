import React, {createContext, useReducer, useContext} from 'react'
import advanceReducer from './advanceReducer'
import {INITIAL_STATE} from './advanceInitialState'

const AdvanceStateMortgageCalculator = createContext()
const AdvanceDispatchMortgageCalcualator = createContext()

function AdvanceMortgageCalculatorProvider({children}) {
  const [state, dispatch] = useReducer(advanceReducer, INITIAL_STATE)

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

const updateHomeValue = (homeValue, dispatch) => dispatch({type: 'UPDATE_HOMEVALUE', homeValue})
const updateDownPayment = (downPayment, dispatch) => dispatch({type: 'UPDATE_DOWNPAYMENT', downPayment})
const updateMortgageAmount = (mortgageAmount, dispatch) => dispatch({type: 'UPDATE_MORTGAGEAMOUNT', mortgageAmount})
const updateLoanTerm = (loanTerm, dispatch) => dispatch({type: 'UPDATE_LOANTERM', loanTerm})
const updateInterest = (interest, dispatch) => dispatch({type: 'UPDATE_INTEREST', interest})
const updatePMI = (pmi, dispatch) => dispatch({type: 'UPDATE_PMI', pmi})
const updatePropertyTax = (propertyTax, dispatch) => dispatch({type: 'UPDATE_PROPERTYTAX', propertyTax})
const updateHomeInsurance = (homeInsurance, dispatch) => dispatch({type: 'UPDATE_HOMEINSURANCE', homeInsurance})
const updateHoaFees = (hoa, dispatch) => dispatch({type: 'UPDATE_HOA', hoa})
const updatePaymentFrequency = (paymentFrequency, dispatch) =>
  dispatch({type: 'UPDATE_PAYMENTFREQUENCY', paymentFrequency})
const updateStartDate = (startDate, dispatch) => dispatch({type: 'UPDATE_STARTDATE', startDate})
const updateOneTimePayment = (oneTime, dispatch) => dispatch({type: 'UPDATE_ONETIMEPAYMENT', oneTime})
const updateBiWeeklyOrMonthlyPayment = (monthlyOrBiWeekly, dispatch) =>
  dispatch({type: 'UPDATE_BIWEEKLYORMONTHLY', monthlyOrBiWeekly})
const updateQuarterlyPayment = (quarterly, dispatch) => dispatch({type: 'UPDATE_QUARTERLYPAYMENT', quarterly})
const updateYearlyPayment = (yearly, dispatch) => dispatch({type: 'UPDATE_YEARLYPAYMENT', yearly})

export {
  AdvanceMortgageCalculatorProvider,
  useAdvanceStateMortgageCalculator,
  useAdvanceDispatchMortgageCalculator,
  updateHomeValue,
  updateDownPayment,
  updateMortgageAmount,
  updateLoanTerm,
  updateInterest,
  updatePMI,
  updatePropertyTax,
  updateHomeInsurance,
  updateHoaFees,
  updatePaymentFrequency,
  updateStartDate,
  updateOneTimePayment,
  updateBiWeeklyOrMonthlyPayment,
  updateQuarterlyPayment,
  updateYearlyPayment,
}
