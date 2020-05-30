import React from 'react'
import { Picker, View, Animated, Text, StyleSheet } from 'react-native'
import { withTheme } from '../providers/ThemeProvider'
import { RoundButton } from './buttons/RoundButton'
import { TextInput } from 'react-native-paper'

// const { width } = Dimensions.get('window')
export class Form extends React.Component {
  state = { keyboardHeight: new Animated.Value(0) }

  animateKeyboardHeight = (toValue, duration) => {
    Animated.timing(this.state.keyboardHeight, { toValue, duration }).start()
  }

  // componentWillMount() {
  //   if (Platform.OS === 'android') {
  //     this.keyboardShowListener = Keyboard.addListener(
  //       'keyboardDidShow',
  //       ({ endCoordinates }) => {
  //         this.animateKeyboardHeight(endCoordinates.height, 0)
  //       }
  //     )
  //     this.keyboardHideListener = Keyboard.addListener(
  //       'keyboardDidHide',
  //       () => {
  //         this.animateKeyboardHeight(0, 300)
  //       }
  //     )
  //   }
  // }

  componentWillReceiveProps({ errors }) {
    if (errors && typeof errors === 'object') {
      let es = {}

      for (const e in errors) {
        if (errors.hasOwnProperty(e) && errors[e]) {
          es[`${e}$error`] = Array.isArray(errors[e]) ? errors[e][0] : errors[e]
        }
      }

      this.setState(es)
    }
  }

  onSubmit = async () => {
    // const { isSaving, keyboardHeight, ...data } = this.state
    const { fields, onSubmit } = this.props
    let data = {}

    for (const f in fields) {
      if (fields.hasOwnProperty(f) && this.state[f]) {
        data[f] = this.state[f]
      }
    }

    // this.props.onSubmit && this.props.onSubmit(data)

    if (onSubmit) {
      this.setState({ isSaving: true })
      await this.props.onSubmit(data)
      this.setState({ isSaving: false })
    }
  }

  validate = () => {
    const { fields } = this.props
    var flag = true

    for (var f in fields)
      if (fields.hasOwnProperty(f))
        if (fields[f].required && !this.state[f]) {
          flag = false

          break
        }

    return flag
  }

  onNext = (f, i, a) => {
    if (a.length > i + 1) {
      const field = this[a[i + 1]]

      field && field.focus && field.focus()
    } else {
      this.onSubmit()
    }
  }

  _scrollToInput = reactNode => this.scroll.scrollToFocusedInput(reactNode)

  renderField = (f, i, a) => {
    const { fields } = this.props

    switch (fields[f].type) {
      case 'text':
        return (
          <TextInput
            key={f}
            showPasswordAccessory={fields[f].secure}
            secureTextEntry={fields[f].secure}
            title={fields[f].title}
            characterRestriction={fields[f].characterRestriction}
            error={this.state[`${f}$error`]}
            // onFocus={e => this._scrollToInput(findNodeHandle(e.target))}
            returnKeyType={a.length > i + 1 ? 'next' : 'send'}
            onSubmitEditing={() => this.onNext(f, i, a)}
            ref={e => (this[f] = e)}
            label={fields[f].label}
            style={{ marginBottom: 20 }}
            onChangeText={t => this.setState({ [f]: t, [`${f}$error`]: null })}
          />
        )
      case 'phone':
        return (
          <TextInput
            key={f}
            // onFocus={e => this._scrollToInput(findNodeHandle(e.target))}
            returnKeyType={a.length > i + 1 ? 'next' : 'send'}
            title={fields[f].title}
            characterRestriction={fields[f].characterRestriction}
            error={this.state[`${f}$error`]}
            onSubmitEditing={() => this.onNext(f, i, a)}
            ref={e => (this[f] = e)}
            keyboardType="phone-pad"
            label={fields[f].label}
            style={{ marginBottom: 20 }}
            onChangeText={t => this.setState({ [f]: t, [`${f}$error`]: null })}
          />
        )
      case 'picker':
        return (
          <Picker
            key={f}
            ref={e => (this[f] = e)}
            selectedValue={this.state[f]}
            onValueChange={value => this.setState({ [f]: value })}
            collapsable={true}>
            {(fields[f].options || []).map(o => (
              <Picker.Item key={o.label} label={o.label} value={o.value} />
            ))}
          </Picker>
        )

      default:
        return null
    }
  }
  render() {
    const { fields, onSubmit, submitText, storage, theme } = this.props
    const textColor = theme.colors.text

    return (
      <View
        style={{
          alignSelf: 'center',
          //   marginHorizontal: 50,
          backgroundColor: '#fff',
          width: 350,
          padding: 20,
          borderRadius: 10,
        }}
        // styleName="flexible"
        // source={require('../image/background.jpg')}
      >
        {/* <Image
            source={require('../images/ic_logo.png')}
            style={{
              marginTop: 50,
              padding: 10,
              // backgroundColor: '#fff',
              // borderRadius: 30,
              width: 60,
              height: 70
            }}
          /> */}
        <Text
          style={{
            fontWeight: 'bold',
            marginTop: 10,
            fontSize: 30,
            color: textColor,
            alignSelf: 'center',
          }}>
          {submitText}
        </Text>
        <View
          style={{
            alignSelf: 'center',
            //   marginHorizontal: 50,
            width: 300,
            marginTop: 30,
            marginHorizontal: 2,
            marginBottom: 30,
            backgroundColor: '#fff',
            // borderRadius: 5,
            // elevation: 2
          }}>
          {Object.keys(fields || {}).map((f, i, a) =>
            this.renderField(f, i, a),
          )}
          {onSubmit || storage ? (
            // <ActivityButton
            //   title={submitText || 'Submit'}
            //   disabled={!this.validate()}
            //   isLoading={this.state.isSaving}
            //   onPress={this.onSubmit}
            //   buttonStyle={{
            //     alignSelf: 'center',
            //     marginTop: 30,
            //     height: 40,
            //     width: 120,
            //     borderRadius: 30,
            //     backgroundColor: PURPLE
            //   }}
            // />
            <RoundButton
              mode="contained"
              loading={this.state.isSaving}
              style={styles.button}
              onPress={this.onSubmit}>
              {submitText || 'Submit'}
            </RoundButton>
          ) : null}
        </View>
        {this.props.bottomContent}
        <Animated.View style={{ height: this.state.keyboardHeight }} />
      </View>
    )
  }
}

Form = withTheme(Form)

const styles = StyleSheet.create({
  button: {
    // marginLeft: 0,
    // marginRight: 0,
    // backgroundColor: PURPLE,
    // borderColor: PURPLE,
    width: 120,
  },
})
