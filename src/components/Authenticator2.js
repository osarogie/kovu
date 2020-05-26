import React, { useState } from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
  Alert,
  Linking,
  TouchableOpacity,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
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

function Authenticator({ goBack, dispatch }) {
  const state = {}
  const [username, set_username] = useState('')
  const [l_password, set_l_password] = useState('')
  const [full_name, set_full_name] = useState('')
  const [r_username, set_r_username] = useState('')
  const [email, set_email] = useState('')
  const [r_password, set_r_password] = useState('')

  const [isLoading, set_isLoginLoading] = useState(false)
  const [isRegisterLoading, set_isRegisterLoading] = useState(false)

  const buttonProps = {
    buttonStyle: styles.button,
    loadingBackground: '#b2b2b2',
    textStyle: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 16,
    },
  }

  const infoStyles = {
    textAlign: 'center',
    color: '#ccc',
    fontSize: 14,
    marginRight: 20,
    marginLeft: 20,
  }

  const inputProps = {
    style: inputStyles.textInput,
    inputProps: {
      placeholderTextColor: '#b2b2b2',
    },
    inputStyle: {
      color: '#fff',
    },
  }

  const openForgotPassword = () =>
    Linking.openURL('https://thecommunity.ng/a/recover')

  const attemptLogin = () => {
    if (!isLoginLoading) {
      if (username && l_password) {
        set_isLoginLoading(true)

        auth
          .login(username, l_password)
          .then(response => {
            if (response && response.success === true) {
              // console.log(response);
              storeSession(response)
            } else {
              set_isLoginLoading(false)
              Alert.alert((response && response.message) || 'Login failed')
            }
          })
          .catch(error => {
            set_isLoginLoading(false)
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

  const attemptRegister = () => {
    if (!isRegisterLoading) {
      if (email && r_username && r_password && full_name) {
        set_isRegisterLoading(true)

        auth
          .register(full_name, r_username, email, r_password)
          .then(response => {
            // console.log(response);
            if (response && response.success === true) {
              // console.log(response);
              storeSession(response)
            } else {
              set_isRegisterLoading(false)
              Alert.alert((response && response.message) || 'Sign Up failed')
            }
          })
          .catch(error => {
            set_isRegisterLoading(false)
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

  const storeSession = response => {
    dispatch(
      setUser(
        { ...response.user, _id: `${response.user.id}` },
        response.api_key,
      ),
    )
    goBack()
  }

  const renderRegister = () => {
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
          {...inputProps}
          key="full_name"
          placeholder="Full name"
          onChangeText={set_full_name}
          androidIcon="text-format"
          value={full_name}
          // onSubmitEditing={() => _r_username.focus()}
        />
        <TextInput
          {...inputProps}
          placeholder="Username"
          key="username"
          // ref={component => (_r_username = component)}
          androidIcon="person"
          onChangeText={set_r_username}
          value={r_username}
          // onSubmitEditing={() => _email.focus()}
        />
        <TextInput
          {...inputProps}
          placeholder="Email"
          // ref={component => (_email = component)}
          onChangeText={set_email}
          keyboardType="email-address"
          androidIcon="email"
          value={email}
          // onSubmitEditing={() => _r_password.focus()}
        />
        <TextInput
          {...inputProps}
          placeholder="Password"
          androidIcon="lock"
          // ref={component => (_r_password = component)}
          secureTextEntry={true}
          value={r_password}
          onChangeText={set_r_password}
          // onSubmitEditing={attemptRegister}
        />
        <View style={styles.bottomControl}>
          <ActivityButton
            {...buttonProps}
            title="Sign Up"
            onPress={attemptRegister}
            isLoading={isRegisterLoading}
          />
          <Text
            style={[styles.altText, { opacity: isRegisterLoading ? 0 : 1 }]}
            onPress={() => {
              setAction('login')
            }}>
            {'Existing member? '}
            <Text style={{ textDecorationLine: 'underline' }}>{'Sign in'}</Text>
          </Text>
        </View>
      </View>
    )
  }

  const renderLogin = () => {
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
          {...inputProps}
          placeholder="Username or Email"
          androidIcon="person"
          key="login$username"
          onChangeText={set_username}
          keyboardType="email-address"
          value={username}
          // onSubmitEditing={() => _l_password.focus()}
        />
        <TextInput
          {...inputProps}
          placeholder="Password"
          key="login$password"
          androidIcon="lock"
          // ref={component => (_l_password = component)}
          secureTextEntry={true}
          value={l_password}
          onChangeText={set_l_password}
          // onSubmitEditing={attemptLogin}
        />
        <View style={styles.bottomControl}>
          <ActivityButton
            {...buttonProps}
            title="Login"
            isLoading={isLoginLoading}
            onPress={attemptLogin}
          />
          <Text
            style={[styles.altText, { opacity: isLoginLoading ? 0 : 1 }]}
            onPress={() => setAction('register')}>
            {'Are you new? '}
            <Text style={{ textDecorationLine: 'underline' }}>
              {'Create an account'}
            </Text>
          </Text>

          <TouchableOpacity onPress={openForgotPassword}>
            <Text
              style={[
                infoStyles,
                { marginTop: 10, padding: 10, textDecorationLine: 'underline' },
              ]}>
              Forgot password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  if (action === 'register') {
    return renderRegister()
  }

  return renderLogin()
}

export default connect()(Authenticator)
