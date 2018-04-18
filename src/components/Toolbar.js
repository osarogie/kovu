import React from 'react'
import AndroidToolbar from './AndroidToolbar'
import { Platform, TabBarIOS } from 'react-native'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationActions, withNavigation } from 'react-navigation'

class Toolbar extends React.Component {
  static defaultProps = {
    color: '#000' // #015001
  }

  goBack = _ => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  onBackPress = _ => {
    if (this.props.backToHome) this.goBack()

    onBackPress ? onBackPress : _ => navigation.goBack()
  }

  render() {
    if (Platform.OS == 'android') return <AndroidToolbar {...this.props} />

    const { showTitle, showNavIcon, buttonStyle, dark } = this.props

    return (
      <View style={[styles.button, buttonStyle]}>
        <View
          style={[
            styles.button,
            {
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              height: 60,
              top: 0,
              backgroundColor: dark ? '#000' : '#fff',
              width: '100%'
            }
          ]}
        >
          {this.renderTitle()}
        </View>
        {showNavIcon ? this.renderNavIcon() : null}
      </View>
    )
  }

  renderNavIcon() {
    const { onBackPress, disabled, renderIcon, navigation, color } = this.props
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
          color={color}
          style={{ marginTop: 4 }}
        />
      </TouchableOpacity>
    )
  }

  renderTitle = _ => (
    <Text
      style={[
        styles.text,
        { color: this.props.dark ? '#fff' : '#000' },
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
    marginTop: 5,
    marginBottom: 10
  },
  button: {
    alignItems: 'center',
    // justifyContent: "center",
    backgroundColor: '#fff',
    height: 60,
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 20,
    borderBottomColor: '#ddd'
    // borderBottomWidth: 1
  },
  text: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
    marginLeft: 20,
    fontWeight: 'bold'
  }
})
