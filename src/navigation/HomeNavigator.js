import React, { useMemo } from 'react'
import FeedScreen from '../screens/FeedScreen'
import DiscoverScreen from '../screens/DiscoverScreen'
import NotificationScreen from '../screens/NotificationScreen'
import MenuScreen from '../screens/MenuScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Feather from 'react-native-vector-icons/Feather'
import { useTheme } from 'react-native-paper'

const Tab = createBottomTabNavigator()

const icons = {
  Home: ['home'],
  Discover: ['search'],
  Notifications: ['bell'],
  Menu: ['user'],
}

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let routeIcons = icons[route.name]
    let iconName = focused ? routeIcons[1] || routeIcons[0] : routeIcons[0]

    return <Feather name={iconName} size={size} color={color} />
  },
})

export function HomeNavigator() {
  const { colors } = useTheme()
  const tabBarOptions = useMemo(
    () => ({
      inactiveTintColor: colors.separator,
      activeTintColor: colors.text,
      style: {
        backgroundColor: colors.background,
        elevation: 15,
        borderTopWidth: 1,
        borderTopColor: colors.separator,
        // borderBottomWidth: 0
      },
      tabBarShadowStyle: {
        height: 7,
      },
      showIcon: true,
      showLabel: false,
    }),
    [colors],
  )
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={tabBarOptions}
      initialRouteName="Home">
      <Tab.Screen name="Home" component={FeedScreen} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      {/* <Tab.Screen name="Notifications" component={NotificationScreen} /> */}
      <Tab.Screen name="Menu" component={MenuScreen} />
    </Tab.Navigator>
  )
}

// export const HomeNavigator = createBottomTabNavigator(
//   {
//     Home: FeedScreen,
//     Discover: DiscoverScreen,
//     Notifications: NotificationScreen,
//     Menu: MenuScreen
//   },
//   {
//     tabBarOptions: {
//       inactiveTintColor: '#555',
//       activeTintColor: '#50f',
//       style: {
//         backgroundColor: '#fff',
//         elevation: 15,
//         borderTopWidth: 1,
//         borderTopColor: '#50f3'
//         // borderBottomWidth: 0
//       },
//       tabBarShadowStyle: {
//         height: 7
//       },
//       showIcon: true,
//       showLabel: false
//     },
//     swipeEnabled: false,
//     // lazy: true
//     tabBarPosition: 'bottom',
//     tabBarComponent: TabBarBottom
//   }
// )
