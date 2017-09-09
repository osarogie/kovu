import React from 'react'
import {
  View,
  ScrollView,
  Image,
  Platform,
  TouchableHighlight
} from 'react-native'
import Authenticator from '../components/Authenticator'
import styles from '../styles'
import Feed from '../renderers/Feed'
import AndroidToolbar from '../components/AndroidToolbar'
import Button from '../components/Button'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import getNavigation from '../helpers/getNavigation'

const mapStateToProps = state => ({
  user: state.user.user,
  loggedIn: state.user.loggedIn
})

class FeedScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Reading List',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name={Platform.select({ ios: 'ios-home', android: 'md-home' })}
        style={styles.tabIcon}
        size={focused ? 25 : 23}
        color={tintColor}
      />
    )
  }

  constructor(props) {
    super(props)
    this.openProfile = this.openProfile.bind(this)
    this.openWrite = this.openWrite.bind(this)
    this.renderIcon = this.renderIcon.bind(this)
  }

  openWrite = _ => this._onActionSelected(0)
  openProfile = _ => this._onActionSelected(1)

  // renderToolbar() {
  // return Platform.select({
  //   android: (
  //     <AndroidToolbar
  //       actions={this.toolbarActions()}
  //       onActionSelected={this._onActionSelected.bind(this)}
  //       // title="Read"
  //       contentInsetStart={0}
  //       logo={require('../images/ic_logo.png')}
  //     />
  //   ),
  //   ios: <TabBarIOS />
  // })

  // }
  renderIcon = _ => (
    <Icon
      name="ios-add-circle"
      style={[styles.toolbarIcon, { marginLeft: 10 }]}
      size={20}
      color={'#000'}
    />
  )
  renderToolbar = _ => (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#eeec',
        flex: 1,
        height: 53,
        paddingLeft: 17,
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
        paddingRight: 3,
        alignItems: 'center'
      }}
    >
      <Image
        source={require('../images/ic_logo.png')}
        width={45}
        height={45}
        style={{ width: 45, height: 45 }}
      />
      <View style={{ flex: 1 }} />
      {/* <Icon
        name="ios-add-circle"
        style={styles.toolbarIcon}
        size={25}
        color="#05f"
      /> */}
      <Button
        buttonStyle={{
          height: 36,
          width: 100,
          borderRadius: 20,
          backgroundColor: '#fff',
          elevation: 2
        }}
        textStyle={{ fontSize: 17, color: '#000' }}
        onPress={this.openWrite}
        title="Write"
        // showTitle={false}
        renderIcon={this.renderIcon}
      />
      <TouchableHighlight
        onPress={this.openProfile}
        underlayColor="#ddd"
        style={styles.toolbarAction}
      >
        <Icon name="md-person" size={25} color="#000" />
      </TouchableHighlight>
    </View>
  )

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Feed {...getNavigation(navigation)} />
        <View style={styles.elevation} />
        {this.renderToolbar()}
      </View>
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
    const { user, navigation: { navigate }, loggedIn } = this.props
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

export default connect(mapStateToProps)(FeedScreen)
