import {useFonts as expoFonts} from 'expo-font'

import {Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold} from '@expo-google-fonts/montserrat'

const useFonts = () => {
  return expoFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  })
}

export default useFonts
