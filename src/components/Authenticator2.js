import React from 'react'
import {
  View,
  Image,
  Text,
  AsyncStorage,
  StyleSheet,
  Alert,
  Linking,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import ActivityButton from './ActivityButton'
import TextInput from './TextInput'
import styles from '../styles'
import inputStyles from '../styles/inputStyles'
import Constants from '../constants'
import auth from '../auth'
import { setUser } from '../actions'
import Hyperlink from 'react-native-hyperlink'

// const mapStateToProps = state => ({
//   user: state.user
// })

class Authenticator extends React.Component {
  state = {}

  buttonProps = {
    buttonStyle: styles.button,
    loadingBackground: '#b2b2b2',
    textStyle: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 16
    }
  }

  infoStyles = {
    textAlign: 'center',
    color: '#ccc',
    fontSize: 14,
    marginRight: 20,
    marginLeft: 20
  }

  inputProps = {
    style: inputStyles.textInput,
    inputProps: {
      placeholderTextColor: '#b2b2b2'
    },
    inputStyle: {
      color: '#fff'
    }
  }

  constructor(props) {
    super(props)
    this.attemptLogin = this.attemptLogin.bind(this)
    this.attemptRegister = this.attemptRegister.bind(this)
  }

  openForgotPassword = () =>
    Linking.openURL('https://thecommunity.ng/a/recover')

  attemptLogin() {
    if (!this.state.isLoginLoading) {
      const { username, l_password } = this.state

      if (username && l_password) {
        this.setState({ isLoginLoading: true })

        auth
          .login(username, l_password)
          .then(response => {
            if (response && response.success === true) {
              // console.log(response);
              this.storeSession(response)
            } else {
              this.setState({ isLoginLoading: false })
              Alert.alert((response && response.message) || 'Login failed')
            }
          })
          .catch(error => {
            this.setState({ isLoginLoading: false })
            Alert.alert('Login failed')
            console.error(error)
          })
      } else {
        Alert.alert('Please type your username and password')
      }
    } else {
      // console.log('Login already initiated');
    }
  }

  attemptRegister() {
    if (!this.state.isRegisterLoading) {
      const { full_name, r_username, email, r_password } = this.state

      if (email && r_username && r_password && full_name) {
        this.setState({ isRegisterLoading: true })

        auth
          .register(full_name, r_username, email, r_password)
          .then(response => {
            // console.log(response);
            if (response && response.success === true) {
              // console.log(response);
              this.storeSession(response)
            } else {
              this.setState({ isRegisterLoading: false })
              Alert.alert((response && response.message) || 'Sign Up failed')
            }
          })
          .catch(error => {
            this.setState({ isRegisterLoading: false })
            Alert.alert('Sign Up failed')
            console.error(error)
          })
      } else {
        Alert.alert('Please fill all boxes')
      }
    } else {
      // console.log('Register already initiated');
    }
  }

  storeSession(response) {
    const { goBack, dispatch } = this.props
    dispatch(
      setUser(
        { ...response.user, _id: `${response.user.id}` },
        response.api_key
      )
    )
    goBack()
  }

  renderRegister() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Text
          style={{
            color: '#05f',
            fontSize: 18,
            marginBottom: 20,
            textAlign: 'center'
          }}
        >
          Register on TheCommunity
        </Text> */}
        <TextInput
          {...this.inputProps}
          key="full_name"
          placeholder="Full name"
          onChangeText={full_name => this.setState({ full_name })}
          androidIcon="text-format"
          value={this.state.full_name}
          onSubmitEditing={() => this._r_username.focus()}
        />
        <TextInput
          {...this.inputProps}
          placeholder="Username"
          key="username"
          ref={component => (this._r_username = component)}
          androidIcon="person"
          onChangeText={r_username => this.setState({ r_username })}
          value={this.state.r_username}
          onSubmitEditing={() => this._email.focus()}
        />
        <TextInput
          {...this.inputProps}
          placeholder="Email"
          ref={component => (this._email = component)}
          onChangeText={email => this.setState({ email })}
          keyboardType="email-address"
          androidIcon="email"
          value={this.state.email}
          onSubmitEditing={() => this._r_password.focus()}
        />
        <TextInput
          {...this.inputProps}
          placeholder="Password"
          androidIcon="lock"
          ref={component => (this._r_password = component)}
          secureTextEntry={true}
          value={this.state.r_password}
          onChangeText={r_password => this.setState({ r_password })}
          onSubmitEditing={this.attemptRegister}
        />
        <View style={styles.bottomControl}>
          <ActivityButton
            {...this.buttonProps}
            title="Sign Up"
            onPress={this.attemptRegister}
            isLoading={this.state.isRegisterLoading}
          />
          <Text
            style={[
              styles.altText,
              { opacity: this.state.isRegisterLoading ? 0 : 1 }
            ]}
            onPress={() => {
              this.setState({ action: 'login' })
            }}
          >
            {'Existing member? '}
            <Text style={{ textDecorationLine: 'underline' }}>{'Sign in'}</Text>
          </Text>
        </View>
      </View>
    )
  }

  renderLogin() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Text
          style={{
            color: '#05f',
            fontSize: 18,
            marginBottom: 20,
            textAlign: 'center'
          }}
        >
          Sign in with TheCommunity
        </Text> */}
        <TextInput
          {...this.inputProps}
          placeholder="Username or Email"
          androidIcon="person"
          key="login$username"
          onChangeText={username => this.setState({ username })}
          keyboardType="email-address"
          value={this.state.username}
          onSubmitEditing={() => this._l_password.focus()}
        />
        <TextInput
          {...this.inputProps}
          placeholder="Password"
          key="login$password"
          androidIcon="lock"
          ref={component => (this._l_password = component)}
          secureTextEntry={true}
          value={this.state.l_password}
          onChangeText={l_password => this.setState({ l_password })}
          onSubmitEditing={this.attemptLogin}
        />
        <View style={styles.bottomControl}>
          <ActivityButton
            {...this.buttonProps}
            title="Login"
            isLoading={this.state.isLoginLoading}
            onPress={this.attemptLogin}
          />
          <Text
            style={[
              styles.altText,
              { opacity: this.state.isLoginLoading ? 0 : 1 }
            ]}
            onPress={() => this.setState({ action: 'register' })}
          >
            {'Are you new? '}
            <Text style={{ textDecorationLine: 'underline' }}>
              {'Create an account'}
            </Text>
          </Text>

          <TouchableOpacity onPress={this.openForgotPassword}>
            <Text
              style={[
                this.infoStyles,
                { marginTop: 10, padding: 10, textDecorationLine: 'underline' }
              ]}
            >
              Forgot password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    if (this.state.action === 'register') {
      return this.renderRegister()
    }

    return this.renderLogin()
  }
}

export default connect()(Authenticator)
