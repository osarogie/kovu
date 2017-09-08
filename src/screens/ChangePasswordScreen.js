// @flow

import React, { Component } from 'react'

import { Bar } from 'react-native-progress'

import { View, Platform, TabBarIOS, ScrollView } from 'react-native'
import ActivityButton from '../components/ActivityButton'
import TextInput from '../components/TextInput'
import ChangePassword from '../renderers/ChangePassword'
import getNavigation from '../helpers/getNavigation'

import { graphql, commitMutation } from 'react-relay'
import { goBack } from '../utils'

import styles from '../styles'

export default class ChangePasswordScreen extends Component<void, Props, any> {
  render() {
    return <ChangePassword {...getNavigation(this.props.navigation)} />
  }
}
