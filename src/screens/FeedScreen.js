import Feather from 'react-native-vector-icons/Feather'
import React from 'react'
import { TouchableHighlight, StyleSheet } from 'react-native'
import Feed from '../renderers/Feed'
import Avatar from '../components/Avatar'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcon from 'react-native-vector-icons/EvilIcons'

import getNavigation from '../helpers/getNavigation'
import { View } from '@shoutem/ui/components/View'
import { FAB, Title, useTheme } from 'react-native-paper'
import { useAppNavigation } from '../navigation/navigationHelper'
import { useViewer } from '../providers/ViewerProvider'
import { elevation } from '../styles/elevation'

function TopBar() {
  const { openWrite, openViewerProfile } = useAppNavigation()
  const { viewer } = useViewer()
  const { colors } = useTheme()

  function getPicture(user = {}) {
    if (
      user.profile_picture_name &&
      typeof user.profile_picture_name === 'string'
    ) {
      return user.profile_picture_name
    }
    if (user.profile_pic && typeof user.profile_pic === 'string') {
      return user.profile_pic.split('/').pop()
    }
    return null
  }

  function renderAvatar() {
    if (viewer) {
      return (
        <Avatar
          width={36}
          radius={15}
          source={{ profile_picture_name: getPicture(viewer) }}
          title={user.name}
          containerStyle={style.avatar}
          onPress={openViewerProfile}
          activeOpacity={0.7}
        />
      )
    }

    return (
      <TouchableHighlight
        onPress={openViewerProfile}
        underlayColor={colors.separator}
        style={styles.userIcon}>
        <EvilIcon name="user" size={35} color={colors.text} />
      </TouchableHighlight>
    )
  }

  return (
    <>
      <View style={styles.toolbar}>
        <Title style={styles.title}>Home</Title>
        <View style={{ flex: 1 }} />
        <View style={styles.avatarWrap}>{renderAvatar()}</View>
      </View>
      <FAB
        style={styles.fab}
        onPress={openWrite}
        icon={props => <Feather name="edit-3" {...props} />}
      />
    </>
  )
}
export default function FeedScreen({ navigation }) {
  // static navigationOptions = {
  //   tabBarLabel: 'Reading List',
  //   tabBarIcon: ({ tintColor, focused }) => (
  //     <Entypo name="home" size={focused ? 25 : 23} color={tintColor} />
  //   ),
  // }
  const { colors } = useTheme()

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar />
      <Feed {...getNavigation(navigation)} />
    </View>
  )
}

const styles = StyleSheet.create({
  fab: {
    margin: 16,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  title: {
    fontWeight: 'bold',
    marginStart: 17,
  },
  avatarWrap: { width: 60 },
  toolbar: {
    flexDirection: 'row',
    height: 53,
    alignItems: 'center',
    ...elevation(4),
  },
  userIcon: {
    height: 56,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: { marginStart: 17 },
})
