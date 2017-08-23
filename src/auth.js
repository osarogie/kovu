import Base64 from 'base-64'
import { AsyncStorage } from 'react-native'
import Constants from './constants'

const apiBaseUrl = 'https://data.thecommunity.ng/v1/'
// const apiBaseUrl = 'http://localhost:3000/v1/'

export default (auth = {
  async login(username, l_password) {
    const credentials = `${username}:${l_password}`
    const basic = 'Basic ' + Base64.encode(credentials)

    return fetch(`${apiBaseUrl}login`, {
      method: 'POST',
      headers: {
        Authorization: basic,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(response => response.json())
  },

  async register(name, username, email, r_password) {
    const credentials = `${email}:${r_password}`
    const basic = 'Basic ' + Base64.encode(credentials)
    return fetch(`${apiBaseUrl}register`, {
      method: 'POST',
      headers: {
        Authorization: basic,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: name,
        username: username
      })
    }).then(response => response.json())
  },

  logout() {
    AsyncStorage.multiRemove([
      Constants.USER_ID,
      Constants.USER,
      Constants.API_KEY
    ])
  }
})
