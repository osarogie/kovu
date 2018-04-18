import React from 'react'
import {
  View,
  Text,
  TextInput as OTextInput,
  // ViewPropTypes
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from '../styles'

export default class TextInput extends React.Component {
  state = {
    showSecureEntry: false, //this.props.secureTextEntry,
    value: this.props.value
  }

  focus() {
    this.textInput.focus()
  }

  onChangeText(value) {
    this.setState({ value })
    if (this.props.onChangeText) {
      this.props.onChangeText(value)
    }
  }

  renderRightIcon() {
    return this.props.renderRightIcon ? this.props.renderRightIcon() : null
  }

  renderIcon() {
    if (!this.props.androidIcon.length) return null

    return (
      <Icon
        name={this.props.androidIcon}
        style={[styles.loginFieldIcon, this.props.iconStyle]}
        size={20}
        onPress={this.focus.bind(this)}
        color={this.props.iconColor || '#b2b2b2'}
      />
    )
  }
  renderText() {
    if (!this.props.sideText.length) return null

    return (
      <Text
        // name={this.props.androidIcon}
        style={[
          {
            paddingRight: 20,
            paddingLeft: 20
          },
          this.props.textStyle
        ]}
        // size={20}
        // onPress={this.focus.bind(this)}
        color={this.props.iconColor || '#b2b2b2'}
      >
        {this.props.sideText}
      </Text>
    )
  }

  renderShowSecureIcon() {
    if (!this.props.secureTextEntry) return null

    return (
      <Icon
        name="remove-red-eye"
        style={[
          styles.loginFieldIcon,
          { marginRight: 0 },
          this.props.iconStyle
        ]}
        size={20}
        color={this.state.showSecureEntry ? '#05f' : '#b2b2b2'}
        onPress={() => {
          this.setState(previousState => {
            return { showSecureEntry: !previousState.showSecureEntry }
          })
        }}
      />
    )
  }

  render() {
    return (
      <View style={[{ flex: 1 }, this.props.wrapperStyle]}>
        {this.renderText()}

        <View style={[styles.inputContainer, this.props.style]}>
          {this.renderIcon()}
          <OTextInput
            style={[styles.input, this.props.inputStyle]}
            ref={component => (this.textInput = component)}
            onChangeText={this.onChangeText.bind(this)}
            underlineColorAndroid="transparent"
            keyboardType={this.props.keyboardType}
            value={
              (this.props.onChangeText && this.props.value) || this.state.value
            }
            secureTextEntry={
              this.props.secureTextEntry && !this.state.showSecureEntry
            }
            placeholder={this.props.placeholder}
            onSubmitEditing={this.props.onSubmitEditing}
            {...this.props.inputProps}
          />
          {this.renderShowSecureIcon()}
          {this.renderRightIcon()}
        </View>
      </View>
    )
  }
}

TextInput.defaultProps = {
  secureTextEntry: false,
  onSubmitEditing: () => {},
  placeholder: '',
  // onChangeText: value => {},
  androidIcon: '',
  sideText: '',
  value: '',
  inputProps: {},
  keyboardType: 'default'
}

TextInput.propTypes = {
  // ...ViewPropTypes,
  // secureTextEntry: React.PropTypes.bool,
  // onSubmitEditing: React.PropTypes.func,
  // placeholder: React.PropTypes.string,
  // // onChangeText: React.PropTypes.func,
  // androidIcon: React.PropTypes.string,
  // sideText: React.PropTypes.string,
  // value: React.PropTypes.string,
  // inputPropstyle: React.PropTypes.object,
  // keyboardType: React.PropTypes.string
}
