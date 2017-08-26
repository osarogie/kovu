import React from 'react'
import { View, Image, Text, AsyncStorage, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import TouchableLoader from './TouchableLoader'
import TextInput from './TextInput'
import styles from '../styles'
import inputStyles from '../styles/inputStyles'
import Constants from '../constants'
import auth from '../auth'
import { setUser } from '../actions'

// const mapStateToProps = state => ({
//   user: state.user
// })

class Authenticate extends React.Component {
  state = {}

  buttonProps = {
    wrapperStyle: styles.button,
    loadingBackground: '#b2b2b2',
    textStyle: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 16
    }
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
              alert((response && response.message) || 'Login failed')
            }
          })
          .catch(error => {
            this.setState({ isLoginLoading: false })
            alert('Login failed')
            console.error(error)
          })
      } else {
        alert('Please type your username and password')
      }
    } else {
      // console.log('Login already initiated');
    }
  }

  attemptRegister() {
    if (!this.state.isRegisterLoading) {
      const { full_name, l_username, email, r_password } = this.state

      if (email && l_username && r_password && full_name) {
        this.setState({ isRegisterLoading: true })

        auth
          .register(full_name, l_username, email, r_password)
          .then(response => {
            // console.log(response);
            if (response && response.success === true) {
              // console.log(response);
              this.storeSession(response)
            } else {
              this.setState({ isRegisterLoading: false })
              alert((response && response.message) || 'Sign Up failed')
            }
          })
          .catch(error => {
            this.setState({ isRegisterLoading: false })
            alert('Sign Up failed')
            console.error(error)
          })
      } else {
        alert('Please fill all boxes')
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
          placeholder="Full name"
          onChangeText={full_name => this.setState({ full_name })}
          androidIcon="text-format"
          value={this.state.full_name}
          onSubmitEditing={() => this._l_username.focus()}
        />
        <TextInput
          {...this.inputProps}
          placeholder="Username"
          ref={component => (this._l_username = component)}
          androidIcon="person"
          onChangeText={l_username => this.setState({ l_username })}
          value={this.state.l_username}
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
          <TouchableLoader
            {...this.buttonProps}
            title="Sign Up"
            onLoadInit={this.attemptRegister}
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
            {`or Login`}
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
          onChangeText={username => this.setState({ username })}
          keyboardType="email-address"
          value={this.state.username}
          onSubmitEditing={() => this._l_password.focus()}
        />
        <TextInput
          {...this.inputProps}
          placeholder="Password"
          androidIcon="lock"
          ref={component => (this._l_password = component)}
          secureTextEntry={true}
          value={this.state.l_password}
          onChangeText={l_password => this.setState({ l_password })}
          onSubmitEditing={this.attemptLogin}
        />
        <View style={styles.bottomControl}>
          <TouchableLoader
            {...this.buttonProps}
            title="Login"
            isLoading={this.state.isLoginLoading}
            onLoadInit={this.attemptLogin}
          />
          <Text
            style={[
              styles.altText,
              { opacity: this.state.isLoginLoading ? 0 : 1 }
            ]}
            onPress={() => this.setState({ action: 'register' })}
          >
            {`or Create Account`}
          </Text>
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

export default connect()(Authenticate)
