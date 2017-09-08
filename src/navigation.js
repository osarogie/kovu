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
      inactiveTintColor: '#888',
      activeTintColor: '#000',
      // labelStyle: {
      //   // fontSize: 15,
      //   // color: '#000'
      // },
      style: {
        backgroundColor: '#fff',
        // paddingBottom: 6,
        // height: 56,
        // elevation: 10
        borderWidth: 0
        // borderBottomRightRadius: 10,
        // borderBottomLeftRadius: 10
      },
      // tabBarShadowStyle: {
      //   height: 3
      // },
      // position: 1,
      // activeBackgroundColor: '#f2f2f2',
      showLabel: false
    },
    // swipeEnabled: false,
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
    Tab: { screen: Tab },
    Write: { screen: WriteScreen },
    Login: { screen: LoginScreen },
    Profile: { screen: ProfileScreen },
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
