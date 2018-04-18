import React from 'react'
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'

import {
  FeedScreen,
  DiscussionScreen,
  ProfileScreen,
  DiscoverScreen,
  NotificationScreen,
  LoginScreen,
  MenuScreen,
  WriteScreen,
  CultureScreen,
  ContributionsScreen,
  StartCultureScreen,
  EditProfileScreen,
  ChangePasswordScreen
} from './screens'
import SearchScreen from './screens/SearchScreen'
import { PURPLE } from './ui'
import ProfilePictureScreen from './screens/ProfilePictureScreen'
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

export const Tab = TabNavigator(
  {
    Home: {
      screen: FeedScreen
    },
    Discover: {
      screen: DiscoverScreen
    },
    // Notifications: {
    //   screen: NotificationScreen
    // },
    Menu: {
      screen: MenuScreen
    }
  },
  {
    tabBarOptions: {
      inactiveTintColor: '#fffc',
      activeTintColor: '#fff',
      // labelStyle: {
      //   fontSize: 13
      //   // color: '#000'
      // },
      style: {
        backgroundColor: PURPLE,
        // paddingBottom: 6,
        // height: 56,
        elevation: 10,
        borderTopWidth: 0,
        borderTopColor: '#ddd',
        borderBottomWidth: 0
        // borderBottomRightRadius: 10,
        // borderBottomLeftRadius: 10
      },
      tabBarShadowStyle: {
        height: 3
      },
      // position: 1,
      // activeBackgroundColor: '#f2f2f2',
      showIcon: true,
      showLabel: false
    },
    swipeEnabled: false,
    // lazy: true
    tabBarPosition: 'bottom',
    tabBarComponent: TabBarBottom
    // indicatorStyle: {
    //   height: 0,
    //   color: '#000'
    // }
  }
)

export const Root = StackNavigator(
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
  { mode: 'modal', headerMode: 'none' }
)
