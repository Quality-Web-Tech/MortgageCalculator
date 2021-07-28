// import variables from './variables'
import flex from './flex'
import spacing from './spacing'
import colors from './colors'
// import fontFamily from './fontFamily'
// import themeColors from './themes'

export default {
  ...flex,
  ...spacing,

  statusBar: {
    zIndex: 1,
    backgroundColor: colors.gray600,
    height: 47,
    position: 'absolute',
    width: '100%',
  },
}
