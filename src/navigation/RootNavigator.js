import { createStackNavigator } from 'react-navigation'

import { Platform } from 'react-native'
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

export const RootNavigator = createStackNavigator(
  {
    Tab: HomeNavigator,
    Auth: AuthNavigator,
    Write: WriteScreen,
    Profile: ProfileScreen,
    ProfilePicture: ProfilePictureScreen,
    Discussion: DiscussionScreen,
    Notifications: NotificationScreen,
    Culture: CultureScreen,
    Comments: ContributionsScreen,
    StartCulture: StartCultureScreen,
    EditProfile: EditProfileScreen,
    ChangePassword: ChangePasswordScreen
  },
  {
    mode: Platform.select({ android: 'modal', default: null }),
    headerMode: 'none'
  }
)
