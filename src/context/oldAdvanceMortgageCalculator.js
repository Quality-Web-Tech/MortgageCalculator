// (state, action) => {
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

//       const monthlyPaymentRaw = preCalculateMonthlyPaymentRaw({
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
// },
