import React from 'react'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import DiscussionScreen from '../screens/DiscussionScreen'
import ProfileScreen from '../screens/ProfileScreen'
import NotificationScreen from '../screens/NotificationScreen'
import CultureScreen from '../screens/CultureScreen'
import ContributionsScreen from '../screens/ContributionsScreen'
import StartCultureScreen from '../screens/StartCultureScreen'
import EditProfileScreen from '../screens/EditProfileScreen'
import ChangePasswordScreen from '../screens/ChangePasswordScreen'
import ProfilePictureScreen from '../screens/ProfilePictureScreen'
import WriteScreen from '../screens/WriteScreen'
import { HomeNavigator } from './HomeNavigator'
import { AuthNavigator } from './AuthNavigator'
import { useColorScheme, View } from 'react-native'
import { Linking } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useTheme } from 'react-native-paper'

const PERSISTENCE_KEY = 'NAVIGATION_STATE'
const Stack = createStackNavigator()
const themes = {
  dark: DarkTheme,
  light: DefaultTheme,
}

function persistState(state) {
  AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
}

export function RootNavigator() {
  const scheme = useColorScheme()
  const [isReady, setIsReady] = React.useState(__DEV__ ? false : true)
  const [initialState, setInitialState] = React.useState()

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL()

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY)
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined

          if (state !== undefined) {
            setInitialState(state)
          }
        }
      } finally {
        setIsReady(true)
      }
    }

    if (!isReady) {
      restoreState()
    }
  }, [isReady])

  if (!isReady) {
    return null
  }
  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={persistState}
      theme={themes[scheme] || DefaultTheme}>
      <Stack.Navigator initialRouteName="Tab" headerMode="none">
        <Stack.Screen name="Tab" component={HomeNavigator} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Write" component={WriteScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ProfilePicture" component={ProfilePictureScreen} />
        <Stack.Screen name="Discussion" component={DiscussionScreen} />
        <Stack.Screen name="Notifications" component={NotificationScreen} />
        <Stack.Screen name="Culture" component={CultureScreen} />
        <Stack.Screen name="Comments" component={ContributionsScreen} />
        <Stack.Screen name="StartCulture" component={StartCultureScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
