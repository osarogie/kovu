import { TabBarBottom, createBottomTabNavigator } from 'react-navigation'

import FeedScreen from '../screens/FeedScreen'
import DiscoverScreen from '../screens/DiscoverScreen'
import NotificationScreen from '../screens/NotificationScreen'
import MenuScreen from '../screens/MenuScreen'

export const HomeNavigator = createBottomTabNavigator(
  {
    Home: FeedScreen,
    Discover: DiscoverScreen,
    Notifications: NotificationScreen,
    Menu: MenuScreen
  },
  {
    tabBarOptions: {
      inactiveTintColor: '#555',
      activeTintColor: '#50f',
      style: {
        backgroundColor: '#fff',
        elevation: 15,
        borderTopWidth: 1,
        borderTopColor: '#50f3'
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
