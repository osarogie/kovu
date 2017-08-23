import React from 'react'
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToolbarAndroid,
  Platform,
  TabBarIOS
} from 'react-native'
import styles from '../styles'
import searchStyles from '../styles/search'
import TextInput from '../components/TextInput'
import Discover from '../renderers/Discover'
import Icon from 'react-native-vector-icons/Ionicons'
import getNavigation from '../helpers/getNavigation'

export default class DiscoverScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Discover',
    tabBarIcon: ({ tintColor, focused }) =>
      <Icon
        name="ios-search"
        style={styles.tabIcon}
        size={focused ? 25 : 23}
        color={tintColor}
      />
  }
  state = {
    q: '',
    qs: ''
  }
  renderToolbar() {
    const { navigation } = this.props
    return (
      <View
        style={[
          styles.toolbar,
          {
            // paddingTop: 6,
            // paddingBottom: 6,
            paddingRight: 10,
            paddingLeft: 10,
            justifyContent: 'center',
            backgroundColor: '#fff',
            elevation: 2
          }
        ]}
      >
        <View style={searchStyles.container}>
          <TextInput
            inputProps={{
              returnKeyLabel: 'search',
              returnKeyType: 'search'
            }}
            inputStyle={{ color: '#000' }}
            iconColor="#000"
            style={{ backgroundColor: '#eee' }}
            placeholder="Search TheCommunity"
            ref={component => (this._q = component)}
            androidIcon="search"
            // value={this.state.q}
            // onChangeText={q => this.setState({ q })}
            onSubmitEditing={() => this.setState({ qs: this._q.state.value })}
          />
        </View>
      </View>
    )
  }
  renderPage() {
    const { navigation } = this.props
    return (
      <View style={[styles.container]}>
        <Discover {...getNavigation(navigation)} q={this.state.qs} />
      </View>
    )
  }
  render() {
    return (
      <View style={[styles.container, { backgroundColor: '#fff' }]}>
        {this.renderToolbar()}
        {this.renderPage()}
      </View>
    )
  }
}

const styles2 = StyleSheet.create({
  wrapper: { backgroundColor: '#000' },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})
