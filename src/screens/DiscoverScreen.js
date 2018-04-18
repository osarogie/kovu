import React from 'react'
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  TabBarIOS
} from 'react-native'
import styles from '../styles'
import searchStyles from '../styles/search'
import TextInput from '../components/TextInput'
import Discover from '../renderers/Discover'
import Icon from 'react-native-vector-icons/Feather'
// import { Icon } from '@shoutem/ui/components/Icon'
import getNavigation from '../helpers/getNavigation'
import { PURPLE } from '../ui'
// import { withNavigation } from 'react-navigation'

// @withNavigation
export default class DiscoverScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Discover',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name="search"
        // style={styles.tabIcon}
        size={focused ? 25 : 23}
        color={tintColor}
      />
    )
  }

  state = {
    q: '',
    qs: ''
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = _ => this.setState({ qs: this._q.state.value })
  shouldComponentUpdate(p, s) {
    return s.qs !== this.state.qs
  }
  renderToolbar() {
    const { navigation } = this.props
    return (
      <View
        style={{
          paddingRight: 10,
          paddingLeft: 10,
          height: 53,
          width: '100%',
          // position: 'absolute',
          justifyContent: 'center',
          backgroundColor: PURPLE
        }}
      >
        <View style={searchStyles.container}>
          <TextInput
            inputProps={{
              returnKeyLabel: 'search',
              returnKeyType: 'search'
            }}
            // placeholderTextColor="#fff"
            // placeholderStyle={{ color: '#fff' }}
            inputStyle={{ color: '#fff' }}
            iconColor="#fff"
            style={{ backgroundColor: '#fff4', elevation: 0 }}
            placeholder="Search TheCommunity"
            ref={component => (this._q = component)}
            androidIcon="search"
            // value={this.state.q}
            // onChangeText={q => this.setState({ q })}
            onSubmitEditing={this.handleSubmit}
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
        {/* <View style={styles.elevation} /> */}
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderPage()}
        {this.renderToolbar()}
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
