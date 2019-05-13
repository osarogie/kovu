import React from 'react'
import {
  TabBarBottom,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation'
import { Platform } from 'react-native'
import {
  FeedScreen,
  DiscussionScreen,
  ProfileScreen,
  DiscoverScreen,
  NotificationScreen,
  LoginScreen,
  MenuScreen,
  CultureScreen,
  ContributionsScreen,
  StartCultureScreen,
  EditProfileScreen,
  ChangePasswordScreen
} from './screens'
import { PURPLE } from './ui'
import ProfilePictureScreen from './screens/ProfilePictureScreen'
import WriteScreen from './screens/WriteScreen'
// import { Examples } from '@shoutem/ui'

// import { BottomNavigation } from 'react-native-paper'

// export default class Tabs extends React.Component {
//   state = {
//     index: 0,
//     routes: [
//       { key: 'home', title: 'Home', icon: 'featured-play-list' },
//       { key: 'discover', title: 'Discover', icon: 'search' },
//       { key: 'menu', title: 'Menu', icon: 'menu' }
//     ]
//   }

//   _handleIndexChange = index => this.setState({ index })

//   _renderScene = BottomNavigation.SceneMap({
//     home: FeedScreen,
//     discover: SearchScreen,
//     menu: MenuScreen
//   })

//   render() {
//     return (
//       <BottomNavigation
//         navigationState={this.state}
//         onIndexChange={this._handleIndexChange}
//         renderScene={this._renderScene}
//       />
//     )
//   }
// }

export const Tab = createBottomTabNavigator(
  {
    Home: {
      screen: FeedScreen
    },
    Discover: {
      screen: DiscoverScreen
    },

    Notifications: {
      screen: NotificationScreen
    },
    Menu: {
      screen: MenuScreen
    }
  },
  {
    tabBarOptions: {
      inactiveTintColor: '#27f',
      activeTintColor: '#05f',
      style: {
        backgroundColor: '#fff',
        // elevation: 15,
        borderTopWidth: 0
        // borderTopColor: '#ddd',
        // borderBottomWidth: 0
      },
      tabBarShadowStyle: {
        height: 7
      },
      showIcon: true,
      showLabel: false
    },
    swipeEnabled: false,
    // lazy: true
    tabBarPosition: 'bottom',
    tabBarComponent: TabBarBottom
  }
)

export const Root = createAppContainer(
  createStackNavigator(
    {
      // Examples: { screen: Examples },
      Tab: { screen: Tab },
      Write: { screen: WriteScreen },
      Login: { screen: LoginScreen },
      Profile: { screen: ProfileScreen },
      ProfilePicture: { screen: ProfilePictureScreen },
      Discussion: { screen: DiscussionScreen },
      Notifications: { screen: NotificationScreen },
      Culture: { screen: CultureScreen },
      Comments: { screen: ContributionsScreen },
      StartCulture: { screen: StartCultureScreen },
      EditProfile: { screen: EditProfileScreen },
      ChangePassword: { screen: ChangePasswordScreen }
    },
    {
      mode: Platform.select({ android: 'modal', default: null }),
      headerMode: 'none'
    }
  )
)
