import React from 'react'
import { View, Platform } from 'react-native'
import styles from '../styles'
import searchStyles from '../styles/search'
import TextInput from '../components/TextInput'
import Discover from '../renderers/Discover'
import Icon from 'react-native-vector-icons/Feather'
// import { Icon } from '@shoutem/ui/components/Icon'
import getNavigation from '../helpers/getNavigation'
import { WHITE } from '../ui'
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

  handleSubmit = _ => this.setState({ qs: this._q.state.value })
  shouldComponentUpdate(p, s) {
    return s.qs !== this.state.qs
  }
  renderToolbar() {
    return (
      <View
        style={{
          paddingRight: 10,
          paddingLeft: 10,
          height: 53,
          width: '100%',
          // position: 'absolute',
          justifyContent: 'center',
          backgroundColor: WHITE
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
            inputStyle={{ color: '#333' }}
            iconColor="#333"
            style={{
              backgroundColor: '#ddd',
              elevation: 0,
              borderRadius: 5
              // borderWidth: 1,
              // borderColor: '#eee',
              // ...Platform.select({ web: { borderStyle: 'solid' } })
            }}
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
        {this.renderToolbar()}
        {this.renderPage()}
      </View>
    )
  }
}

// const styles2 = StyleSheet.create({
//   wrapper: { backgroundColor: '#000' },
//   slide1: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#9DD6EB'
//   },
//   slide2: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#97CAE5'
//   },
//   slide3: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#92BBD9'
//   },
//   text: {
//     color: '#fff',
//     fontSize: 30,
//     fontWeight: 'bold'
//   }
// })
