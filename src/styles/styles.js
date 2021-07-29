import variables from './variables'
import flex from './flex'
import spacing from './spacing'
import colors from './colors'
import fontFamily from './fontFamily'
import themeColors from './themes'

export default {
  ...flex,
  ...spacing,

  statusBar: {
    zIndex: 1,
    backgroundColor: themeColors.heading,
    height: 47,
    position: 'absolute',
    width: '100%',
  },

  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  headerTitle: {
    fontFamily: fontFamily.MONTSERRAT_BOLD,
    color: colors.white,
    fontSize: variables.fontSizeMedium,
    marginLeft: 16,
  },
}
