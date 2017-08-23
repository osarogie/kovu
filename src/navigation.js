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
  CollectionScreen,
  ContributionsScreen
  // SearchScreen,
  // UserCollectionsScreen
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
      // inactiveTintColor: '',
      activeTintColor: '#05f',
      // labelStyle: {
      //   // fontSize: 15,
      //   // color: '#000'
      // },
      style: {
        backgroundColor: '#fff',
        // paddingBottom: 6,
        // height: 56,
        elevation: 2
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
    lazy: false,
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
    Login: { screen: LoginScreen },
    Profile: { screen: ProfileScreen },
    Discussion: { screen: DiscussionScreen },
    Write: { screen: WriteScreen },
    Notifications: { screen: NotificationScreen },
    Collection: { screen: CollectionScreen },
    Comments: { screen: ContributionsScreen }
    // UserCollections: { screen: UserCollectionsScreen }
    // Search: { screen: SearchScreen }
  },
  { mode: 'modal', headerMode: 'none' }
)

// export const SearchScreen = TabNavigator(
//   {
//     Posts: {
//       screen: FeedScreen
//     },
//     Collections: {
//       screen: DiscoverScreen
//     },
//     People: {
//       screen: MenuScreen
//     }
//   },
//   {
//     tabBarOptions: {
//       // inactiveTintColor: '',
//       activeTintColor: '#05f',
//       // labelStyle: {
//       //   // fontSize: 15,
//       //   // color: '#000'
//       // },
//       style: {
//         backgroundColor: '#fff'
//         // paddingBottom: 6,
//         // height: 56
//         // borderBottomRightRadius: 10,
//         // borderBottomLeftRadius: 10
//       },
//       // activeBackgroundColor: '#f2f2f2',
//       showLabel: false
//     },
//     // swipeEnabled: false,
//     lazy: true,
//     tabBarPosition: 'top',
//     tabBarComponent: TabBarBottom
//     // indicatorStyle: {
//     //   height: 0,
//     //   color: '#000'
//     // }
//   }
// )
