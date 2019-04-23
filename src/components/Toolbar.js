import React from 'react'
import AndroidToolbar from './AndroidToolbar'
import { Platform } from 'react-native'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationActions, withNavigation } from 'react-navigation'

class Toolbar extends React.Component {
  static defaultProps = {
    color: '#000' // #015001
  }

  goBack = _ => {
    if (Platform.OS === 'web') {
      window.location.href = ''
    } else {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Home' })]
      })
      this.props.navigation.dispatch(resetAction)
    }
  }

  onBackPress = _ => {
    if (this.props.backToHome) this.goBack()

    const { onBackPress } = this.props
    if (Platform.OS === 'web') {
      window.appHistory.goBack()
    } else if (onBackPress) {
      onBackPress()
    } else {
      this.props.navigation.goBack()
    }
  }

  render() {
    if (Platform.OS === 'android') return <AndroidToolbar {...this.props} />

    const { showNavIcon, buttonStyle, dark } = this.props

    return (
      <View style={[styles.button, buttonStyle]}>
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            height: 50,
            top: 0,
            backgroundColor: dark ? '#000' : '#fff',
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row'
          }}
        >
          {this.renderTitle()}
        </View>
        {showNavIcon || this.props.navIconName ? this.renderNavIcon() : null}
      </View>
    )
  }

  renderNavIcon() {
    const { disabled, color, dark } = this.props
    return (
      <TouchableOpacity
        onPress={this.onBackPress}
        disabled={disabled}
        style={{ flexDirection: 'row', alignItems: 'center' }}
        accessibilityTraits="button"
      >
        <Icon
          name="ios-arrow-back"
          size={25}
          color={dark ? '#fff' : color}
          style={{ marginTop: 4, paddingHorizontal: 20 }}
        />
      </TouchableOpacity>
    )
  }

  renderTitle = _ => (
    <Text
      style={[
        styles.text,
        {
          color: this.props.dark ? '#fff' : '#000',
          marginLeft: this.props.navIconName || this.props.showNavIcon ? 50 : 15
        },
        this.props.textStyle
      ]}
    >
      {this.props.title}
    </Text>
  )
}

export default withNavigation(Toolbar)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // marginTop: 5,
    marginBottom: 10
  },
  button: {
    alignItems: 'center',
    // justifyContent: "center",
    backgroundColor: '#fff',
    height: 50,
    flexDirection: 'row',
    // paddingTop: 30,
    // paddingBottom: 10,
    paddingRight: 10,
    // paddingLeft: 20,
    borderBottomColor: '#ddd',
    ...Platform.select({
      web: {
        borderBottomWidth: 1,
        borderBottomStyle: 'solid'
      }
    })
  },
  text: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 20,
    // textAlign: 'center',
    flex: 1,
    fontWeight: 'bold'
  }
})
