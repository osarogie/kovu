import { Platform } from 'react-native'
import LoginScreen from '../screens/LoginScreen'

export const AuthNavigator = LoginScreen

// export const AuthNavigator = createSwitchNavigator(
//   {
//     Login: LoginScreen
//   },
//   {
//     mode: Platform.select({ android: 'modal', default: null }),
//     headerMode: 'none'
//   }
// )
