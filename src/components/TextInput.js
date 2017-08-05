import React from 'react'
import { View, TextInput as OTextInput, ViewPropTypes } from 'react-native'
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
    this.props.onChangeText(value)
  }

  renderIcon() {
    if (!this.props.androidIcon.length) return null

    return (
      <Icon
        name={this.props.androidIcon}
        style={styles.icon}
        size={20}
        onPress={this.focus.bind(this)}
        color="#b2b2b2"
      />
    )
  }

  renderShowSecureIcon() {
    if (!this.props.secureTextEntry) return null

    return (
      <Icon
        name="remove-red-eye"
        style={[styles.icon, { marginRight: 0 }]}
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
      <View style={styles.inputContainer}>
        {this.renderIcon()}
        <OTextInput
          style={styles.input}
          ref={component => (this.textInput = component)}
          onChangeText={this.onChangeText.bind(this)}
          underlineColorAndroid="transparent"
          keyboardType={this.props.keyboardType}
          value={this.props.value}
          secureTextEntry={
            this.props.secureTextEntry && !this.state.showSecureEntry
          }
          placeholder={this.props.placeholder}
          onSubmitEditing={this.props.onSubmitEditing}
        />
        {this.renderShowSecureIcon()}
      </View>
    )
  }
}

TextInput.defaultProps = {
  secureTextEntry: false,
  onSubmitEditing: () => {},
  placeholder: '',
  onChangeText: value => {},
  androidIcon: '',
  value: '',
  keyboardType: 'default'
}

TextInput.propTypes = {
  ...ViewPropTypes,
  secureTextEntry: React.PropTypes.bool,
  onSubmitEditing: React.PropTypes.func,
  placeholder: React.PropTypes.string,
  onChangeText: React.PropTypes.func,
  androidIcon: React.PropTypes.string,
  value: React.PropTypes.string,
  keyboardType: React.PropTypes.string
}
