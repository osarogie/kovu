import React from 'react'
import { View, ScrollView, Image, Platform, TabBarIOS } from 'react-native'
import Authenticate from '../components/Authenticate'
import styles from '../styles'
import Feed from '../renderers/Feed'
import AndroidToolbar from '../components/AndroidToolbar'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import getNavigation from '../helpers/getNavigation'

const mapStateToProps = state => ({
  night_mode: state.night_mode,
  user: state.user.user,
  loggedIn: state.user.loggedIn
})

class FeedScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Reading List',
    tabBarIcon: ({ tintColor, focused }) =>
      <Icon
        name={Platform.select({ ios: 'ios-home', android: 'md-home' })}
        style={styles.tabIcon}
        size={focused ? 25 : 23}
        color={tintColor}
      />
  }

  renderToolbar() {
    return Platform.select({
      android: (
        <AndroidToolbar
          actions={this.toolbarActions()}
          onActionSelected={this._onActionSelected.bind(this)}
          title="Reading List"
        />
      ),
      ios: <TabBarIOS />
    })
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {this.renderToolbar()}
          <Feed {...getNavigation(navigation)} />
        </View>
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
