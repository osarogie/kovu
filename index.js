/**
 * @format
 */

require('react-native').unstable_enableLogBox()
import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import codePush from 'react-native-code-push'

AppRegistry.registerComponent(appName, () => App)
