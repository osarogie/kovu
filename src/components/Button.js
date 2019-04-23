import React from 'react'
import {
  // ViewPropTypes,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

export default class Button extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        disabled={this.props.disabled}
        style={[
          styles.button,
          { flexDirection: 'row', alignItems: 'center' },
          this.props.buttonStyle
        ]}
        accessibilityTraits="button"
      >
        {this.props.showTitle ? this.renderTitle() : null}
        {this.props.renderIcon()}
      </TouchableOpacity>
    )
  }

  renderTitle = _ => (
    <Text style={[styles.text, this.props.textStyle]}>{this.props.title}</Text>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#05f',
    borderRadius: 15,
    height: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20
  },
  text: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 15
  }
})

Button.defaultProps = {
  title: 'Button',
  containerStyle: {},
  buttonStyle: {},
  textStyle: {},
  disable: false,
  showTitle: true,
  renderIcon: _ => {}
}

Button.propTypes = {
  // ...ViewPropTypes,
  // title: React.PropTypes.string,
  // containerStyle: View.propTypes.style,
  // buttonStyle: View.propTypes.style,
  // textStyle: Text.propTypes.style,
  // disable: React.PropTypes.bool,
  // showTitle: React.PropTypes.bool,
  // renderIcon: React.PropTypes.func
}
