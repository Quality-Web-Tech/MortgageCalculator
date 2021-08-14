import {unformat} from '../utils/formatter'

export default (state, action) => {
  switch (action.type) {
    case 'UPDATE_HOMEVALUE': {
      let {homeValue, downPayment, mortgageAmount} = action.homeValue

      return {
        ...state,
        homeValue: unformat(homeValue),
        downPayment,
        mortgageAmount,
      }
    }

    case 'UPDATE_DOWNPAYMENT': {
      let {
        mortgageAmount,
        downPayment: {amount, percent},
      } = action.downPayment

      return {
        ...state,
        downPayment: {
          percent: unformat(percent),
          amount: unformat(amount),
        },
        mortgageAmount,
      }
    }

    case 'UPDATE_MORTGAGEAMOUNT': {
      let {
        mortgageAmount,
        downPayment: {amount, percent},
      } = action.mortgageAmount

      return {
        ...state,
        downPayment: {
          percent: Number(percent),
          amount: Number(amount),
        },
        mortgageAmount,
      }
    }

    case 'UPDATE_LOANTERM': {
      let {
        loanTerm: {months, years},
      } = action.loanTerm

      return {
        ...state,
        loanTerm: {
          months: Number(months),
          years: Math.floor(years),
        },
      }
    }

    case 'UPDATE_INTEREST': {
      return {
        ...state,
        interest: Number(action.interest),
      }
    }

    case 'UPDATE_PMI': {
      const {
        pmi: {amount, percent},
      } = action.pmi

      return {
        ...state,
        pmi: {
          amount: Number(amount),
          percent: Number(percent),
        },
      }
    }

    case 'UPDATE_PROPERTYTAX': {
      const {
        propertyTax: {amount, percent},
      } = action.propertyTax

      return {
        ...state,
        propertyTax: {
          amount: Number(amount),
          percent: Number(percent),
        },
      }
    }

    case 'UPDATE_HOMEINSURANCE': {
      const {
        homeInsurance: {amount, percent},
      } = action.homeInsurance

      return {
        ...state,
        homeInsurance: {
          amount: Number(amount),
          percent: Number(percent),
        },
      }
    }

    case 'UPDATE_HOA': {
      return {
        ...state,
        hoaFees: Number(action.hoa),
      }
    }

    case 'UPDATE_PAYMENTFREQUENCY': {
      const {paymentFrequency} = action
      return {
        ...state,
        paymentFrequency,
      }
    }

    case 'UPDATE_STARTDATE': {
      return {
        ...state,
        startDate: action.startDate,
      }
    }

    case 'UPDATE_ONETIMEPAYMENT': {
      const {
        oneTime: {startDate, payment},
      } = action.oneTime

      return {
        ...state,
        oneTime: {
          startDate,
          payment: Number(payment),
        },
      }
    }

    case 'UPDATE_BIWEEKLYORMONTHLY': {
      const {
        monthlyOrBiWeekly: {startDate, payment},
      } = action.monthlyOrBiWeekly

      return {
        ...state,
        monthlyOrBiWeekly: {
          startDate,
          payment: Number(payment),
        },
      }
    }

    case 'UPDATE_QUARTERLYPAYMENT': {
      const {
        quarterly: {startDate, payment},
      } = action.quarterly

      return {
        ...state,
        quarterly: {
          startDate,
          payment: Number(payment),
        },
      }
    }

    case 'UPDATE_YEARLYPAYMENT': {
      const {
        yearly: {startDate, payment},
      } = action.yearly

      return {
        ...state,
        yearly: {
          startDate,
          payment: Number(payment),
        },
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
