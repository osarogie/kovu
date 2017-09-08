import React from 'react'
import { View, ScrollView, Image, Platform } from 'react-native'
import styles from '../styles'
import { withNavigation } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import AndroidToolbar from '../components/AndroidToolbar'

export default class NotificationScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Notifications',
    tabBarIcon: ({ tintColor }) =>
      <Icon
        name={Platform.select({ ios: 'ios-at', android: 'md-at' })}
        style={[styles.icon, { marginRight: 0 }]}
        size={23}
        color={tintColor}
      />
  }
  renderToolbar() {
    return Platform.select({
      android: (
        <AndroidToolbar
          // {...this.state.colorProps}
          // titleColor={this.state.dark ? '#fff' : '#05f'}
          // actions={this.toolbarActions()}
          // onActionSelected={this._onActionSelected}
          navIconName="md-arrow-back"
          // style={styles.toolbar}
          title="Notifications"
        />
      ),
      ios: null
    })
  }
  render() {
    return (
      <View style={{}}>
        {this.renderToolbar()}
        <View style={styles.separator} />
      </View>
    )
  }
}
