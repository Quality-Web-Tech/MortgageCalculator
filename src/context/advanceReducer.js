import {unformat} from '../utils/formatter'
import {calculateMonthlyPaymentRaw} from '../utils/calculateMonthlyPayment'

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

      console.log(amount, percent)
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
      return {
        ...state,
        paymentFrequency: action.paymentFrequency,
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

/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
// import {unformat} from '../utils/formatter'
// import {calculateMonthlyPaymentRaw} from '../utils/calculateMonthlyPayment'

// export default (state, action) => {
//   switch (action.type) {
//     case 'UPDATE_ADVANCE_FORM': {
//       let {
//         mortgageAmount: mg,
//         loanTerm,
//         interest,
//         pmi,
//         monthlyOrBiWeekly: mob,
//         oneTime: ot,
//         quarterly: qt,
//         yearly: yl,
//         hoaFees,
//       } = action.form

//       const interestForRaw = interest / 100 / 12 // 12 months per year, monthly interest

//       const {formatted: mortgageAmount} = unformat(mg)
//       const {formatted: mobPayment} = unformat(mob.payment)
//       const {formatted: otPayment} = unformat(ot.payment)
//       const {formatted: qtPayment} = unformat(qt.payment)
//       const {formatted: ylPayment} = unformat(yl.payment)
//       const {formatted: hFees} = unformat(hoaFees)

//       const monthlyPaymentRaw = calculateMonthlyPaymentRaw({
//         mortgageAmount,
//         loanTerm: loanTerm.months,
//         interest: interestForRaw,
//       })

//       return {
//         ...state,
//         advance: {
//           ...action.form,
//           hoaFees: hFees,
//           oneTime: {
//             ...ot,
//             payment: otPayment,
//           },
//           monthlyOrBiWeekly: {
//             ...mob,
//             payment: mobPayment,
//           },
//           quarterly: {
//             ...qt,
//             payment: qtPayment,
//           },
//           yearly: {
//             ...yl,
//             payment: ylPayment,
//           },
//           monthlyPaymentRaw,
//           pmi: pmi.true,
//         },
//       }
//     }

//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`)
//     }
//   }
// }
