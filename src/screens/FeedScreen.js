import React from 'react'
import {
  ScrollView,
  Image,
  Platform,
  TouchableHighlight,
  Dimensions
} from 'react-native'
import Authenticator from '../components/Authenticator'
// import styles from '../styles'
import Feed from '../renderers/Feed'
import Avatar from '../components/Avatar'
import Appbar from '../components/Appbar'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcon from 'react-native-vector-icons/EvilIcons'

import { Icon } from '@shoutem/ui/components/Icon'
import { NavigationBar } from '@shoutem/ui/components/NavigationBar'
import { Title, Text, Heading } from '@shoutem/ui/components/Text'
import { Button } from '@shoutem/ui/components/Button'
// import { connectDecorator } from '../lib'
import getNavigation from '../helpers/getNavigation'
import { View, Screen } from '@shoutem/ui'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  user: state.user.user,
  loggedIn: state.user.loggedIn
})
const { width } = Dimensions.get('window')

// @withNavigation
@connect(mapStateToProps)
class TopBar extends React.Component {
  openWrite = _ => this._onActionSelected(0)
  openProfile = _ => this._onActionSelected(1)

  render = _ => (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        height: 53,
        backgroundColor: '#fff8',
        position: 'absolute',
        alignItems: 'center',
        width: '100%',
        top: 0,
        left: 0
      }}
    >
      {/* <Appbar
        // leftElement={this.renderAvatar()}
        // onLeftElementPress={this.props.navigation.goBack}
        centerElement="TheCommunity"
        rightElement={
          <View styleName="horizontal" style={{ alignItems: 'center' }}>
            <Button styleName="" onPress={this.openWrite}>
              <Text style={{ marginRight: 10, fontSize: 15 }}>Write</Text>
            </Button>
            {this.renderAvatar()}
          </View>
        }
        style={{ container: { width } }}
        // onRightElementPress={() =>
        //   this.props.navigation.navigate('DrawerToggle')
        // }
      /> */}
      <View styleName="flexible">{this.renderAvatar()}</View>
      <Heading
        styleName="flexible"
        style={{ textAlign: 'center', fontFamily: 'BlackHanSans-Regular' }}
      >
        -TC-
      </Heading>
      <View styleName="flexible">
        <Button
          styleName="clear"
          style={{ alignSelf: 'flex-end' }}
          onPress={this.openWrite}
        >
          <Text style={{ marginRight: 10, fontSize: 15 }}>Write</Text>
        </Button>
      </View>
    </View>
  )

  getPicture() {
    const { user } = this.props

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

  renderAvatar() {
    const { user, loggedIn } = this.props

    if (loggedIn) {
      return (
        <Avatar
          width={36}
          radius={15}
          source={{ profile_picture_name: this.getPicture() }}
          title={user.name}
          containerStyle={{ marginHorizontal: 17 }}
          onPress={this.openProfile}
          activeOpacity={0.7}
        />
      )
    }

    return (
      <TouchableHighlight
        onPress={this.openProfile}
        underlayColor="#ddd"
        style={{
          height: 56,
          width: 56,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <EvilIcon name="user" size={35} color="#000" />
      </TouchableHighlight>
    )
  }

  toolbarActions() {
    return [
      {
        title: 'Write',
        show: 'always',
        iconName: 'ios-add-circle'
      },
      // { title: 'Notifications', show: 'always', iconName: 'ios-notifications' },
      { title: 'View Profile', show: 'always', iconName: 'ios-person' }
    ]
  }

  _onActionSelected(position) {
    const {
      user,
      navigation: { navigate },
      loggedIn
    } = this.props
    if (loggedIn) {
      switch (position) {
        case 0:
          navigate('Write')
          break
        // case 1:
        //   navigate('Notifications')
        //   break
        case 1:
          navigate('Profile', { id: user.id, user })
          break
        default:
          return
      }
    } else navigate('Login')
  }
}

export default class FeedScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Reading List',
    tabBarIcon: ({ tintColor, focused }) => (
      <Entypo
        // name={Platform.select({ ios: "ios-home", android: "md-home" })}
        name="home"
        // style={styles.tabIcon}
        size={focused ? 25 : 23}
        color={tintColor}
      />
    )
  }

  render() {
    const { navigation } = this.props
    return (
      <Screen styleName="paper">
        <Feed {...getNavigation(navigation)} />
        <TopBar navigation={this.props.navigation} />
      </Screen>
    )
  }
}
