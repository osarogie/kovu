import React from 'react'
import {
  View,
  ScrollView,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native'
import styles from '../styles'
import colors from '../colors'
import Button from '../components/Button'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
// import { Icon } from '@shoutem/ui/components/Icon'
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
  openLogin
} from '../utils'
import { RoundButton } from '../components/buttons/RoundButton'

const mapStateToProps = state => ({
  night_mode: state.night_mode,
  user: state.user.user,
  loggedIn: state.user.loggedIn
})
// import { withNavigation } from 'react-navigation'

// @withNavigation
// @connect(mapStateToProps)
// export default
class MenuScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Options',
    tabBarIcon: ({ tintColor, focused }) => (
      <Feather
        name="user"
        // style={styles.tabIcon}
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

  toggleNightMode = mode => this.props.dispatch(setNightMode(mode))
  openProfile = _ => openProfile(this.props.user, this.props.navigation)
  openLogin = _ => openLogin(this.props.navigation)
  openEditProfile = _ => openEditProfile(this.props.user, this.props.navigation)
  openChangePassword = _ => openChangePassword(this.props.navigation)
  openStartCulture = _ =>
    this.props.loggedIn
      ? openStartCulture(this.props.navigation, {})
      : this.openLogin()

  openWebsite() {
    Linking.openURL('https://thecommunity.ng')
  }

  openDeveloperWebsite() {
    Linking.openURL('https://osarogie.com')
  }

  getPicture = _ => {
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
    const { user, loggedIn } = this.props

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
          <RoundButton mode="outlined" onPress={this.openLogin}>
            Login
          </RoundButton>
        </View>
      )
    }
  }

  getIcon(name, variation = true) {
    const { night_mode } = this.props
    const optionIconProps = {
      style: [
        styles.icon,
        {
          marginRight: 0,
          marginTop: Platform.select({ web: 11, default: 15 }),
          marginLeft: 15
        }
      ],
      size: 25,
      color: colors.get('primary', night_mode)
    }

    return (
      <Ionicon
        name={
          variation
            ? `${Platform.select({
                android: 'md',
                ios: 'ios',
                web: 'md'
              })}-${name}`
            : name
        } //{Platform.select({ ios: 'ios-options', android: 'md-options' })}
        {...optionIconProps}
      />
    )
  }
  renderUserMenu() {
    const { dispatch, user, loggedIn } = this.props
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
        </SettingsList>
      )
    }

    return null
  }
  renderMenu() {
    // const { night_mode } = this.props
    // const optionRowStyle = {
    //   backgroundColor: colors.get('container', night_mode)
    // }
    // const optionIconProps = {
    //   style: [styles.icon, { marginRight: 0 }],
    //   size: 25,
    //   color: colors.get('optionIcon', night_mode)
    // }

    return (
      <View style={{ flex: 1, marginStart: 10 }}>
        {this.renderUserMenu()}
        <SettingsList borderColor="transparent" defaultItemSize={50}>
          {/* <SettingsList.Header headerStyle={{ marginTop: 15 }} />
          <SettingsList.Item
            icon={this.getIcon('moon')}
            hasSwitch={true}
            switchState={night_mode}
            switchOnValueChange={this.toggleNightMode}
            hasNavArrow={false}
            title="Night Mode"
          /> */}
          <SettingsList.Header headerStyle={{ marginTop: 15 }} />
          <SettingsList.Item
            icon={this.getIcon('logo-buffer', false)}
            hasNavArrow={false}
            title="Start a new culture"
            onPress={this.openStartCulture}
          />
          <SettingsList.Item
            icon={this.getIcon('globe')}
            hasNavArrow={false}
            title="Visit Website"
            onPress={this.openWebsite}
          />
          <SettingsList.Item
            icon={this.getIcon('person')}
            hasNavArrow={false}
            title="Developer"
            onPress={this.openDeveloperWebsite}
          />
        </SettingsList>
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
          {/* <Hyperlink linkDefault={true}>
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
              {`Nosakhare Emmanuel. \u00A9 `}
              {new Date().getFullYear()}
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
              {'https://osarogie.com'}
            </Text>
          </Hyperlink> */}
          {/* <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../images/ic_logo.png')}
              width={45}
              height={45}
              style={{ width: 45, height: 45, marginBottom: 50 }}
            />
          </View> */}
        </ScrollView>
        {/* <View style={styles.elevation} /> */}
      </View>
    )
  }
}

export default connect(mapStateToProps)(MenuScreen)

// export default withNavigation(connect(mapStateToProps)(MenuScreen))
