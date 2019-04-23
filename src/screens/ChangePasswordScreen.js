// @flow

import React from 'react'


import ChangePassword from '../renderers/ChangePassword'
import getNavigation from '../helpers/getNavigation'



export default class ChangePasswordScreen extends React.Component {
  render() {
    return <ChangePassword {...getNavigation(this.props.navigation)} />
  }
}
