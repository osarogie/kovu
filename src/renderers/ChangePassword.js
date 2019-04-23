// @flow

import React from 'react'
import { View, ScrollView, ToastAndroid,  } from 'react-native'
import { Bar } from 'react-native-progress'
import ActivityButton from '../components/ActivityButton'
import styles from '../styles'
import TextInput from '../components/TextInput'
import QueryRendererProxy from './QueryRendererProxy'
import Toolbar from '../components/Toolbar'

import { createFragmentContainer, graphql, commitMutation } from 'react-relay'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  night_mode: state.night_mode
})
function UpdatePassword(input, environment, config) {
  const variables = {
    input: input
  }

  commitMutation(environment, {
    variables,
    mutation: graphql`
      mutation ChangePasswordScreenMutation($input: ChangePasswordInput!) {
        changePassword(input: $input) {
          success
        }
      }
    `,
    ...config
  })
}
class ChangePassword extends React.Component {
  state = {
    current_password: null,
    new_password: null,
    new_password_confirmation: null
  }
  inputProps = {
    style: {
      flex: 1,
      width: '100%',
      // height: 50,
      marginTop: 15,
      // opacity: 0.9,
      borderRadius: 0,

      backgroundColor: '#fff'
    },
    inputProps: {
      placeholderTextColor: '#333',
      underlineColorAndroid: '#000'
    },
    inputStyle: {
      color: '#000'
    }
  }

  buttonProps = {
    buttonStyle: [styles.button, { marginTop: 20 }],
    loadingBackground: '#b2b2b2',
    textStyle: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 16
    }
  }
  constructor(props) {
    super(props)

    this.save = this.save.bind(this)
    // console.log(props)
  }

  notify(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT)
  }

  save() {
    const {
      current_password,
      new_password,
      new_password_confirmation
    } = this.state

    if (current_password && new_password && new_password_confirmation) {
      this.setState({ isSaving: true })
      UpdatePassword(
        { current_password, new_password, new_password_confirmation },
        this.props.relay.environment,
        {
          onCompleted: ({ changePassword, ...props }) => {
            this.setState({ isSaving: false })
            // console.log(props)
            if (changePassword && changePassword.success) {
              this.props.goBack(this.props.navigation)
            } else {
              this.notify('Password update failed')
            }
          },
          onError: _ => {
            this.setState({ isSaving: false })
            this.notify('Password update failed')
          }
        }
      )
    } else {
      this.notify('Fill all boxes')
    }
  }

  renderToolbar() {
    const title = 'Change Password'
    return <Toolbar title={title} navIconName="md-arrow-back" />
  }
  renderProgress() {
    if (this.state.isSaving) {
      return (
        <Bar
          indeterminate
          width={null}
          height={2}
          borderRadius={0}
          color="#05f"
          borderWidth={0}
          animationType="decay"
        />
      )
    }

    return null
  }
  render() {
    const backgroundColor = '#fff'

    return (
      <View style={styles.container}>
        {this.renderToolbar()}
        <View style={{ height: 2 }}>{this.renderProgress()}</View>
        <ScrollView
          style={{ flex: 1, backgroundColor }}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <View style={{ flex: 1, padding: 40, alignItems: 'center' }}>
            <TextInput
              {...this.inputProps}
              secureTextEntry={true}
              placeholder="Your Current Password"
              onChangeText={current_password =>
                this.setState({ current_password })
              }
              value={this.state.current_password}
              onSubmitEditing={() => this._new_password_confirmation.focus()}
            />
            <TextInput
              {...this.inputProps}
              secureTextEntry={true}
              placeholder="New Password"
              ref={component => (this._new_password_confirmation = component)}
              onChangeText={new_password_confirmation =>
                this.setState({ new_password_confirmation })
              }
              value={this.state.new_password_confirmation}
              onSubmitEditing={() => this._new_password.focus()}
            />
            <TextInput
              {...this.inputProps}
              secureTextEntry={true}
              placeholder="Confirm New Password"
              ref={component => (this._new_password = component)}
              onChangeText={new_password => this.setState({ new_password })}
              value={this.state.new_password}
              onSubmitEditing={this.save}
            />
            <ActivityButton
              {...this.buttonProps}
              title="Save"
              isLoading={this.state.isSaving}
              onPress={this.save}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

// ChangePasswordFragmentContainer
const ChangePasswordFragmentContainer = createFragmentContainer(
  connect(mapStateToProps)(ChangePassword),
  graphql`
    fragment ChangePassword_viewer on User {
      id
      _id
    }
  `
)

export default ({ api_key, ...props }) => (
  <QueryRendererProxy
    query={graphql`
      query ChangePasswordQuery {
        viewer {
          ...ChangePassword_viewer
        }
      }
    `}
    render={data => (
      <ChangePasswordFragmentContainer viewer={data.props.viewer} {...props} />
    )}
  />
)
