import React from 'react'
import {
  View,
  ScrollView,
  Image,
  Platform,
  Switch,
  Text,
  TouchableOpacity,
  Alert,
  PixelRatio
} from 'react-native'
import styles from '../styles'
import colors from '../colors'
import { Button, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import SettingsList from 'react-native-settings-list'
import { connect } from 'react-redux'
import { setNightMode, logout } from '../actions'
import AndroidToolbar from '../components/AndroidToolbar'
import Separator from '../components/Separator'
import { openProfile, imageUrl } from '../utils'

const mapStateToProps = state => ({
  night_mode: state.night_mode,
  user: state.user.user,
  loggedIn: state.user.loggedIn
})

// @connect(mapStateToProps)
// @withNavigation
class MenuScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Menus',
    tabBarIcon: ({ tintColor, focused }) =>
      <Icon
        name="ios-options"
        style={styles.tabIcon}
        size={focused ? 25 : 23}
        color={tintColor}
      />
  }

  renderToolbar() {
    return Platform.select({
      android: <AndroidToolbar title="Options" />,
      ios: null
    })
  }
  renderHeader() {
    const { user, loggedIn, night_mode, navigation } = this.props

    if (loggedIn) {
      return (
        <TouchableOpacity
          underlayColor="whitesmoke"
          style={{ backgroundColor: '#fff' }}
          onPress={_ => openProfile(user, navigation)}
        >
          <View
            style={{
              padding: 15,
              flexDirection: 'row',
              backgroundColor: colors.get('container', night_mode)
            }}
          >
            {this.renderProfilePicture()}
            <View style={{ marginLeft: 20, flex: 1, justifyContent: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>
                {user.name}
              </Text>
              <Text>{`@${user.username}`}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    } else {
      return (
        <View
          style={{
            padding: 20
          }}
        >
          <Button
            raised
            buttonStyle={{ backgroundColor: '#05f' }}
            textStyle={{ textAlign: 'center' }}
            onPress={() => navigation.navigate('Login')}
            title="Login"
          />
        </View>
      )
    }
  }
  getAvatarUrl() {
    const { user } = this.props
    const size = PixelRatio.getPixelSizeForLayoutSize(50)

    if (user.profile_pic && typeof user.profile_pic === 'string') {
      const image = user.profile_pic.split('/').pop()
      return imageUrl(image, `${size}x${size}`)
    }

    return null
  }
  renderProfilePicture() {
    const { navigation, user } = this.props

    // Alert.alert(PixelRatio.getPixelSizeForLayoutSize(50)+'')

    return (
      <Avatar
        medium
        rounded
        source={{ uri: this.getAvatarUrl() }}
        onPress={_ => openProfile(user, navigation)}
        title={user.name}
        activeOpacity={0.7}
      />
    )
  }
  getIcon(name) {
    const { night_mode } = this.props
    const optionIconProps = {
      style: [styles.icon, { marginRight: 0, marginTop: 15, marginLeft: 15 }],
      size: 25,
      color: colors.get('primary', night_mode)
    }

    return (
      <Icon
        name={`${Platform.select({ android: 'md', ios: 'ios' })}-${name}`} //{Platform.select({ ios: 'ios-options', android: 'md-options' })}
        {...optionIconProps}
      />
    )
  }
  renderUserMenu() {
    const { night_mode, dispatch, navigation, user, loggedIn } = this.props
    if (loggedIn && user) {
      return (
        <SettingsList borderColor="#c8c7cc" defaultItemSize={50}>
          <SettingsList.Header headerStyle={{ marginTop: 15 }} />
          <SettingsList.Item
            icon={this.getIcon('person')}
            title="View Profile"
            titleInfoStyle={styles.titleInfoStyle}
            onPress={_ => openProfile(user, navigation)}
          />
          <SettingsList.Item
            icon={this.getIcon('exit')}
            hasNavArrow={false}
            title="Logout"
            onPress={_ => dispatch(logout())}
          />
        </SettingsList>
      )
    }

    return null
  }
  renderMenu() {
    const { night_mode, dispatch, navigation } = this.props
    const optionRowStyle = {
      backgroundColor: colors.get('container', night_mode)
    }
    const optionIconProps = {
      style: [styles.icon, { marginRight: 0 }],
      size: 25,
      color: colors.get('optionIcon', night_mode)
    }

    return (
      <View style={{ backgroundColor: '#EFEFF4', flex: 1 }}>
        {this.renderUserMenu()}
        <SettingsList borderColor="#c8c7cc" defaultItemSize={50}>
          <SettingsList.Header headerStyle={{ marginTop: 15 }} />
          <SettingsList.Item
            icon={this.getIcon('moon')}
            hasSwitch={true}
            switchState={night_mode}
            switchOnValueChange={mode => dispatch(setNightMode(mode))}
            hasNavArrow={false}
            title="Night Mode"
          />
        </SettingsList>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderToolbar()}
        <ScrollView>
          <View style={styles.container}>
            {this.renderHeader()}
            <Separator />
          </View>
          {this.renderMenu()}
        </ScrollView>
      </View>
    )
  }
}

export default connect(mapStateToProps)(MenuScreen)
