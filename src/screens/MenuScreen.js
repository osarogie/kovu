import React from 'react'
import {
  View,
  ScrollView,
  Image,
  Platform,
  Switch,
  Text,
  TouchableOpacity,
  PixelRatio
} from 'react-native'
import styles from '../styles'
import colors from '../colors'
import Button from '../components/Button'
import Icon from 'react-native-vector-icons/Ionicons'
import SettingsList from 'react-native-settings-list'
import { connect } from 'react-redux'
import Hyperlink from 'react-native-hyperlink'
import { setNightMode, logout } from '../actions'
import Toolbar from '../components/Toolbar'
import Separator from '../components/Separator'
import Avatar from '../components/Avatar'
import {
  openProfile,
  openEditProfile,
  openChangePassword,
  openStartCulture,
  imageUrl,
  openLogin
} from '../utils'

const mapStateToProps = state => ({
  night_mode: state.night_mode,
  user: state.user.user,
  loggedIn: state.user.loggedIn
})

class MenuScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Menus',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name="ios-options"
        style={styles.tabIcon}
        size={focused ? 25 : 23}
        color={tintColor}
      />
    )
  }

  infoStyles = {
    textAlign: 'center',
    color: '#ccc',
    fontSize: 14,
    marginRight: 20,
    marginLeft: 20
  }

  constructor(props) {
    super(props)
    this.toggleNightMode = this.toggleNightMode.bind(this)
    this.openLogin = this.openLogin.bind(this)
    this.openProfile = this.openProfile.bind(this)
    this.openEditProfile = this.openEditProfile.bind(this)
    this.openChangePassword = this.openChangePassword.bind(this)
    this.openStartCulture = this.openStartCulture.bind(this)
  }

  toggleNightMode = mode => this.props.dispatch(setNightMode(mode))
  openProfile = _ => openProfile(this.props.user, this.props.navigation)
  openLogin = _ => openLogin(this.props.navigation)
  openEditProfile = _ => openEditProfile(this.props.user, this.props.navigation)
  openChangePassword = _ => openChangePassword(this.props.navigation)
  openStartCulture = _ => openStartCulture(this.props.navigation, {})

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

  renderToolbar() {
    return <Toolbar title="Options" style={{ elevation: 0 }} />
  }
  renderHeader() {
    const { user, loggedIn, night_mode, navigation } = this.props

    if (loggedIn) {
      return (
        <TouchableOpacity
          underlayColor="whitesmoke"
          style={{ backgroundColor: '#fff' }}
          onPress={this.openProfile}
        >
          <View style={{ padding: 15, flexDirection: 'row' }}>
            <Avatar
              large
              radius={5}
              source={{ profile_picture_name: this.getPicture() }}
              title={user.name}
              activeOpacity={0.7}
            />
            <Text style={{ margin: 20, flex: 1, color: '#000' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                {user.name}
                {`\n`}
              </Text>
              <Text style={{ fontStyle: 'italic' }}>{`@${user.username}`}</Text>
            </Text>
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
            buttonStyle={{ backgroundColor: '#05f', height: 40 }}
            textStyle={{ textAlign: 'center' }}
            onPress={this.openLogin}
            title="Login"
          />
        </View>
      )
    }
  }

  getIcon(name, variation = true) {
    const { night_mode } = this.props
    const optionIconProps = {
      style: [styles.icon, { marginRight: 0, marginTop: 15, marginLeft: 15 }],
      size: 25,
      color: colors.get('primary', night_mode)
    }

    return (
      <Icon
        name={
          variation ? (
            `${Platform.select({ android: 'md', ios: 'ios' })}-${name}`
          ) : (
            name
          )
        } //{Platform.select({ ios: 'ios-options', android: 'md-options' })}
        {...optionIconProps}
      />
    )
  }
  renderUserMenu() {
    const { night_mode, dispatch, navigation, user, loggedIn } = this.props
    if (loggedIn && user) {
      return (
        <SettingsList borderColor="#fff" defaultItemSize={50}>
          <SettingsList.Header headerStyle={{ marginTop: 15 }} />
          <SettingsList.Item
            icon={this.getIcon('person')}
            title="View Profile"
            titleInfoStyle={styles.titleInfoStyle}
            onPress={this.openProfile}
          />
          <SettingsList.Item
            icon={this.getIcon('brush')}
            title="Edit Profile"
            titleInfoStyle={styles.titleInfoStyle}
            onPress={this.openEditProfile}
          />
          <SettingsList.Item
            icon={this.getIcon('key')}
            title="Change Password"
            titleInfoStyle={styles.titleInfoStyle}
            onPress={this.openChangePassword}
          />
          <SettingsList.Item
            icon={this.getIcon('exit')}
            hasNavArrow={false}
            title="Logout"
            onPress={_ => dispatch(logout())}
          />
          <SettingsList.Header headerStyle={{ marginTop: 15 }} />
          <SettingsList.Item
            icon={this.getIcon('logo-buffer', false)}
            hasNavArrow={false}
            title="Start a new culture"
            onPress={this.openStartCulture}
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
      <View style={{ flex: 1 }}>
        {this.renderUserMenu()}
        {/* <SettingsList borderColor="transparent" defaultItemSize={50}>
          <SettingsList.Header headerStyle={{ marginTop: 15 }} />
          <SettingsList.Item
            icon={this.getIcon('moon')}
            hasSwitch={true}
            switchState={night_mode}
            switchOnValueChange={this.toggleNightMode}
            hasNavArrow={false}
            title="Night Mode"
          />
        </SettingsList> */}
      </View>
    )
  }
  render() {
    return (
      <View style={[styles.container, { backgroundColor: '#fff' }]}>
        <ScrollView>
          {this.renderToolbar()}
          <View style={styles.container}>
            {this.renderHeader()}
            <Separator />
          </View>
          {this.renderMenu()}
          <Hyperlink linkDefault={true}>
            <Text style={[this.infoStyles, { marginTop: 50 }]}>
              {`Some features will be available soon.`}
            </Text>
            <Text
              style={[
                this.infoStyles,
                { color: '#05fc', textDecorationLine: 'underline' }
              ]}
            >
              {'https://thecommunity.ng'}
            </Text>
            <Text style={[this.infoStyles, { marginTop: 30 }]}>
              {`Nosakhare Emmanuel. \u00A9 2017`}
            </Text>
            <Text
              style={[
                this.infoStyles,
                {
                  color: '#05fc',
                  marginBottom: 50,
                  textDecorationLine: 'underline'
                }
              ]}
            >
              {'https://nosakhare.us'}
            </Text>
          </Hyperlink>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../images/ic_logo.png')}
              width={45}
              height={45}
              style={{ width: 45, height: 45, marginBottom: 50 }}
            />
          </View>
        </ScrollView>
        <View style={styles.elevation} />
      </View>
    )
  }
}

export default connect(mapStateToProps)(MenuScreen)
